"use client";
import DashboardContainer from "@/components/common/dashboardContainer/DashboardContainer";
import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
import { Location } from "@/hooks/club";
import { uploadMultipleImages } from "@/hooks/image";
import { AddCourtData, addCourt } from "@/hooks/court";
import {
  ClubDescriptionInput,
  ClubLocationMap,
  ClubNameInput,
} from "../manageclubs/ClubFormInputs";

export default function CourtForm({
  isOpen,
  setIsOpen,
  clubID,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  clubID: number;
}) {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [courtType, setCourtType] = useState<string>("INDOOR");
  const [courtSurface, setCourtSurface] = useState<string>("CLAY");
  const [locX, setLocX] = useState<number>(0);
  const [locY, setLocY] = useState<number>(0);
  const [locName, setLocName] = useState<string>("");
  const [logoIds, setLogoIds] = useState<number[]>([]);
  const [logoFiles, setLogoFiles] = useState<File[]>([]);

  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const handleNewImages = async () => {
      try {
        if (logoFiles.length === 0) return;

        const results = await uploadMultipleImages(logoFiles, false);
        if (typeof results !== "string") {
          const ids = results.map((result) => result.id);
          setLogoIds(ids);
        }
      } catch (error) {
        console.error("Błąd dodawania obrazów", error);
      }
    };

    handleNewImages();
  }, [logoFiles]);

  const submitForm = async () => {
    if (
      !name ||
      !description ||
      !courtType ||
      !courtSurface ||
      locX === null ||
      locY === null
    ) {
      console.error("Pola muszą być wypełnione");
      setMessage("Pola muszą być wypełnione");
      return;
    }

    const newLocation: Location = {
      locX: locX,
      locY: locY,
      name: locName,
    };

    const newCourtData: AddCourtData = {
      name: name,
      description: description,
      type: courtType,
      surface: courtSurface,
      location: newLocation,
      imagesIds: logoIds,
    };

    try {
      const result = await addCourt(clubID, newCourtData);
      if (result === 200) {
        setName("");
        setDescription("");
        setCourtType("");
        setCourtSurface("");
        setLocX(0);
        setLocY(0);
        setLocName("");
        setLogoFiles([]);
        const form = document.getElementById("logoInput") as HTMLFormElement;
        if (form) {
          form.reset();
        }
        setMessage("Dodano kortu");
      } else {
        console.error("Błąd dodawania kortu");
        setMessage("Błąd dodawania kortu");
      }
    } catch (error) {
      console.error("Błąd dodawania kortu", error);
      setMessage("Błąd dodawania kortu");
    }
  };

  return (
    <DashboardContainer className="flex flex-col space-y-4 p-7 w-11/12 lg:w-3/5">
      <h1 className="text-xl lg:text-2xl font-semibold">Dodawanie kortu</h1>
      <ClubNameInput name={name} setName={setName} />
      <ClubDescriptionInput
        description={description}
        setDescription={setDescription}
      />
      <div className="space-y-1">
        <p className="text-sm">Wybierz typ kortu:</p>
        <select
          value={courtType}
          onChange={(e) => setCourtType(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2"
        >
          <option value="INDOOR">Indoor</option>
          <option value="OUTDOOR">Outdoor</option>
        </select>
      </div>
      <div className="space-y-1">
        <p className="text-sm">Wybierz nawierzchnię kortu:</p>
        <select
          value={courtSurface}
          onChange={(e) => setCourtSurface(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2"
        >
          <option value="CLAY">Clay</option>
          <option value="CONCRETE">Concrete</option>
          <option value="GRASS">Grass</option>
          <option value="ACRYLIC">Acrylic</option>
        </select>
      </div>
      <div className="space-y-1">
        <p className="text-sm">Wybierz lokalizację:</p>
        <ClubLocationMap
          locX={locX}
          setLocX={setLocX}
          locY={locY}
          setLocY={setLocY}
          locName={locName}
          setLocName={setLocName}
        />
      </div>
      <div className="space-y-1">
        <p className="text-sm">Wczytaj logo:</p>
        <input
          type="file"
          multiple
          onChange={(e) => {
            const files = e.target.files;
            if (files) {
              setLogoFiles(Array.from(files));
            }
          }}
          className="border border-gray-300 rounded px-3 py-2"
        />
      </div>
      <span className="flex justify-center space-x-4">
        <button
          onClick={() => setIsOpen(false)}
          className="text-right text-mainOrange text-sm sm:text-md"
        >
          Zamknij
        </button>
        <button
          onClick={submitForm}
          className="bg-darkGreen text-mainWhite text-sm rounded px-4 py-2 w-fit"
        >
          Dodaj
        </button>
      </span>
      <div className="flex w-full justify-center">
        <p className="text-xs text-center">{message}</p>
      </div>
    </DashboardContainer>
  );
}
