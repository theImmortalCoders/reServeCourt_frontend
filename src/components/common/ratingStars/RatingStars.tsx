import { MdOutlineStar, MdStarHalf, MdOutlineStarBorder } from "react-icons/md";

export default function RatingStars({ rating, className }: { rating: number, className?: string }) {
    const fullStars = Math.floor(rating);
    const halfStars = rating % 1 >= 0.75 ? 1 : rating % 1 >= 0.25 ? 0.5 : 0;
    const emptyStars = 5 - fullStars - halfStars;

    return (
        <div className={`flex ${className}`}>
            {Array(fullStars).fill(<MdOutlineStar />)}
            {halfStars === 0.5 && <MdStarHalf />}
            {Array(Math.floor(emptyStars)).fill(<MdOutlineStarBorder />)}
        </div>
    );
}