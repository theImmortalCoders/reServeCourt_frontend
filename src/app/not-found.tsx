export default function Page () {
    return (
        <div className="flex flex-col justify-center items-center h-screen bg-mainWhite">
            <p className="text-2xl lg:text-4xl text-darkGreen">BŁĄD 404</p>
            <img src="/assets/common/reServeCourt.png" alt="logo" className="w-1/2 sm:w-1/4"/>
            <p className="text-xl lg:text-3xl text-center text-darkGreen px-12">Strona nie istnieje</p>
        </div>
    )
}