import { Link } from 'react-router-dom'
import { useState, useEffect, useContext } from 'react'
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth'
import { UserInputContext } from '../contexts/userInputs'
import { Button } from './Button'

const Navbar = () => {
    const [displayLogout, setDisplayLogout] = useState(false)
    const auth = getAuth();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setDisplayLogout(true)

            } else {
                setDisplayLogout(false)
            }
        });
    }, [auth])

    const {newBooking} = useContext(UserInputContext)


    return (
        <div className="navbar bg-secondary">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="#fff"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-md dropdown-content mt-3 z-[1] p-2 shadow bg-neutral-950 text-primary w-52">
                        <li><Link to={"/"}>Home</Link></li>
                        <li><Link to={"/booking"}>Booking</Link></li>
                        <li><Link to={"/menu"}>Menu</Link></li>
                        <li><Link to={"/gallery"}>Gallery</Link></li>
                        <li><Link to={"/contact"}>Contact</Link></li>
                        <li><Link to={"/admin"}>Admin</Link></li>
                    </ul>
                </div>
            </div>
            <div className="navbar-center">
                <Link to={"/"} className="btn bg-transparent border-none hover:bg-transparent shadow-none">
                    <img src="src\assets\bleu_horizon.svg" width={100} alt="" />
                </Link>
            </div>
            <div className="navbar-end">
                {displayLogout ?
                    <Button linkTo={''} children={'Sign out'} size={'md'} color={'dark'} event={() => signOut(auth)} />
                    :
                    <Button linkTo={'/booking'} children={'Book'} size={'md'} color={'dark'} />
                }
            </div>
        </div>
    )
}

export default Navbar