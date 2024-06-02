import {FC} from "react";

interface CourtTypeProps {
    isIndoor: boolean;
    label: string;
    onClick: () => void;
    left: boolean;
}

const CourtType: FC<CourtTypeProps> = ({ isIndoor, label, onClick, left }) => {
    return (
        <span className={`flex justify-center items-center w-1/2 cursor-pointer h-full ${left ? 'rounded-l-full' : 'rounded-r-full'} transition-all duration-500 ease-in-out ${isIndoor ? 'scale-y-105 bg-mainGreen text-mainBlack' : 'scale-100 bg-lightGrey text-mainWhite'}`}
            onClick={onClick}>
            {label}
        </span>
    );
}

export default CourtType;