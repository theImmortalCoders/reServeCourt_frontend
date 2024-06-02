import { AiOutlineClose } from "react-icons/ai";
import {ReactNode} from "react";

const CloseCross = ({ handleCloseCross }: { handleCloseCross: () => void }) => {
  return (
    <div className="flex justify-end">
      <button
        className="font-semibold text-mainBlack hover:text-mainOrange"
        onClick={() => handleCloseCross()}
      >
        <AiOutlineClose height={24} width={24} />
      </button>
    </div>
  );
};

export default function Modal({
  children,
  closeModal,
}: {
  children: ReactNode;
  closeModal: () => void;
}) {
  return (
    <div className="fixed top-0 left-0 w-full h-full pt-navbar flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-mainWhite p-6 rounded shadow-md w-80">
        <CloseCross handleCloseCross={closeModal} />
        {children}
      </div>
    </div>
  );
}
