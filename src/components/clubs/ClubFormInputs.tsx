import {
  MdDriveFileRenameOutline,
  MdOutlineShortText,
  MdImage,
  MdOutlineDeleteForever,
} from "react-icons/md";
import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import { useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useMap } from "react-leaflet";
import dynamic from "next/dynamic";
import axios from "axios";
import { translateCourtSurface, translateCourtType } from "@/utils/courthelper";
import { DaysOpen } from "@/hooks/club";
import { ImageCropFrame } from "../common/imageCrop/ImageCropFrame";
import APIImageComponent from "@/hooks/imageAPI";

function FormInput({
  type,
  id,
  name,
  placeholder,
  value,
  icon,
  onChange,
  className,
  isForm,
}: {
  type: string;
  id: string;
  name: string;
  placeholder: string;
  accept?: string;
  value?: string;
  icon?: React.ReactNode;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  className?: string;
  isForm?: boolean;
}) {
  return (
    <div
      className={`flex items-center border text-sm lg:text-base border-gray-500 rounded px-3 py-2 ${className}`}
    >
      {icon}
      {isForm ? (
        <form id={id}>
          <input
            type={type}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className="w-full outline-none focus:outline-none bg-inherit"
            autoComplete="off"
            required
          />
        </form>
      ) : (
        <input
          type={type}
          id={id}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full outline-none focus:outline-none bg-inherit"
          autoComplete="off"
          required
        />
      )}
    </div>
  );
}

export function NameInput({
  name,
  setName,
  placeholder,
}: {
  name: string;
  setName: Dispatch<SetStateAction<string>>;
  placeholder?: string;
}) {
  return (
    <FormInput
      type="text"
      id="nameInput"
      name="name"
      placeholder={placeholder || "Nazwa"}
      value={name}
      icon={
        <MdDriveFileRenameOutline className="h-4 w-4 lg:h-5 lg:w-5 text-gray-500 mr-2" />
      }
      onChange={(e) => {
        const value = e.target.value;
        setName(value);
      }}
    />
  );
}

export function DescriptionInput({
  description,
  setDescription,
}: {
  description: string;
  setDescription: Dispatch<SetStateAction<string>>;
}) {
  return (
    <div className="flex border text-sm lg:text-base border-gray-500 rounded px-3 py-2">
      <MdOutlineShortText className="h-4 w-4 lg:h-5 lg:w-5 text-gray-500 mr-2" />
      <textarea
        id="descriptionInput"
        name="description"
        placeholder="Opis"
        value={description}
        className="w-full h-16 outline-none focus:outline-none bg-inherit"
        onChange={(e) => {
          const value = e.target.value;
          const isValid = /^[\w\s\/\d\WąęłńóśźżĄĘŁŃÓŚŹŻ]{0,255}$/i.test(value);

          if (isValid) {
            setDescription(value);
          }
        }}
      />
    </div>
  );
}

const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  {
    ssr: false,
  }
);

const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  {
    ssr: false,
  }
);

const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  {
    ssr: false,
  }
);

const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false,
});

export function LocationMap({
  locX,
  setLocX,
  locY,
  setLocY,
  locName,
  setLocName,
}: {
  locX: number;
  setLocX: Dispatch<SetStateAction<number>>;
  locY: number;
  setLocY: Dispatch<SetStateAction<number>>;
  locName: string;
  setLocName: Dispatch<SetStateAction<string>>;
}) {
  let markerIcon: L.Icon;

  if (typeof window !== "undefined") {
    const L = require("leaflet");
    markerIcon = new L.Icon({
      iconUrl: "/marker-icon-2x.png",
      shadowUrl: "/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12.5, 41],
      popupAnchor: [0, -38],
    });
  }

  const [position, setPosition] = useState<L.LatLng | null>(null);

  useEffect(() => {
    import("leaflet").then((L) => {
      if (locX === 0 && locY === 0) {
        setPosition(null);
      } else {
        setPosition(new L.LatLng(locX, locY));
      }
    });
  }, [locX, locY]);

  const MyMapEvents: React.FC = () => {
    const map = useMap();

    useEffect(() => {
      if (position !== null) {
        map.setView(position, map.getZoom());
      }
    }, [position, map]);

    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setPosition(e.latlng);
        setLocX(lat);
        setLocY(lng);
        console.log(`Wybrane współrzędne: ${lat}, ${lng}`);
        axios
          .get(
            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
          )
          .then((response) => {
            const address = response.data.address;
            const streetNumber = address.house_number || "";
            const streetName = address.road || "";
            const city = address.city || address.town || address.village || "";
            const name = streetNumber
              ? `${streetName} ${streetNumber}, ${city}`
              : `${streetName}, ${city}`;

            setLocName(name);
            console.log(`Nazwa miejsca: ${locName}`);
          })
          .catch((error) => {
            console.error("Błąd pobierania nazwy miejsca:", error);
          });
      },
    });

    return position ? (
      <Marker position={position} icon={markerIcon}>
        <Popup>Wybrana lokalizacja: {locName}</Popup>
      </Marker>
    ) : null;
  };

  return (
    <MapContainer
      center={[50.04370714836096, 22.00386841259957]}
      zoom={15}
      className="w-full h-96 rounded"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <MyMapEvents />
    </MapContainer>
  );
}

