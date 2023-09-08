import React, { useEffect, useState } from 'react'
import { setLogin } from '../store'
import { redirect, useNavigate } from 'react-router'
import { useDispatch } from "react-redux"
import Navbar from '../components/Navbar'

const LoginPage = () => {
    const SERVER_URL = import.meta.env.VITE_SERVER_URL
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (event) => {
        event.preventDefault()
        if (username.length > 3 && password.length > 8) {
            const request = await fetch(`${SERVER_URL}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username: username, password: password })
            })
            const requestJSON = await request.json();
            if (requestJSON[1] === 404) {
                alert("User may not exist, try again")
                setUsername("")
                setPassword("")
            } else {
                dispatch(setLogin({user: requestJSON[0]["user"], token: requestJSON[0]["token"]}))
                navigate("/")
            }
        }
    }
    return (
        <>
        <Navbar/>
        <div className="center-block">
            <h1>Login</h1>
            <br/><br/>
        <form onSubmit={(event) => handleSubmit(event)} style={{textAlign: "center"}}>
            <label htmlFor="username">Username: </label>
            <input name="username" type="text" value={username} onChange={(event) => setUsername(event.target.value)} />
            <label htmlFor="password">Password: </label>
            <input name="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
            <button className="btn blueBTN" type="submit" disabled={!(username.length > 3 && password.length > 8)}>Log In</button>
        </form>
        </div>
        </>
    )
}

export default LoginPage