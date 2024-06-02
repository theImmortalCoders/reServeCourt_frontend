import {FC} from "react";

interface DiscountTypeProps {
    text: string;
    left: boolean;
}

const DiscountType: FC<DiscountTypeProps> = ({ text, left }) => {
    return (
        <span className={`flex items-center justify-center pb-1 ${left ? 'pl-1 border-l-0 2xs:border-l-2' : 'pr-1 border-r-0 2xs:border-r-2'} border-b-2 border-darkGreen`}>
            {text}
        </span>
    );
}

export default DiscountType;