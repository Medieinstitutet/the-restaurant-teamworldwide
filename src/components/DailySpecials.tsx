import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import {useEffect, useState } from 'react'
import { format } from 'date-fns'

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
        
    
    export const DailySpecials = () => {
        const controls = useAnimation();
        const [ref, inView] = useInView({
            threshold: 0.1,
            triggerOnce: true,
        });
    
    const [dailyImage, setDailyImage] = useState('');
    type DayOfWeek = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';

    useEffect(() => {
        if (inView) {
            controls.start('visible');
        }
    const dayOfWeek = format(new Date(), 'EEEE').toLowerCase() as DayOfWeek;
    const imageMap: Record<DayOfWeek, string> = {
        monday: '../../webp-img/daily-spec/13.webp',
        tuesday: '../../webp-img/daily-spec/14.webp',
        wednesday: '../../webp-img/daily-spec/15.webp',
        thursday: '../../webp-img/daily-spec/16.webp',
        friday: '../../webp-img/daily-spec/17.webp',
        saturday: '../../webp-img/daily-spec/18.webp',
        sunday: '../../webp-img/daily-spec/19.webp',
    };
        setDailyImage(imageMap[dayOfWeek]);
    }, [controls, inView]);
    
    
    
    return (
        <motion.div
        ref={ref}
        initial='hidden'
        animate={controls}
        variants={variants}
        >
        <div className='daily-container'> 
        {dailyImage && (
            <img 
             className='pb-10 w-full'
             src={dailyImage}
             alt="Daily special image" />
        )}
        </div>
        </motion.div>
    )
}