import CloseCross from "./atoms/CloseCross";

export default function Modal({
  children,
  closeModal,
}: {
  children: React.ReactNode;
  closeModal: () => void;
}) {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-mainWhite p-6 rounded shadow-md w-80">
        <CloseCross handleCloseCross={closeModal} />
        {children}
      </div>
    </div>
  );
}
