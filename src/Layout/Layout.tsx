import { Outlet } from 'react-router'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import "../styles/main.scss"
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

const Layout = () => {
    return (
        <div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Navbar />
                <Outlet />
                <Footer />
            </LocalizationProvider>

        </div>
    )
}

export default Layout