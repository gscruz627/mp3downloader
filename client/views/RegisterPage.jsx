import React, { useEffect, useState } from 'react'
import { setLogin } from '../store'
import { redirect, useNavigate } from 'react-router'
import Navbar from '../components/Navbar'

const RegisterPage = () => {
    const SERVER_URL = import.meta.env.VITE_SERVER_URL
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordV, setPasswordV] = useState("");
    const [isUsernameValid, setIsUsernameValid] = useState(false);
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [doPasswordsMatch, setDoPasswordsMatch] = useState(false);
    const navigate = useNavigate()

    useEffect(() => {
        if (username.length < 3) {
            setIsUsernameValid(false)
        }
        else if (username === password) {
            setIsUsernameValid(false)
        } else {
            setIsUsernameValid(true)
        }
    }, [username])

    useEffect(() => {
        setIsPasswordValid(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(password))
        setDoPasswordsMatch(password === passwordV)
    }, [password, passwordV])

    const handleSubmit = async (event) => {
        event.preventDefault()
        if (isUsernameValid && isPasswordValid && doPasswordsMatch) {
            const request = await fetch(`${SERVER_URL}/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username: username, password: password })
            })
            if (!request.ok) {
                alert("Request invalid")
                setUsername("")
                setPassword("")
                setPasswordV("")
            } else {
                navigate("/login")
            }
        } else if(!isUsernameValid){
            alert("Username is invalid, try again");
        } else if(!isPasswordValid){
            alert("Password invalid, Try again")
        } else{
            alert("Passwords don't match, try again")
        }
    }
    return (
        <>
            <Navbar />
            <div className="center-block">
                <h1>Register</h1>
                <br/><br/>
                <form onSubmit={(event) => handleSubmit(event)} style={{textAlign: "center"}}>
                    <label htmlFor="username">Username (3 min): </label>
                    <input name="username" type="text" value={username} onChange={(event) => setUsername(event.target.value)} />
                    <label htmlFor="password">Password (8 min, 1 Uppercase, 1 Special): </label>
                    <input name="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
                    <label htmlFor="passwordV">Confirm Password: </label>
                    <input name="passwordV" type="password" value={passwordV} onChange={(event) => setPasswordV(event.target.value)} />
                    <button style={{textAlign: "center" }} className="btn blueBTN" type="submit" disabled={!(isUsernameValid && isPasswordValid && doPasswordsMatch)}>Register</button>
                </form>
            </div>
        </>
    )
}

export default RegisterPage