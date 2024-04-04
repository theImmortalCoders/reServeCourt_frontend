interface CourtTypeProps {
    isIndoor: boolean;
    label: string;
    onClick: () => void;
    lORr: string;
}

const CourtType: React.FC<CourtTypeProps> = ({ isIndoor, label, onClick, lORr }) => {
    return (
        <span className={`flex justify-center items-center w-1/2 cursor-pointer h-full rounded-${lORr}-full transition-all duration-500 ease-in-out ${isIndoor ? 'scale-y-105 bg-mainGreen text-mainBlack' : 'scale-100 bg-lightGrey text-mainWhite'}`}
            onClick={onClick}>
            {label}
        </span>
    );
}

export default CourtType;