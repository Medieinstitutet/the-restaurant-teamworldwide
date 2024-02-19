import { DailySpecials } from '../components/DailySpecials'
import { Hero } from '../components/Hero'
import { Menu } from '../components/Menu'
import { OpeningHours } from '../components/OpeningHours'

const HomePage = () => {
    return (
        <>
            <Hero />
            <Menu />
            <DailySpecials />
            <OpeningHours />
        </>
    )
}

export default HomePage