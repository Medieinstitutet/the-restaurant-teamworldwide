import React from 'react'
import { motion } from 'framer-motion'

const HeroHeader = () => {
    return (
        <div>
            <motion.h1
                className="text-8xl font-bold text-secondary"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 3 }}
            >
                Restaurant Beach Name
            </motion.h1>
            <motion.h1
                className="text-8xl font-bold text-secondary"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 4 }}
            >
                Beach 
            </motion.h1>
            <motion.h1
                className="text-8xl font-bold text-secondary"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 5 }}
            >
                Name
            </motion.h1>
        </div>

    )
}

export default HeroHeader