export function ClubLogoInput({
  logoFile,
  setLogoFile,
  isForm,
  logoId,
}: {
  logoFile: File;
  setLogoFile: Dispatch<SetStateAction<File>>;
  isForm?: boolean;
  logoId: number;
}) {
  return (
    <div
      className={`flex flex-col sm:flex-row items-center border text-sm lg:text-base border-gray-500 rounded px-3 pt-1 pb-10`}
    >
      <ImageCropFrame
        formName="logoInput"
        croppingRatio={16 / 16}
        imageFile={logoFile}
        setImageFile={setLogoFile}
      />
      <div className="flex flex-row items-center mt-10 justify-center space-x-12 pt-2 bg-close2White pr-0 sm:pr-10 lg:pr-20">
        <div className="w-[120px]">
          <APIImageComponent
            imageId={logoId === -1 ? 0 : logoId}
            type="clubLogo"
          />
        </div>
      </div>
    </div>
  );
}

function OpenHoursSpan({
  day,
  openTime,
  closeTime,
  handleTimeChange,
  handleCheckboxChange,
}: {
  day: string;
  openTime: string;
  closeTime: string;
  handleTimeChange: (
    day: keyof DaysOpen,
    openTime: boolean,
    value: string
  ) => void;
  handleCheckboxChange: (day: keyof DaysOpen, checked: boolean) => void;
}) {
  const dayNames: { [key: string]: string } = {
    monday: "Poniedziałek",
    tuesday: "Wtorek",
    wednesday: "Środa",
    thursday: "Czwartek",
    friday: "Piątek",
    saturday: "Sobota",
    sunday: "Niedziela",
  };

  return (
    <span className="flex text-xs xs:text-sm space-x-2">
      <input
        type="checkbox"
        checked={openTime !== null}
        onChange={(e) =>
          handleCheckboxChange(day as keyof DaysOpen, e.target.checked)
        }
      />
      <p className="w-20 xs:w-36">{dayNames[day]}</p>
      <input
        className="bg-mainWhite"
        type="time"
        name={`open${day}`}
        id={`open${day}`}
        value={openTime ? openTime.substring(0, 5) : "00:00"}
        onChange={(e) =>
          handleTimeChange(day as keyof DaysOpen, true, e.target.value)
        }
      />
      <p>:</p>
      <input
        className="bg-mainWhite"
        type="time"
        name={`close${day}`}
        id={`close${day}`}
        value={closeTime ? closeTime.substring(0, 5) : "00:00"}
        onChange={(e) =>
          handleTimeChange(day as keyof DaysOpen, false, e.target.value)
        }
      />
    </span>
  );
}

