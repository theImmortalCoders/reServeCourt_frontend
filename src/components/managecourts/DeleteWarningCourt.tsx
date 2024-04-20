import { useState, Dispatch, SetStateAction } from "react";
import { deleteCourt } from "@/hooks/court";

export default function DeleteWarningCourt({
  deleteWarning,
  setDeleteWarning,
  tempId,
  setTempId,
}: {
  deleteWarning: boolean;
  setDeleteWarning: Dispatch<SetStateAction<boolean>>;
  tempId: number;
  setTempId: Dispatch<SetStateAction<number>>;
}) {
  const [message, setMessage] = useState<string>("");

  const confirmDelete = async () => {
    try {
      const result = await deleteCourt(tempId);
      if (result === 200) {
        setTempId(-1);
        setDeleteWarning(false);
      } else {
        console.error("Błąd usuwania kortu");
        setMessage("Błąd usuwania kortu");
      }
    } catch (error) {
      console.error("Błąd dodawania kortu", error);
      setMessage("Błąd usuwania kortu");
    }
  };
  return (
    <div className="fixed flex items-center justify-center inset-0 z-10">
      <div className="absolute inset-0 bg-mainWhite opacity-80"></div>
      <div className="flex flex-col justify-center items-center w-1/4 border-2 border-darkGreen bg-mainWhite rounded space-y-2 p-4 z-20">
        <h1 className="text-xl">Usuwanie kortu</h1>
        <p className="text-sm text-center font-sans">
          Czy na pewno chcesz usunąć wybrany kort?
          <br />
          Operacja jest nieodwracalna i spowoduje trwałe usunięcie kortu.
        </p>
        <span className="space-x-4">
          <button
            onClick={() => setDeleteWarning(false)}
            className="text-right text-mainOrange text-sm sm:text-md"
          >
            Anuluj
          </button>
          <button
            onClick={confirmDelete}
            className="bg-red-600 text-mainWhite text-sm rounded px-4 py-2 w-fit"
          >
            Usuń
          </button>
        </span>
        {message && <p className="mt-2 text-sm">{message}</p>}
      </div>
    </div>
  );
}
