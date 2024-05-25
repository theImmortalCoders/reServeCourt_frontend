"use client";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { useQuery, useQueryClient } from "react-query";
import { getClubDetails, GetClubDetailsData } from "@/hooks/club";
import { getAllAvailableCourtsByDate, GetAllAvailableCourtsByDateData } from "@/hooks/court"
import CourtListComponent from "@/components/courts/CourtListComponent"
import { translateCourtType, translateCourtSurface } from "@/utils/courthelper"

function SearchBar({
    setDateFrom,
    setDateTo,
    setType,
    setSurface,
    setLocation,
    searchCourts
}:{
    setDateFrom: Dispatch<SetStateAction<string>>;
    setDateTo: Dispatch<SetStateAction<string>>;
    setType: Dispatch<SetStateAction<string>>;
    setSurface: Dispatch<SetStateAction<string>>;
    setLocation: Dispatch<SetStateAction<string>>;
    searchCourts: () => void;
}) {

    const [day, setDay] = useState<string>("");
    const [hourFrom, setHourFrom] = useState<string>("");
    const [hourTo, setHourTo] = useState<string>("");

    useEffect(() => {
        if (day && hourFrom && hourTo) {
            const newDateFromString = `${day}T${hourFrom}`;
            const newDateToString = `${day}T${hourTo}`;
            setDateFrom(newDateFromString);
            setDateTo(newDateToString);
        } else {
            setDateFrom('');
            setDateTo('');
        }
    }, [day, hourFrom, hourTo]);

    return (
        <div className="flex flex-col md:flex-row items-center justify-center md:space-x-4 space-y-4 md:space-y-0">
            <span className="flex flex-col md:flex-row md:space-x-4 text-xs px-4 py-2 border-2 border-darkGreen rounded">
                <div>
                    <p>Termin rezerwacji:</p>
                    <span className="flex space-x-4 my-2 w-fit bg-white font-sans border border-darkGreen rounded px-1">
                        <input 
                            type="date" 
                            name="" 
                            id=""
                            value={day}
                            onChange={(e) => setDay(e.target.value)}
                            className="outline-none"/>
                        <input
                            type="time" 
                            name="" 
                            id="" 
                            value={hourFrom}
                            onChange={(e) => setHourFrom(e.target.value)}
                            className="outline-none"/>
                        <p>:</p>
                        <input
                            type="time" 
                            name="" 
                            id="" 
                            value={hourTo}
                            onChange={(e) => setHourTo(e.target.value)}
                            className="outline-none"/>
                    </span>
                    </div>
                <span className="flex flex-col sm:flex-row sm:space-x-4">
                <div>
                    <p>Typ:</p>
                    <select
                        className="my-2 font-sans w-24 border border-darkGreen rounded px-1 outline-none"
                        onChange={(e) => setType(e.target.value)}
                    >
                        <option value="">-</option>
                        <option value="INDOOR">{translateCourtType("INDOOR")}</option>
                        <option value="OUTDOOR">{translateCourtType("OUTDOOR")}</option>
                    </select>
                </div>
                <div> 
                    <p>Nawierzchnia:</p>
                    <select
                        className="my-2 font-sans w-24 border border-darkGreen rounded px-1 outline-none"
                        onChange={(e) => setSurface(e.target.value)}
                    >
                        <option value="">-</option>
                        <option value="CLAY">{translateCourtSurface("CLAY")}</option>
                        <option value="CONCRETE">{translateCourtSurface("CONCRETE")}</option>
                        <option value="GRASS">{translateCourtSurface("GRASS")}</option>
                        <option value="ACRYLIC">{translateCourtSurface("ACRYLIC")}</option>
                    </select>
                </div>
                <div>
                    <p>Lokalizacja:</p>
                    <input type="text" name="" id="" className="my-2 border border-darkGreen rounded font-sans outline-none"/>
                </div>
            </span>
        </span>
        <span className="flex items-center justify-center">
            <button onClick={searchCourts} className="bg-mainGreen text-white rounded w-fit h-fit px-2 py-1">Szukaj</button>
        </span>
    </div>
    )
}

export default function BookPage() {
    const [dateFrom, setDateFrom] = useState<string>("");
    const [dateTo, setDateTo] = useState<string>("");
    const [type, setType] = useState<string>("");
    const [surface, setSurface] = useState<string>("");
    const [location, setLocation] = useState<string>("");
    const [loadData, setLoadData] = useState<boolean>(false);

    const [clubDetails, setClubDetails] = useState<GetClubDetailsData[]>([]);

    const {
        data: courtsData,
        isLoading,
        isError,
        refetch,
    } = useQuery("courts", () => {
        if (dateFrom === '' || dateTo === '') {
            return;
        }
        return getAllAvailableCourtsByDate(dateFrom, dateTo);
    }, { enabled: loadData });

    const searchCourts = async () => {
        if (loadData === false) {
            setLoadData(true);
        }
        else {
            refetch();
        }
    }

    useEffect(() => {
        const fetchClubDetails = async () => {
            if (Array.isArray(courtsData)) {
                const details = await Promise.all(courtsData.map(async (court: GetAllAvailableCourtsByDateData) => {
                    const result = await getClubDetails(court.clubId);
                    return typeof result === 'string' ? null : result;
                }));
                setClubDetails(details.filter(item => item !== null) as GetClubDetailsData[]);
            }
        }

        if (Array.isArray(courtsData)) {
            fetchClubDetails();
        }
    }, [courtsData]);

    return (
        <div className="flex flex-col items-center bg-mainWhite min-h-max py-8 space-y-6">
            <SearchBar 
                setDateFrom={setDateFrom} 
                setDateTo={setDateTo}
                setType={setType} 
                setSurface={setSurface} 
                setLocation={setLocation}
                searchCourts={searchCourts}
            />
            <div className="w-11/12 lg:w-3/5 space-y-2">
                {Array.isArray(courtsData) && clubDetails && courtsData.map((court: GetAllAvailableCourtsByDateData, index) => (
                    <CourtListComponent
                        key={court.id}
                        court={court}
                        userRole={"USER"}
                        daysOpen={clubDetails[index]?.daysOpen}
                    />
                ))}
            </div>
        </div>
    )
}