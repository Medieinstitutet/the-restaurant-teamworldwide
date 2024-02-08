import { Outlet } from 'react-router'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'



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