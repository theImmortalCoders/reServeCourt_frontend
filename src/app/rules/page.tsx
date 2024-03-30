"use client";
import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

function Point ({ children }: { children: React.ReactNode }) {
    return (
        <span className="flex items-center text-base sm:text-xl md:text-2xl text-mainOrange pt-2 select-none">{ children }</span>
    )
}

function List ({ children }: { children: React.ReactNode }) {
    return (
        <ol className="list-decimal ml-10">{ children }</ol>
    )
}

function Rule ({ children }: { children: React.ReactNode }) {
    return (
        <li className="text-xs md:text-sm font-sans mt-2">{ children }</li>
    )
}

export default function Page() {
    
    const [isVisible1, setIsVisible1] = useState<boolean>(false);
    const [isVisible2, setIsVisible2] = useState<boolean>(false);
    const [isVisible3, setIsVisible3] = useState<boolean>(false);
    const [isVisible4, setIsVisible4] = useState<boolean>(false);
    const [isVisible5, setIsVisible5] = useState<boolean>(false);
    const [isVisible6, setIsVisible6] = useState<boolean>(false);

    return (
        <div className="flex flex-col items-center min-h-max">
            <div className="m-8 p-5 w-11/12 md:w-3/4 h-auto border-2 border-darkGreen rounded-2xl space-y-2">
                <div className="flex flex-col w-full items-center md:items-start text-center md:text-left">
                    <h1 className="text-3xl md:text-4xl text-darkGreen">REGULAMIN</h1>
                    <p className="text-xs md:text-sm text-mainBlack mt-2">REGULAMIN PORTALU <span className="text-mainGreen">ReServeCourt</span> (dostępny pod adresem www.reservecourt.pl)</p>
                </div>
                <Point>I. Postanowienia ogólne<FiChevronDown className={`cursor-pointer transform ${isVisible1 ? 'rotate-180' : ''}`} onClick={() => setIsVisible1(!isVisible1)}/></Point>
                {isVisible1 &&(
                    <List>
                        <Rule>Niniejszy regulamin dotyczy korzystania z systemu rezerwacji online kortów tenisowych dostępnego na portalu ReServeCourt.</Rule> 
                        <Rule>Korzystanie z systemu rezerwacji oznacza akceptację postanowień niniejszego regulaminu.</Rule>
                    </List>
                )}
                <Point>II. Rezerwacja kortu<FiChevronDown className={`cursor-pointer transform ${isVisible2 ? 'rotate-180' : ''}`} onClick={() => setIsVisible2(!isVisible2)}/></Point>
                {isVisible2 &&(
                    <List>
                        <Rule>Rezerwacji można dokonać poprzez wypełnienie formularza rezerwacyjnego na stronie.</Rule> 
                        <Rule>Rezerwacja jest możliwa do 14 dni przed planowanym terminem.</Rule>
                        <Rule>Każdy użytkownik może dokonać maksymalnie dwóch rezerwacji tygodniowo.</Rule>
                    </List>
                )}
                <Point>III. Opłaty i płatności<FiChevronDown className={`cursor-pointer transform ${isVisible3 ? 'rotate-180' : ''}`} onClick={() => setIsVisible3(!isVisible3)}/></Point>
                {isVisible3 &&(
                    <List>
                        <Rule>Opłata za wynajem kortu jest ustalana zgodnie z cennikiem opublikowanym na stronie.</Rule> 
                        <Rule>Płatność za rezerwację należy dokonać online za pomocą dostępnych metod płatności.</Rule>
                    </List>
                )}
                <Point>IV. Odwołanie rezerwacji<FiChevronDown className={`cursor-pointer transform ${isVisible4 ? 'rotate-180' : ''}`} onClick={() => setIsVisible4(!isVisible4)}/></Point>
                {isVisible4 &&(
                    <List>
                        <Rule>
                            Użytkownik ma prawo odwołać rezerwację bez ponoszenia kosztów do 48 godzin przed planowanym terminem.
                        </Rule> 
                        <Rule>W przypadku późniejszego odwołania, użytkownikowi nie przysługuje zwrot kosztów rezerwacji.</Rule>
                    </List>
                )}
                <Point>V. Zasady korzystania z kortu<FiChevronDown className={`cursor-pointer transform ${isVisible5 ? 'rotate-180' : ''}`} onClick={() => setIsVisible5(!isVisible5)}/></Point>
                {isVisible5 &&(
                    <List>
                        <Rule>Użytkownicy są zobowiązani do przestrzegania zasad korzystania z kortu, w tym do zachowania czystości i porządku.</Rule> 
                        <Rule>Na kortach obowiązuje zakaz palenia i spożywania alkoholu.</Rule>
                    </List>
                )}
                <Point>VI. Postanowienia końcowe<FiChevronDown className={`cursor-pointer transform ${isVisible6 ? 'rotate-180' : ''}`} onClick={() => setIsVisible6(!isVisible6)}/></Point>
                {isVisible6 &&(
                    <List>
                        <Rule>Właściciel kortów zastrzega sobie prawo do zmiany regulaminu.</Rule> 
                        <Rule>W sprawach nieuregulowanych niniejszym regulaminem zastosowanie mają przepisy ogólne prawa.</Rule>
                    </List>
                )}
            </div>
        </div>
    )
}