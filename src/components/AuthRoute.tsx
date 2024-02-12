import React, { ReactNode, useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useNavigate } from 'react-router';

export interface IAuthRouteProps {
    children: ReactNode
}

const AuthRoute: React.FunctionComponent<IAuthRouteProps> = (props) => {
    const { children } = props;
    const auth = getAuth();
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        const authCheck = onAuthStateChanged(auth, (user) => {
            if (user) {
                setLoading(false)
            } else {
                console.log('unauthorised')
                navigate('/Login')
            }
        })
        return () => authCheck();
    }, [auth, navigate])

    if (loading) return <p>loading</p>

    return (
        <>{children}</>
    )
}

export default AuthRoute