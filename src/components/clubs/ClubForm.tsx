"use client";
import DashboardContainer from "@/components/common/dashboardContainer/DashboardContainer";
import {
  ClubLogoInput,
  DescriptionInput,
  LocationMap,
  NameInput,
  OpenHoursInput
} from "@/components/clubs/ClubFormInputs";
import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
import { useQuery } from "react-query";
import {
  AddClubData,
  addClub,
  updateClub,
  getClubDetails,
  Location,
  DaysOpen,
  OpenClosed
} from "@/hooks/club";
import { uploadSingleImage } from "@/hooks/image";

export default function ClubForm({
  setIsOpen,
  isUpdate,
  setIsUpdate,
  tempId,
  setTempId,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  isUpdate: boolean;
  setIsUpdate: Dispatch<SetStateAction<boolean>>;
  tempId: number[];
  setTempId: Dispatch<SetStateAction<number[]>>;
}) {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [locX, setLocX] = useState<number>(0);
  const [locY, setLocY] = useState<number>(0);
  const [locName, setLocName] = useState<string>("");
  const [logoId, setLogoId] = useState<number>(-1);
  const [logoFile, setLogoFile] = useState<File>(new File([], ""));

  const defaultOpenClosed: OpenClosed = {
    open: "08:00",
    closed: "17:00"
  }
  const defaultDaysOpen: DaysOpen = {
    monday: defaultOpenClosed,
    tuesday: defaultOpenClosed,
    wednesday: defaultOpenClosed,
    thursday: defaultOpenClosed,
    friday: defaultOpenClosed,
    saturday: defaultOpenClosed,
    sunday: defaultOpenClosed
  }
  const [daysOpen, setDaysOpen] = useState<DaysOpen>(defaultDaysOpen);

  const [message, setMessage] = useState<string>("");

  if (isUpdate) {
    const {
      data: clubData,
      isLoading: clubLoading,
      isError: clubError,
      refetch: refetchClub,
    } = useQuery(["club", tempId[0]], () => getClubDetails(tempId[0]));

    useEffect(() => {
      (async () => {
        await refetchClub();
      })();
      if (isUpdate && !clubLoading) {
        if (typeof clubData !== "string" && !clubError) {
          if (clubData) {
            setName(clubData.name);
            setDescription(clubData.description);
            setLocX(clubData.location.locX);
            setLocY(clubData.location.locY);
            setLocName(clubData.location.name);
            setLogoId(clubData.logo.id);
            setDaysOpen(clubData.daysOpen);
          } else {
            setName("");
            setDescription("");
            setLocX(0);
            setLocY(0);
            setLocName("");
            setLogoId(-1);
            setDaysOpen(defaultDaysOpen);
          }
        } else {
          console.error("Loading data error");
        }
      }
    }, [clubData, tempId[0]]);
  }

  useEffect(() => {
    if (!logoFile) return;

    const handleNewImage = async () => {
      try {
        if (!logoFile.name) return;
        const result = await uploadSingleImage(logoFile, false);
        if (typeof result !== "string") setLogoId(result.id);
      } catch (error) {
        console.error("Błąd dodawania obrazu", error);
      }
    };

    (async () => {
      await handleNewImage();
    })();
  }, [logoFile]);

  const validateDaysOpen = (daysOpen: DaysOpen) => {
    for (const day in daysOpen) {
      const openTime = new Date(`1970-01-01T${daysOpen[day as keyof DaysOpen].open}Z`);
      const closeTime = new Date(`1970-01-01T${daysOpen[day as keyof DaysOpen].closed}Z`);
  
      if (openTime >= closeTime) {
        return false;
      }
    }
    return true;
  }

  const submitForm = async () => {
    if (!name || !description || locX === 0 || locY === 0) {
      console.error("Wszystkie pola muszą być wypełnione");
      setMessage("Wszystkie pola muszą być wypełnione");
      return;
    }

    if(logoId === -1){
      console.error("Dodaj obrazek");
      setMessage("Dodaj obrazek");
      return;
    }

    if (!validateDaysOpen(daysOpen)) {
      setMessage("Nieprawidłowe godziny otwarcia");
      return;
    }

    const newLocation: Location = {
      locX: locX,
      locY: locY,
      name: locName,
    };

    const newClubData: AddClubData = {
      name: name,
      description: description,
      location: newLocation,
      logoId: logoId,
      daysOpen: daysOpen
    };

    try {
      if (!isUpdate) {
        const result = await addClub(newClubData);
        if (result === 200) {
          setName("");
          setDescription("");
          setLocX(0);
          setLocY(0);
          setLocName("");
          setLogoId(-1);
          setLogoFile(new File([], ""));
          const form = document.getElementById("logoInput") as HTMLFormElement;
          if (form) {
            form.reset();
          }
          setDaysOpen(defaultDaysOpen);
          setMessage("Dodano klub");
        } else {
          console.error(result);
          setMessage(result);
        }
      } else {
        const result = await updateClub(tempId[0], newClubData);
        if (result === 200) {
          setMessage("Zaktualizowano klub");
        } else {
          console.error(result);
          setMessage(result);
        }
      }
    } catch (error) {
      console.error("Błąd dodawania klubu", error);
      setMessage("Błąd dodawania klubu");
    }
  };

  return (
    <DashboardContainer className="flex flex-col space-y-4 p-7 w-11/12 lg:w-3/5">
      <h1 className="text-xl lg:text-2xl font-semibold">
        {!isUpdate ? "Dodawanie klubu" : "Aktualizacja klubu"}
      </h1>
      <NameInput name={name} setName={setName} />
      <DescriptionInput
        description={description}
        setDescription={setDescription}
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
        <ClubLogoInput
          setLogoFile={setLogoFile}
          logoId={logoId}
        />
      </div>
      <div className="space-y-1">
        <p className="text-sm">Podaj godziny otwarcia:</p>
        <OpenHoursInput daysOpen={daysOpen} setDaysOpen={setDaysOpen}/>
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
