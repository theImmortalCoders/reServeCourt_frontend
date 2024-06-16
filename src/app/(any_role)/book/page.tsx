"use client";
import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { DaysOpen, getClubDetails } from "@/hooks/club";
import {
  getAllAvailableCourtsByDate,
  GetAllAvailableCourtsByDateData,
} from "@/hooks/court";
import CourtListComponent from "@/components/courts/CourtListComponent";
import SearchBar from "@/components/book/SearchBar";

export default function BookPage() {
  const [dateFrom, setDateFrom] = useState<string>("");
  const [dateTo, setDateTo] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [surface, setSurface] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [loadData, setLoadData] = useState<boolean>(false);

  const [clubsDaysOpen, setClubsDaysOpen] = useState<DaysOpen[]>([]);

  const {
    data: courtsData,
    isLoading,
    isError,
    refetch,
  } = useQuery(
    "courts",
    () => {
      if (dateFrom === "" || dateTo === "") {
        return;
      }
      return getAllAvailableCourtsByDate(
        dateFrom,
        dateTo,
        type && type,
        surface && surface,
        location && location
      );
    },
    { enabled: loadData }
  );

  const searchCourts = async () => {
    if (!loadData && dateFrom !== "" && dateTo !== "") {
      setLoadData(true);
    } else {
      refetch();
    }
  };

  useEffect(() => {
    const fetchClubDetails = async () => {
      if (Array.isArray(courtsData)) {
        const details = await Promise.all(
          courtsData.map(async (court: GetAllAvailableCourtsByDateData) => {
            const result = await getClubDetails(court.clubId);
            return typeof result === "string" ? null : result.daysOpen;
          })
        );
        setClubsDaysOpen(details.filter((item) => item !== null) as DaysOpen[]);
      }
    };

    if (Array.isArray(courtsData)) {
      fetchClubDetails();
    }
  }, [courtsData]);

  return (
    <div className="flex flex-col items-center bg-mainWhite min-h-[92vh] py-8 space-y-6">
      <h2 className="w-full text-center py-10 uppercase text-2xl sm:text-lg md:text-2xl lg:text-3xl xl:text-4xl text-darkGreen">
        Kiedy i gdzie chcesz zagrać?
      </h2>
      <SearchBar
        setDateFrom={setDateFrom}
        setDateTo={setDateTo}
        setType={setType}
        setSurface={setSurface}
        setLocation={setLocation}
        searchCourts={searchCourts}
      />
      <div className="w-11/12 lg:w-3/5 space-y-2">
        {isLoading ? (
          <div className="flex justify-center">Trwa ładowanie danych...</div>
        ) : isError ? (
          <div className="flex justify-center">
            Wystąpił błąd podczas ładowania danych.
          </div>
        ) : Array.isArray(courtsData) &&
          clubsDaysOpen &&
          courtsData.length > 0 ? (
          courtsData.map((court: GetAllAvailableCourtsByDateData, index) => (
            <CourtListComponent
              key={court.id}
              court={court}
              userRole={"USER"}
              daysOpen={clubsDaysOpen[index]}
            />
          ))
        ) : (
          loadData &&
          Array.isArray(courtsData) &&
          courtsData.length === 0 && (
            <div className="flex justify-center">Brak dostępnych kortów</div>
          )
        )}
      </div>
    </div>
  );
}
