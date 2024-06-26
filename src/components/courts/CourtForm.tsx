"use client";
import DashboardContainer from "@/components/common/dashboardContainer/DashboardContainer";
import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
import { Location } from "@/hooks/club";
import { uploadMultipleImages } from "@/hooks/image";
import {
  AddCourtData,
  addCourt,
  getCourtDetails,
  updateCourt,
} from "@/hooks/court";
import {
  CourtSurfaceInput,
  CourtTypeInput,
  DescriptionInput,
  LocationMap,
  NameInput,
} from "../clubs/ClubFormInputs";
import { useQuery } from "react-query";

export default function CourtForm({
  setIsOpen,
  isUpdate,
  setIsUpdate,
  tempId,
  setTempId,
  clubID,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  isUpdate: boolean;
  setIsUpdate: Dispatch<SetStateAction<boolean>>;
  tempId: number[];
  setTempId: Dispatch<SetStateAction<number[]>>;
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

  if (isUpdate) {
    const {
      data: courtData,
      isLoading: courtLoading,
      isError: courtError,
      refetch: refetchCourt,
    } = useQuery(["court", tempId[0]], () => getCourtDetails(tempId[0]));

    useEffect(() => {
      (async () => {
        await refetchCourt();
      })();
      if (isUpdate && !courtLoading) {
        if (typeof courtData !== "string" && !courtError) {
          if (courtData) {
            setName(courtData.name);
            setDescription(courtData.description);
            setCourtType(courtData.type);
            setCourtSurface(courtData.surface);
            setLocX(courtData.location.locX);
            setLocY(courtData.location.locY);
            setLocName(courtData.location.name);
            setLogoIds(courtData.images.map((image) => image.id));
          } else {
            setName("");
            setDescription("");
            setCourtType("INDOOR");
            setCourtSurface("CLAY");
            setLocX(0);
            setLocY(0);
            setLocName("");
            setLogoIds([-1]);
          }
        } else {
          console.log("Loading data error");
        }
      }
    }, [courtData, tempId[0]]);
  }

  useEffect(() => {
    const handleNewImages = async () => {
      try {
        if (logoFiles.length === 0) return;

        const results = await uploadMultipleImages(logoFiles, false);
        if (typeof results !== "string") {
          setLogoIds(results.map((result) => result.id));
        }
      } catch (error) {
        console.error("Błąd dodawania obrazów", error);
      }
    };
    (async () => {
      await handleNewImages();
    })();
  }, [logoFiles]);

  const submitForm = async () => {
    if (
      !name ||
      !description ||
      !courtType ||
      !courtSurface ||
      locX === 0 ||
      locY === 0
    ) {
      console.error("Wszystkie pola muszą być wypełnione");
      setMessage("Wszystkie pola muszą być wypełnione");
      return;
    }

    if (logoIds.length === 0) {
      console.error("Dodaj przynajmniej 1 obrazek");
      setMessage("Dodaj przynajmniej 1 obrazek");
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
      if (!isUpdate) {
        const result = await addCourt(clubID, newCourtData);
        if (result === 200) {
          setName("");
          setDescription("");
          setCourtType("INDOOR");
          setCourtSurface("CLAY");
          setLocX(0);
          setLocY(0);
          setLocName("");
          setLogoFiles([]);
          const form = document.getElementById("logoInput") as HTMLFormElement;
          if (form) {
            form.reset();
          }
          setMessage("Dodano kort");
        } else {
          console.error("Błąd dodawania kortu");
          setMessage("Błąd dodawania kortu");
        }
      } else {
        const result = await updateCourt(tempId[0], newCourtData);
        if (result === 200) {
          setMessage("Zaktualizowano kort");
        } else {
          console.error("Błąd aktualizowania kortu");
          setMessage("Błąd aktualizowania kortu");
        }
      }
    } catch (error) {
      console.error("Błąd dodawania kortu", error);
      setMessage("Błąd dodawania kortu");
    }
  };

  return (
    <DashboardContainer className="flex flex-col space-y-4 p-7 w-11/12 lg:w-3/5">
      <h1 className="text-xl lg:text-2xl font-semibold">
        {!isUpdate ? "Dodawanie kortu" : "Aktualizacja kortu"}
      </h1>
      <NameInput name={name} setName={setName} />
      <DescriptionInput
        description={description}
        setDescription={setDescription}
      />
      <CourtTypeInput courtType={courtType} setCourtType={setCourtType} />
      <CourtSurfaceInput
        courtSurface={courtSurface}
        setCourtSurface={setCourtSurface}
      />
      <div className="space-y-1">
        <p className="text-sm">Wybierz lokalizację:</p>
        <LocationMap
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
          accept="image/*"
          required
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
          onClick={() => {
            setTempId([-1, -1]);
            setIsOpen(false);
            setIsUpdate(false);
          }}
          className="text-right text-mainOrange text-sm sm:text-md"
        >
          Zamknij
        </button>
        <button
          onClick={submitForm}
          className="bg-darkGreen text-mainWhite text-sm rounded px-4 py-2 w-fit"
        >
          {isUpdate ? "Zapisz" : "Dodaj"}
        </button>
      </span>
      <div className="flex w-full justify-center">
        <p className="text-xs text-center">{message}</p>
      </div>
    </DashboardContainer>
  );
}
