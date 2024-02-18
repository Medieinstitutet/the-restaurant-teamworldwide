import { Link } from "react-router-dom"

interface IBtnProps {
    linkTo: string,
    children: string,
    className?: string, 
    size: "md" | "lg" | "xl",
    color: "light" | "dark"
}

const style = {
    sizes: {
        md: "text-md px-10",
        lg: "text-lg px-14",
        xl: "text-xl px-16"
    },
    colors: {
        light: `bg-primary text-neutral-50 border-primary hover:bg-neutral-50 hover:text-primary`,
        dark: `bg-neutral-950 text-primary border-neutral-950 hover:bg-neutral-50 hover:text-primary`
    }
}

export const Button = ({linkTo, children, className, size = "md", color = "light"}: IBtnProps) => {
    return (
        <Link to={linkTo}>
            <button
                className={`btn self-center ${className} ${style.sizes[size]} ${style.colors[color]}`}>
                {children}
            </button>
        </Link>
    )
}