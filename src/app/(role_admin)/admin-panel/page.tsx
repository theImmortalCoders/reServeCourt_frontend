import Page from "@/components/common/page/Page";
import {Dispatch, SetStateAction} from "react";


const HistoryCurrentSwitch = ({
                                  isCurrent,
                                  setIsCurrent
                              }:{
    isCurrent: boolean;
    setIsCurrent: Dispatch<SetStateAction<boolean>>;
}) => {
    return (
        <div
            className="flex h-10 w-11/12 xs:w-96 items-center border-2 rounded-full relative bg-close2White transition-all z-0"
        >
            <div
                className={ `${isCurrent?"text-close2White":"text-mainGreen"} z-20 w-[50%] transition-colors font-semibold text-center text-base cursor-pointer`}
                onClick={() => {
                    setIsCurrent(false);
                }}
            >
                Rezerwację
            </div>
            <div
                className={ `${isCurrent?"text-mainGreen":"text-mainBlack"} z-20 w-[50%] transition-colors font-semibold text-center text-base cursor-pointer`}
                onClick={() => {
                    setIsCurrent(true);
                }}
            >
                Bieżące
            </div>
        </div>
    )
}

export default function AdminPanelPage() {


    return (<Page><div>dasd</div></Page>)
}