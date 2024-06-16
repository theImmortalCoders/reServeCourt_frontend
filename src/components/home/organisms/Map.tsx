"use client";
import { getAllClubs } from "@/hooks/club";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import dynamic from "next/dynamic";

const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false,
});

export default function Map() {
  const { data: clubsData } = useQuery("clubs", getAllClubs);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient || clubsData?.content.length === 0 || clubsData === undefined)
    return <></>;

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
          <Marker
            key={club.id}
            position={[club.location.locX, club.location.locY]}
          >
            <Popup>
              <a href={`/clubs/${club.id}`}>{club.name}</a>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
