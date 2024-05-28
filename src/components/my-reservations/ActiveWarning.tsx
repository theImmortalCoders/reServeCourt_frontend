import { Dispatch, SetStateAction } from "react";

export default function ActiveWarning({
    setActiveWarning,
    tempId,
                                          handleActiveClub,
    isActive,
  }: {
    setActiveWarning: Dispatch<SetStateAction<boolean>>;
    tempId: number;
    handleActiveClub: (id:number) => void;
    isActive: boolean
  }) {
    return (
      <div className="fixed flex items-center justify-center inset-0 z-10">
        <div className="absolute inset-0 bg-mainWhite opacity-80"></div>
        <div className="flex flex-col justify-center items-center w-64 sm:w-96 border-2 border-darkGreen bg-mainWhite rounded space-y-2 p-4 z-20">
          <h1 className="text-xl">{isActive? 'Aktywacja ' : 'Dekatywacja '}kortu</h1>
          <p className="text-sm text-center font-sans">
            Czy na pewno chcesz aktywować wybrane kort?
          </p>
          <span className="space-x-4">
            <button
              onClick={() => setActiveWarning(false)}
              className="text-right text-mainOrange text-sm sm:text-md"
            >
              Anuluj
            </button>
            <button
              onClick={() => {
                  handleActiveClub(tempId);
                setActiveWarning(false);
            }}
              className="bg-red-600 text-mainWhite text-sm rounded px-4 py-2 w-fit"
            >
              Tak
            </button>
          </span>
        </div>
      </div>
    );
  }