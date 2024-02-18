import React, { useState } from 'react'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { useNavigate } from 'react-router'

const Login = () => {
    const auth = getAuth()
    const navigate = useNavigate()
    const [authing, setAuthing] = useState(false)

    const signInWithGoogle = async () => {
        setAuthing(true)
        signInWithPopup(auth, new GoogleAuthProvider())
            .then((response) => {
                console.log(response.user.uid)
                navigate('/admin')
            })
            .catch((error) => {
                console.log(error)
                setAuthing(false)
            })
    }
    return (
        <div className='mt-16 flex flex-col items-center gap-10 py-10'>
            <h1 className='text-neutral-50'>Admin Login</h1>
            <button onClick={(() => signInWithGoogle())} className='btn' disabled={authing}>Login</button>
        </div>
    )
}

export default Login