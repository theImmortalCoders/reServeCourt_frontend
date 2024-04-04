

export default function Price() {
  return (
    <div className="min-h-max max-w-max bg-mainWhite">
      <div className="flex flex-col w-full justify-center items-center py-20 text-4xl text-darkGreen">
        <span className="flex w-full justify-center items-center pb-10 mb-2">Cennik kortów</span>
        <div className="flex flex-row w-1/2 h-10 justify-around items-center rounded-full text-lg">
            <div className="w-5 h-5 rounded-full bg-mainGreen border-2 border-darkGreen"></div>
            <div className="w-5 h-5 rounded-full bg-mainWhite border-2 border-mainWhite"></div>
        </div>
        <div className="flex flex-row w-1/2 h-10 justify-center items-center rounded-full text-lg mb-4">
            <span className="flex justify-center items-center w-1/2 scale-y-105 h-full bg-mainGreen text-mainBlack rounded-l-full">KORTY KRYTE</span>
            <span className="flex justify-center items-center w-1/2 h-full bg-lightGrey text-mainWhite rounded-r-full">KORTY OTWARTE</span>
        </div>
        <div className="flex flex-col w-2/3 justify-center items-center rounded-xl text-lg bg-mainGreen p-1 mb-6">
            <div className="flex flex-row w-full justify-center items-center py-1 border-b-2 border-mainOrange">
                <span className="w-1/4 flex items-center justify-center">GODZINY</span>
                <span className="w-1/4 flex items-center justify-center">PN - CZW</span>
                <span className="w-1/4 flex items-center justify-center">PT</span>
                <span className="w-1/4 flex items-center justify-center">SO - NI</span>
            </div>
            <div className="flex flex-row w-full justify-center items-center py-1">
                <span className="w-1/4 flex items-center justify-center">1</span>
                <span className="w-1/4 flex items-center justify-center">60zł</span>
                <span className="w-1/4 flex items-center justify-center">65zł</span>
                <span className="w-1/4 flex items-center justify-center">70zł</span>
            </div>
            <div className="flex flex-row w-full justify-center items-center py-1">
                <span className="w-1/4 flex items-center justify-center">2</span>
                <span className="w-1/4 flex items-center justify-center">100zł</span>
                <span className="w-1/4 flex items-center justify-center">110zł</span>
                <span className="w-1/4 flex items-center justify-center">120zł</span>
            </div>
            <div className="flex flex-row w-full justify-center items-center py-1">
                <span className="w-1/4 flex items-center justify-center">4</span>
                <span className="w-1/4 flex items-center justify-center">180zł</span>
                <span className="w-1/4 flex items-center justify-center">190zł</span>
                <span className="w-1/4 flex items-center justify-center">200zł</span>
            </div>
            <div className="flex flex-row w-full justify-center items-center py-1">
                <span className="w-1/4 flex items-center justify-center">6</span>
                <span className="w-1/4 flex items-center justify-center">250zł</span>
                <span className="w-1/4 flex items-center justify-center">280zł</span>
                <span className="w-1/4 flex items-center justify-center">300zł</span>
            </div>
            <div className="flex flex-row w-full justify-center items-center py-1">
                <span className="w-1/4 flex items-center justify-center">CAŁY DZIEŃ</span>
                <span className="w-1/4 flex items-center justify-center">320zł</span>
                <span className="w-1/4 flex items-center justify-center">340zł</span>
                <span className="w-1/4 flex items-center justify-center">350zł</span>
            </div>
        </div>
        <div className="flex items-center justify-center w-2/3 text-sm text-center text-darkGreen rounded-xl py-2 mb-6">
            <span className="flex items-center justify-center w-1/2 border-b-[1px] border-darkGreen">
                Zniżka studencka: -10%
            </span>
            <span className="flex items-center justify-center w-1/2">
                Karta dużej rodziny: -20%
            </span>
        </div>
        <span className="flex items-center justify-center w-2/3 text-sm text-center text-mainOrange border-2 border-lightGrey rounded-xl py-2">
            W przypadku wynajmu kortów tenisowych dla zorganizowanych grup, ceny mogą być ustalane indywidualnie. Oznacza to, że koszt wynajmu może zależeć od wielu czynników. Pamiętaj, że każdy obiekt może mieć swoje własne zasady i procedury dotyczące wynajmu dla zorganizowanych grup. Prosimy więc o kontakt w takich sprawach.
        </span>
      </div>
    </div>
  );
}
