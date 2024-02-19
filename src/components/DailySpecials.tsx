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
        
    
    export const DailySpecials = () => {
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
        <div> 
        <img className="pb-10  w-full" src="../../webp-img/specials.webp" alt="" />
        </div>
        </motion.div>
    )
}