export function OpenHoursInput({
  className,
  daysOpen,
  setDaysOpen,
}: {
  className?: string;
  daysOpen: DaysOpen;
  setDaysOpen: Dispatch<SetStateAction<DaysOpen>>;
}) {
  const handleTimeChange = (
    day: keyof DaysOpen,
    openTime: boolean,
    value: string
  ) => {
    setDaysOpen((prevDaysOpen) => {
      const updatedDay = {
        ...prevDaysOpen[day],
        [openTime ? "open" : "closed"]: value,
      };

      if (openTime && updatedDay.closed === null) {
        updatedDay.closed = "17:00";
      } else if (!openTime && updatedDay.open === null) {
        updatedDay.open = "08:00";
      }

      return {
        ...prevDaysOpen,
        [day]: updatedDay,
      };
    });
  };

  const handleCheckboxChange = (day: keyof DaysOpen, checked: boolean) => {
    setDaysOpen((prevDaysOpen) => ({
      ...prevDaysOpen,
      [day]: {
        open: checked ? prevDaysOpen[day].open || "08:00" : null,
        closed: checked ? prevDaysOpen[day].closed || "17:00" : null,
      },
    }));
  };

  return (
    <div
      className={`flex flex-col items-center border text-sm lg:text-base border-gray-500 rounded w-fit px-3 py-2 space-y-1 ${className}`}
    >
      <OpenHoursSpan
        day="monday"
        openTime={daysOpen.monday.open}
        closeTime={daysOpen.monday.closed}
        handleTimeChange={handleTimeChange}
        handleCheckboxChange={handleCheckboxChange}
      />
      <OpenHoursSpan
        day="tuesday"
        openTime={daysOpen.tuesday.open}
        closeTime={daysOpen.tuesday.closed}
        handleTimeChange={handleTimeChange}
        handleCheckboxChange={handleCheckboxChange}
      />
      <OpenHoursSpan
        day="wednesday"
        openTime={daysOpen.wednesday.open}
        closeTime={daysOpen.wednesday.closed}
        handleTimeChange={handleTimeChange}
        handleCheckboxChange={handleCheckboxChange}
      />
      <OpenHoursSpan
        day="thursday"
        openTime={daysOpen.thursday.open}
        closeTime={daysOpen.thursday.closed}
        handleTimeChange={handleTimeChange}
        handleCheckboxChange={handleCheckboxChange}
      />
      <OpenHoursSpan
        day="friday"
        openTime={daysOpen.friday.open}
        closeTime={daysOpen.friday.closed}
        handleTimeChange={handleTimeChange}
        handleCheckboxChange={handleCheckboxChange}
      />
      <OpenHoursSpan
        day="saturday"
        openTime={daysOpen.saturday.open}
        closeTime={daysOpen.saturday.closed}
        handleTimeChange={handleTimeChange}
        handleCheckboxChange={handleCheckboxChange}
      />
      <OpenHoursSpan
        day="sunday"
        openTime={daysOpen.sunday.open}
        closeTime={daysOpen.sunday.closed}
        handleTimeChange={handleTimeChange}
        handleCheckboxChange={handleCheckboxChange}
      />
    </div>
  );
}

export function CourtTypeInput({
  courtType,
  setCourtType,
}: {
  courtType: string;
  setCourtType: Dispatch<SetStateAction<string>>;
}) {
  return (
    <div className="space-y-1">
      <p className="text-sm">Wybierz typ kortu:</p>
      <select
        value={courtType}
        onChange={(e) => setCourtType(e.target.value)}
        className="border border-gray-300 rounded px-3 py-2"
      >
        <option value="INDOOR">{translateCourtType("INDOOR")}</option>
        <option value="OUTDOOR">{translateCourtType("OUTDOOR")}</option>
      </select>
    </div>
  );
}

export function CourtSurfaceInput({
  courtSurface,
  setCourtSurface,
}: {
  courtSurface: string;
  setCourtSurface: Dispatch<SetStateAction<string>>;
}) {
  return (
    <div className="space-y-1">
      <p className="text-sm">Wybierz nawierzchnię kortu:</p>
      <select
        value={courtSurface}
        onChange={(e) => setCourtSurface(e.target.value)}
        className="border border-gray-300 rounded px-3 py-2"
      >
        <option value="CLAY">{translateCourtSurface("CLAY")}</option>
        <option value="CONCRETE">{translateCourtSurface("CONCRETE")}</option>
        <option value="GRASS">{translateCourtSurface("GRASS")}</option>
        <option value="ACRYLIC">{translateCourtSurface("ACRYLIC")}</option>
      </select>
    </div>
  );
}
