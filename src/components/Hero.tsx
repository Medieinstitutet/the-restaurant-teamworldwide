import { Link } from "react-router-dom"
import HeroHeader from "./HeroHeader"

export const Hero = () => {
    return (
        <div className="hero min-h-screen bg-accent">
            <video autoPlay loop muted playsInline>
                <source src='src/assets/video.mp4' type='video/mp4'/>
            </video>
            <div className="hero-content text-center">
                <div className="max-w-lg">
                    <HeroHeader />
                    {/* <button className="btn btn-primary mt-8">Get Started</button> */}
                    <Link to={"/booking"}><button className="btn btn-accent mx-4">Book</button></Link>
                </div>
            </div>
        </div>
    )
}