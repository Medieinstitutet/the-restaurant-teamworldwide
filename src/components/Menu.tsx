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
    

export const Menu = () => {
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
        <div className="menu min-h-full bg-neutral-950">
            <h1 className="text-5xl text-neutral-50 text-center p-14">ON THE MENU</h1>
            <div className="menu-content">
                <figure>
                    <img src="src/assets/urban-gyllstrom-MaWMfm-HCqQ-unsplash.jpg" alt="a plate of food" />
                    <Link to={"/menu"}>
                        <button>
                            <img src="src/assets/gourmet_plates.svg" alt="button for menu" />
                        </button>
                    </Link>
                </figure>
                <figure>
                    <img src="src/assets/fabio-alves-_fLgxjACz5k-unsplash.jpg "alt="beer dispensers" />
                    <Link to={"/menu"}>
                        <button>
                            <img src="src/assets/craft_brews.svg" alt="button for menu" />
                        </button>
                    </Link>
                </figure>
                <figure>
                    <img src="src/assets/food-photographer-jennifer-pallian-AZJjIlbZM60-unsplash.jpg" alt="variety of sliced fruits" />
                    <Link to={"/menu"}>
                        <button>
                            <img src="src/assets/desert.svg" alt="button for menu" />
                        </button>
                    </Link>
                </figure>
            </div>
        </div>
    </motion.div>
    )
}