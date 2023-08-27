import React, { useState } from 'react'
import { setLogin } from '../store'
import { redirect } from 'react-router'

const RegisterPage = () => {
    const SERVER_URL = import.meta.env.SERVER_URL
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordV, setPasswordV] = useState("");
    const [isUsernameValid, setIsUsernameValid] = useState(false);
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [doPasswordsMatch, setDoPasswordsMatch] = useState(false);

    const checkUsernameValid = () => {
        if (username.length < 3) {
            return false;
        }
        if (username === password) {
            return false;
        }
        return true;
    }
    const checkIsPasswordValid = () => {
        return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(password)
    }
    const checkDoPasswordsMatch = () => {
        return password === passwordV
    }
    setIsUsernameValid(checkUsernameValid());
    setIsPasswordValid(checkIsPasswordValid());
    setDoPasswordsMatch(checkDoPasswordsMatch());
    const registerForm = async () => {

        if (isUsernameValid && isPasswordValid && doPasswordsMatch) {
            request = await fetch(`${SERVER_URL}/register`, {
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
                return redirect("/login")
            }
        }
    }
    return (
        <form>
            <label htmlFor="username">Username: </label>
            <input name="username" type="text" value={username} onChange={(event) => setUsername(event.target.value)} />
            <label htmlFor="password">Password: </label>
            <input name="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
            <label htmlFor="passwordV">Confirm Password: </label>
            <input name="passwordV" type="password" value={passwordV} onChange={(event) => setPasswordV(event.target.value)} />
            <button type="submit" style={{ display: (isUsernameValid && isPasswordValid && doPasswordsMatch) ? "block" : "none" }}>Register</button>
        </form>
    )
}

export default RegisterPage