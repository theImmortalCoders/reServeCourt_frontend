import { Dispatch, SetStateAction } from "react";

export default function VerifyWarning({
                                          setVerifyWarning,
                                          tempId,
                                          handleVerifyReservation
                                      }: {
    setVerifyWarning: Dispatch<SetStateAction<boolean>>;
    tempId: number;
    handleVerifyReservation: (id:number) => void;
}) {
    return (
        <div className="fixed flex items-center justify-center inset-0 z-10">
            <div className="absolute inset-0 bg-mainWhite opacity-80"></div>
                <div className="flex flex-col justify-center items-center w-64 sm:w-96 border-2 border-darkGreen bg-mainWhite rounded space-y-2 p-4 z-20">
                    <h1 className="text-xl">Weryfikowanie rezerwacji</h1>
                    <p className="text-sm text-center font-sans">
                        Czy na pewno chcesz zweryfikować wybraną rezerwację?
                    </p>
                    <span className="space-x-4">
             <button
                 onClick={() => setVerifyWarning(false)}
                 className="text-right text-mainOrange text-sm sm:text-md"
             >
              Anuluj
            </button>
            <button
                onClick={() => {
                    handleVerifyReservation(tempId);
                    setVerifyWarning(false);
                }}
                className="bg-mainGreen text-mainWhite text-sm rounded px-4 py-2 w-fit"
            >
              Tak
            </button>
          </span>
                </div>
        </div>
    );
}