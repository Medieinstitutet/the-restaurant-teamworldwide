import React from 'react'
import HeroHeader from '../components/HeroHeader'

const HomePage = () => {
    return (
        <div className="hero min-h-screen bg-accent">
            <div className="hero-content text-center">
                <div className="max-w-lg">
                    <HeroHeader />
                    <button className="btn btn-primary mt-8">Get Started</button>
                    <button className="btn btn-secondary mx-4">Book</button>                   
                </div>
            </div>
        </div>
    )
}

export default HomePage