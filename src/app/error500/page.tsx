export default function Page () {
    return (
        <div className="flex flex-col justify-center items-center h-screen bg-mainWhite">
            <p className="text-2xl lg:text-4xl text-darkGreen">BŁĄD 500</p>
            <img src="/assets/common/reServeCourt.png" alt="logo" className="w-1/2 sm:w-1/4"/>
            <p className="text-lg lg:text-3xl text-center text-darkGreen px-12">Występują problemy techniczne</p>
            <p className="text-base lg:text-2xl text-center text-darkGreen px-12">Zapraszamy później</p>
        </div>
    )
}