"use client";
import { getAllClubs } from "@/hooks/club";
import React from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { useQuery } from "react-query";

export default function Map() {
  const { data: clubsData } = useQuery("clubs", getAllClubs);

  if (clubsData?.content.length === 0 || clubsData === undefined) return <></>;
  return (
    <div>
      <h2 className="w-full text-center py-10 uppercase text-2xl sm:text-lg md:text-2xl lg:text-3xl xl:text-4xl text-darkGreen">
        Zobacz, gdzie już jesteśmy!
      </h2>
      <MapContainer
        center={[
          clubsData.content[0].location.locX,
          clubsData.content[0].location.locY,
        ]}
        zoom={13}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {clubsData?.content.map((club) => (
          <Marker position={[club.location.locX, club.location.locY]}>
            <Popup>
              <a href={`/clubs/${club.id}`}>{club.name}</a>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
