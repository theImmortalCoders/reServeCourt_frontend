interface TableRowProps {
    hours: string;
    p1: string;
    p2: string;
    p3: string;
    p4: string;
    p5: string;
    p6: string;
    isIndoor: boolean;
    isInfo: boolean;
}

const TableRow: React.FC<TableRowProps> = ({ hours, p1, p2, p3, p4, p5, p6, isIndoor, isInfo }) => {
    return (
        <div className={`flex flex-row w-full justify-center items-center py-1 ${isInfo ? 'border-b-[1px] xs:border-b-2 border-mainOrange' : ''}`}>
            <span className="w-1/4 flex items-center justify-center text-center">{hours}</span>
            <span className="w-1/4 flex items-center justify-center text-center">{!isInfo ? (isIndoor ? p1 : p2) : (p1)}</span>
            <span className="w-1/4 flex items-center justify-center text-center">{!isInfo ? (isIndoor ? p3 : p4) : (p3)}</span>
            <span className="w-1/4 flex items-center justify-center text-center">{!isInfo ? (isIndoor ? p5 : p6) : (p5)}</span>
        </div>
    );
}

export default TableRow;