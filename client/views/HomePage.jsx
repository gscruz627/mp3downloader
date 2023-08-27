import React from 'react'
import Navbar from '../components/Navbar'
import { useSelector } from 'react-redux'
import { Link } from "react-router-dom"
import { setLogout } from '../store'

const HomePage = () => {
  const isAuth = useSelector((state) => state.token)
  const user = useSelector((state) => state.user)
  return (
    <>
    <Navbar/>
    <h1>HomePage</h1>
    { !isAuth ? (
        <>
        <Link to="/login"><button>Login</button></Link>
        <Link to="/register"><buton>Register</buton></Link>  
        </>  
    ) : (
        <>
        <p>{user.username}</p>
        <button onClick={() => setLogout()}>Logout</button>
        </>
    )}
    
    </>
  )
}

export default HomePage