import { Button } from "./Button"
import { Link } from "react-router-dom"
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import {useEffect } from 'react'


const variants = {
    hidden: {opacity: 0, y: 60 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type:'tween',
            ease: 'easeInOut',
            duration: 3.8,
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
      /*   transition={{ duration: 0.9 }} */
        >
        <div className="opening-hours-cont relative">
            <Button linkTo={"/booking"} children={"Book now"} className={"absolute right-10 top-10"} size={"lg"} color={"light"}/>
            <img className="opening-hours pb-10" src="src\assets\openinghrs.png" alt="opening hours" />
  {/*           <div className="flex flex-col gap-8 py-20">
                <div className="opening-hours-text flex flex-col gap-6 p-10 m-10">
                    <h2 className="text-4xl text-center">Opening Hours</h2>
                    <p className="text-xl font-medium leading-loose">
                        Mon - Tue : 11:00am - 00:00am<br />
                        Wed - Sat : 11:00am - 02:00am<br />
                        Sun : 12:00pm - 00:00am<br />
                    </p>
                </div>
                <img className="logo-1 py-10" src="src\assets\gastropub.svg" alt="GASTROPUB" />
            </div>
            <img className="logo-2 pb-10 pr-10 self-end" src="src\assets\opening_hours-text.svg" alt="Where great food and great drinks meet" /> */}
        </div>
        </motion.div>
    )
}