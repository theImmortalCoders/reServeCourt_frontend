import { MdOutlineStar, MdStarHalf, MdOutlineStarBorder } from "react-icons/md";

export default function RatingStars({ rating, className }: { rating: number, className?: string }) {
    let totalFullStars : number, halfStar : number;

    if (rating < 5 && rating >= 4.75) {
        totalFullStars = 5;
        halfStar = 0;
    } else if (rating < 4.75 && rating >= 4.25) {
        totalFullStars = 4;
        halfStar = 0.5;
    } else if (rating < 4.25 && rating >= 3.75) {
        totalFullStars = 4;
        halfStar = 0;
    } else if (rating < 3.75 && rating >= 3.25) {
        totalFullStars = 3;
        halfStar = 0.5;
    } else if (rating < 3.25 && rating >= 2.75) {
        totalFullStars = 3;
        halfStar = 0;
    } else if (rating < 2.75 && rating >= 2.25) {
        totalFullStars = 2;
        halfStar = 0.5;
    } else if (rating < 2.25 && rating >= 1.75) {
        totalFullStars = 2;
        halfStar = 0;
    } else if (rating < 1.75 && rating >= 1.25) {
        totalFullStars = 1;
        halfStar = 0.5;
    } else if (rating < 1.25 && rating >= 0.75) {
        totalFullStars = 1;
        halfStar = 0;
    } else if (rating < 0.75 && rating >= 0.25) {
        totalFullStars = 0;
        halfStar = 0.5;
    } else {
        totalFullStars = 0;
        halfStar = 0;
    }

    const emptyStars = 5 - totalFullStars - halfStar;

    return (
        <div className={`flex ${className}`}>
            {[...Array(totalFullStars)].map((_, index) => (
                <MdOutlineStar key={`full_${index}`} />
            ))}
            {halfStar === 0.5 && <MdStarHalf key="half_0" />}
            {[...Array(Math.floor(emptyStars))].map((_, index) => (
                <MdOutlineStarBorder key={`empty_${index}`} />
            ))}
        </div>
    );
}
