import { DailySpecials } from '../components/DailySpecials'
import { Hero } from '../components/Hero'
import { HomeMenu } from '../components/HomeMenu'
import { OpeningHours } from '../components/OpeningHours'

const HomePage = () => {
    return (
        <>
            <Hero />
            <HomeMenu />
            <DailySpecials />
            <OpeningHours />
        </>
    )
}

export default HomePage