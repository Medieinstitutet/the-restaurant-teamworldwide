import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth'

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



    return (
        <div className="navbar bg-secondary">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="#fff"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-md dropdown-content mt-3 z-[1] p-2 shadow bg-neutral-950 text-primary rounded-box w-52">
                        <li><a>Home</a></li>
                        <li><a>Booking</a></li>
                        <li><a>Gallery</a></li>
                        <li><a>Contact</a></li>
                    </ul>
                </div>
            </div>
            <div className="navbar-center">
                <Link to={"/"} className="btn bg-transparent border-none hover:bg-transparent shadow-none">
                    <img src="src\assets\bleu_horizon.svg" width={100} alt="" />
                </Link>
            </div>
            {displayLogout &&
                <div className="navbar-center">
                    <a className="btn btn-ghost text-xl" onClick={(() => signOut(auth))}>SignOut</a>
                </div>
            }
            <div className="navbar-end">
                <button className="btn btn-ghost btn-circle">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="#fff"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </button>

                <button className="btn btn-ghost btn-circle">
                    <div className="indicator">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="#fff"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                        <span className="badge badge-xs badge-primary indicator-item"></span>
                    </div>
                </button>
            </div>
        </div>
    )
}

export default Navbar