import { useState, Dispatch, SetStateAction } from "react";
import { deleteClub } from "@/hooks/club";
import { deleteImage } from "@/hooks/image";

export default function DeleteWarning({
  deleteWarning,
  setDeleteWarning,
  tempId,
  setTempId,
}: {
  deleteWarning: boolean;
  setDeleteWarning: Dispatch<SetStateAction<boolean>>;
  tempId: number[];
  setTempId: Dispatch<SetStateAction<number[]>>;
}) {
  const [message, setMessage] = useState<string>("");

  const confirmDelete = async () => {
    try {
      const result_1 = await deleteClub(tempId[0]);
      const result_2 = await deleteImage(tempId[1]);
      if (result_1 === 200 && result_2 === 200) {
        setTempId([-1, -1]);
        setDeleteWarning(false);
      } else {
        console.error("Błąd usuwania klubu");
        setMessage("Błąd usuwania klubu");
      }
    } catch (error) {
      console.error("Błąd dodawania klubu", error);
      setMessage("Błąd usuwania klubu");
    }
  };
  return (
    <div className="fixed flex items-center justify-center inset-0 z-10">
      <div className="absolute inset-0 bg-mainWhite opacity-80"></div>
      <div className="flex flex-col justify-center items-center w-64 sm:w-96 border-2 border-darkGreen bg-mainWhite rounded space-y-2 p-4 z-20">
        <h1 className="text-xl">Usuwanie klubu</h1>
        <p className="text-sm text-center font-sans">
          Czy na pewno chcesz usunąć wybrany klub?
          <br />
          Operacja jest nieodwracalna i spowoduje trwałe usunięcie klubu wraz ze
          wszystkimi przypisanymi do niego kortami.
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
