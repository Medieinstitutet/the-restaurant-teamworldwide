import { Outlet } from 'react-router'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { initializeApp } from "firebase/app"
import { config } from '../config/config'

//double check if this will only be called once, or if i need to move it somewhere else.
initializeApp(config.firebaseConfig)

const Layout = () => {
    return (
        <div>
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    )
}

export default Layout