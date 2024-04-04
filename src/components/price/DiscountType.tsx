interface DiscountTypeProps {
    text: string;
    lORr: string;
}

const DiscountType: React.FC<DiscountTypeProps> = ({ text, lORr }) => {
    return (
        <span className={`flex items-center justify-center pb-1 p${lORr}-1 border-b-2 border-${lORr}-2 border-darkGreen`}>
            {text}
        </span>
    );
}

export default DiscountType;