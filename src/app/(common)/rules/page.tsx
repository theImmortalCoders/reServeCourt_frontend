"use client";
import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

function Point({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <span
      className="flex items-center text-base sm:text-xl md:text-2xl text-mainOrange pt-2 select-none cursor-pointer"
      onClick={onClick}
    >
      {children}
    </span>
  );
}

function List({ children }: { children: React.ReactNode }) {
  return <ol className="list-decimal ml-10">{children}</ol>;
}

function Rule({ children }: { children: React.ReactNode }) {
  return <li className="text-xs md:text-sm font-sans mt-2">{children}</li>;
}

export default function RulesPage() {
  const [isVisible, setIsVisible] = useState<number>(0);

  return (
    <div className="flex flex-col items-center min-h-max">
      <div className="m-8 p-5 w-11/12 md:w-3/4 h-auto border-2 border-darkGreen rounded-2xl space-y-2">
        <div className="flex flex-col w-full items-center md:items-start text-center md:text-left">
          <h1 className="text-3xl md:text-4xl text-darkGreen">REGULAMIN</h1>
          <p className="text-xs md:text-sm text-mainBlack mt-2">
            REGULAMIN PORTALU{" "}
            <span className="text-mainGreen">ReServeCourt</span> (dostępny pod
            adresem www.reservecourt.pl)
          </p>
        </div>
        <Point
          onClick={() => (isVisible !== 1 ? setIsVisible(1) : setIsVisible(0))}
        >
          <span>I. Postanowienia ogólne</span>
          <FiChevronDown
            className={`cursor-pointer transform ${
              isVisible === 1 ? "rotate-180" : ""
            }`}
          />
        </Point>
        {isVisible === 1 && (
          <List>
            <Rule>
              Niniejszy regulamin dotyczy korzystania z systemu rezerwacji
              online kortów tenisowych dostępnego na portalu ReServeCourt.
            </Rule>
            <Rule>
              Korzystanie z systemu rezerwacji oznacza akceptację postanowień
              niniejszego regulaminu.
            </Rule>
          </List>
        )}
        <Point
          onClick={() => (isVisible !== 2 ? setIsVisible(2) : setIsVisible(0))}
        >
          <span>II. Rezerwacja kortu</span>
          <FiChevronDown
            className={`cursor-pointer transform ${
              isVisible === 2 ? "rotate-180" : ""
            }`}
          />
        </Point>
        {isVisible === 2 && (
          <List>
            <Rule>
              Rezerwacji można dokonać poprzez wypełnienie formularza
              rezerwacyjnego na stronie.
            </Rule>
            <Rule>
              Rezerwacja jest możliwa do 14 dni przed planowanym terminem.
            </Rule>
            <Rule>
              Każdy użytkownik może dokonać maksymalnie dwóch rezerwacji
              tygodniowo.
            </Rule>
          </List>
        )}
        <Point
          onClick={() => (isVisible !== 3 ? setIsVisible(3) : setIsVisible(0))}
        >
          <span>III. Opłaty i płatności</span>
          <FiChevronDown
            className={`cursor-pointer transform ${
              isVisible === 3 ? "rotate-180" : ""
            }`}
          />
        </Point>
        {isVisible === 3 && (
          <List>
            <Rule>
              Opłata za wynajem kortu jest ustalana zgodnie z cennikiem
              opublikowanym na stronie.
            </Rule>
            <Rule>
              Płatność za rezerwację należy dokonać online za pomocą dostępnych
              metod płatności.
            </Rule>
          </List>
        )}
        <Point
          onClick={() => (isVisible !== 4 ? setIsVisible(4) : setIsVisible(0))}
        >
          <span>IV. Odwołanie rezerwacji</span>
          <FiChevronDown
            className={`cursor-pointer transform ${
              isVisible === 4 ? "rotate-180" : ""
            }`}
          />
        </Point>
        {isVisible === 4 && (
          <List>
            <Rule>
              Użytkownik ma prawo odwołać rezerwację bez ponoszenia kosztów do
              48 godzin przed planowanym terminem.
            </Rule>
            <Rule>
              W przypadku późniejszego odwołania, użytkownikowi nie przysługuje
              zwrot kosztów rezerwacji.
            </Rule>
          </List>
        )}
        <Point
          onClick={() => (isVisible !== 5 ? setIsVisible(5) : setIsVisible(0))}
        >
          <span>V. Zasady korzystania z kortu</span>
          <FiChevronDown
            className={`cursor-pointer transform ${
              isVisible === 5 ? "rotate-180" : ""
            }`}
          />
        </Point>
        {isVisible === 5 && (
          <List>
            <Rule>
              Użytkownicy są zobowiązani do przestrzegania zasad korzystania z
              kortu, w tym do zachowania czystości i porządku.
            </Rule>
            <Rule>
              Na kortach obowiązuje zakaz palenia i spożywania alkoholu.
            </Rule>
          </List>
        )}
        <Point
          onClick={() => (isVisible !== 6 ? setIsVisible(6) : setIsVisible(0))}
        >
          <span>VI. Postanowienia końcowe</span>
          <FiChevronDown
            className={`cursor-pointer transform ${
              isVisible === 6 ? "rotate-180" : ""
            }`}
          />
        </Point>
        {isVisible === 6 && (
          <List>
            <Rule>
              Właściciel kortów zastrzega sobie prawo do zmiany regulaminu.
            </Rule>
            <Rule>
              W sprawach nieuregulowanych niniejszym regulaminem zastosowanie
              mają przepisy ogólne prawa.
            </Rule>
          </List>
        )}
      </div>
    </div>
  );
}
