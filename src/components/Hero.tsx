import { Link } from "react-router-dom"
import { motion } from "framer-motion"

export const Hero = () => {
    return (
        <div className="hero min-h-screen">
            <video autoPlay loop muted playsInline>
                <source src='src/assets/video.mp4' type='video/mp4'/>
            </video>
            <div className="hero-content text-center mt-10">
                <div className="max-w-lg flex flex-col gap-10">
                    <motion.h1
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 3 }}
                    >
                        <img src="src\assets\bleu_horizon.svg" alt="" />
                    </motion.h1>
                    <Link to={"/booking"}>
                        <button className='btn self-center px-8 bg-primary hover:bg-neutral-50 text-neutral-50 hover:text-primary border-primary'>Book</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}