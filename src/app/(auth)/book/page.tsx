"use client";
import { useState } from "react";
import { getAllAvailableCourtsByDate } from "@/hooks/court"
import CourtListComponent from "@/components/courts/CourtListComponent"
import { translateCourtType, translateCourtSurface } from "@/utils/courthelper"

export default function BookPage() {

    return (
        <div className="flex flex-col items-center bg-mainWhite min-h-max py-8 space-y-6">
            <div className="flex flex-col md:flex-row items-center justify-center md:space-x-4 space-y-4 md:space-y-0">
                <span className="flex flex-col md:flex-row md:space-x-4 text-xs px-4 py-2 border-2 border-darkGreen rounded">
                    <div>
                        <p>Termin rezerwacji:</p>
                        <span className="flex space-x-4 my-2 w-fit bg-white font-sans border border-darkGreen rounded px-1">
                            <input type="date" name="" id="" className="outline-none"/>
                            <input type="time" name="" id="" className="outline-none"/>
                            <p>:</p>
                            <input type="time" name="" id="" className="outline-none"/>
                        </span>
                    </div>
                    <span className="flex flex-col sm:flex-row sm:space-x-4">
                        <div>
                            <p>Typ:</p>
                            <select
                                className="my-2 font-sans w-24 border border-darkGreen rounded px-1 outline-none"
                            >
                                <option value="INDOOR">{translateCourtType("INDOOR")}</option>
                                <option value="OUTDOOR">{translateCourtType("OUTDOOR")}</option>
                            </select>
                        </div>
                        <div> 
                            <p>Nawierzchnia:</p>
                            <select
                                className="my-2 font-sans w-24 border border-darkGreen rounded px-1 outline-none"
                            >
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
                    <button className="bg-mainGreen text-white rounded w-fit h-fit px-2 py-1">Szukaj</button>
                </span>
            </div>
        </div>
    )
}