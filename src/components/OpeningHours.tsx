import { Button } from "./Button"
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import {useEffect } from 'react'


const variants = {
    hidden: {opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type:'tween',
            ease: 'easeInOut',
            duration: 1.8,
        }
    },
};
    

export const OpeningHours = () => {
    const controls = useAnimation();
    const [ref, inView] = useInView({
        threshold: 0.1,
        triggerOnce: true,
    });


useEffect(() => {
    if (inView) {
        controls.start('visible');
    }
}, [controls, inView]);



    return (
        <motion.div
            ref={ref}
            initial='hidden'
            animate={controls}
            variants={variants}
        >
            <div className="opening-hours-cont relative">
                <Button linkTo={"/booking"} children={"Book now"} className={"absolute right-10 top-10"} size={"lg"} color={"light"}/>
                <img className="opening-hours pb-10" src="src\assets\openinghrs.png" alt="opening hours" />
            </div>
        </motion.div>
    )
}