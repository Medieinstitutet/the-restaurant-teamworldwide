import { Button } from "../components/Button"

export const MenuPage = () => {
    return <div className="mt-16 px-10 py-20 bg-black flex flex-col items-center">
        <img className="block mx-auto max-w-full" src="../../webp-img/White Brown Restaurant Menu.webp" alt="" />
        <Button linkTo={"/booking"} children={"Book a table"} className={"mt-10"} size={"xl"} color={"light"} />
    </div>
}