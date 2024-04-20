import { MdDriveFileRenameOutline, MdOutlineShortText, MdImage } from "react-icons/md";
import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import { useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useMap } from 'react-leaflet';
import dynamic from "next/dynamic"
import axios from 'axios';

function ClubFormInput ({
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
    placeholder: string,
    accept?: string,
    value?: string,
    icon?: React.ReactNode;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    className?: string;
    isForm?: boolean;
    }) {
    return (
        <div className={`flex items-center border text-sm lg:text-base border-gray-500 rounded px-3 py-2 ${className}`}>
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
    )
}

export function ClubNameInput ({
    name,
    setName
    }: {
    name: string;
    setName: Dispatch<SetStateAction<string>>;
    }) {
    return (
        <ClubFormInput
            type="text"
            id="nameInput"
            name="name"
            placeholder="Nazwa"
            value={name}
            icon={<MdDriveFileRenameOutline className="h-4 w-4 lg:h-5 lg:w-5 text-gray-500 mr-2"/>}
            onChange={(e) => {
                const value = e.target.value;
                setName(value);
            }}
        />   
    )
}

export function ClubDescriptionInput ({
    description,
    setDescription
    }: {
    description: string;
    setDescription: Dispatch<SetStateAction<string>>;
    }) {
    return (
        <div className="flex border text-sm lg:text-base border-gray-500 rounded px-3 py-2">
            <MdOutlineShortText className="h-4 w-4 lg:h-5 lg:w-5 text-gray-500 mr-2"/>
            <textarea
                id="descriptionInput"
                name="description"
                placeholder="Opis"
                value={description}
                className="w-full h-16 outline-none focus:outline-none bg-inherit"
                onChange={(e) => {
                    const value = e.target.value;
                    setDescription(value);
                }}
            />               
        </div>
    )
}

const MapContainer = dynamic(() => import('react-leaflet').then((mod) => mod.MapContainer), {
    ssr: false,
  });

const TileLayer = dynamic(() => import('react-leaflet').then((mod) => mod.TileLayer), {
    ssr: false,
  });

const Marker = dynamic(() => import('react-leaflet').then((mod) => mod.Marker), {
    ssr: false,
  });
  
const Popup = dynamic(() => import('react-leaflet').then((mod) => mod.Popup), {
    ssr: false,
  });

export function ClubLocationMap ({
    locX,
    setLocX,
    locY,
    setLocY,
    locName,
    setLocName
} : {
    locX: number;
    setLocX: Dispatch<SetStateAction<number>>;
    locY: number;
    setLocY: Dispatch<SetStateAction<number>>; 
    locName: string;
    setLocName: Dispatch<SetStateAction<string>>;
}) {

    const [position, setPosition] = useState<L.LatLng | null>(null);

    useEffect(() => {
        import('leaflet').then((L) => {
            if (locX === 0 && locY === 0) {
                setPosition(null);
            } else {
                setPosition(new L.LatLng(locX, locY));
            }
        });
    }, [locX, locY])
      
    const MyMapEvents: React.FC = () => {

        const map = useMap();

        useEffect(() => {
            if (position !== null) {
                map.setView(position, map.getZoom());
            }
        }, [position, map])

        useMapEvents({
          click(e) {
            const { lat, lng } = e.latlng;
            setPosition(e.latlng);
            setLocX(lat);
            setLocY(lng);
            console.log(`Wybrane współrzędne: ${lat}, ${lng}`);
            axios.get(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`)
            .then((response) => {
                const address = response.data.address;
                const streetNumber = address.house_number || '';
                const streetName = address.road || '';
                const city = address.city || address.town || address.village || ''
                const name = streetNumber ? `${streetName} ${streetNumber}, ${city}` : `${streetName}, ${city}`;

                setLocName(name);
                console.log(`Nazwa miejsca: ${locName}`);
            })
            .catch((error) => {
              console.error('Błąd pobierania nazwy miejsca:', error);
            });
          },
        });
    
        return position ? (
          <Marker position={position}>
            <Popup>Wybrana lokalizacja: {locName}</Popup>
          </Marker>
        ) : null;
      };

    return (
        <MapContainer center={[50.04370714836096, 22.00386841259957]} zoom={15} className="w-full h-96 rounded">
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'/>
            <MyMapEvents />
        </MapContainer>
    )
}

export function ClubLogoInput ({
    logoFile,
    setLogoFile,
    isForm,
    }: {
    logoFile: File;
    setLogoFile: Dispatch<SetStateAction<File>>;
    isForm?: boolean;
    }) {
    return (
    <ClubFormInput
        type="file"
        id="logoInput"
        name="logoFile"
        placeholder="Logo"
        accept=".png, .jpg, .jpeg"
        icon={<MdImage className="h-4 w-4 lg:h-5 lg:w-5 text-gray-500 mr-2"/>}
        onChange={(e) => {
                if (e.target.files) {
                    setLogoFile(e.target.files[0]);
                }
            }
        }
        isForm={isForm}
    />   
    )
}