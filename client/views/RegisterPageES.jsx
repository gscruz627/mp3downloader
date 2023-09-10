import React, { useEffect, useState } from 'react'
import { setLogin } from '../store'
import { redirect, useNavigate } from 'react-router'
import Navbar from '../components/Navbar'

const RegisterPageES = () => {
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
                alert("Error: el servidor retorno un error")
                setUsername("")
                setPassword("")
                setPasswordV("")
            } else {
                navigate("/login")
            }
        } else if(!isUsernameValid){
            alert("Nombre de usuario no valido, intente de nuevo (3+ caracteres)");
        } else if(!isPasswordValid){
            alert("Contrase\u{00F1}a incorrecta, intente de nuevo")
        } else{
            alert("Contrase\u{00F1}as no son iguales, intente de nuevo")
        }
    }
    return (
        <>
            <Navbar />
            <div className="center-block">
                <h1>Crear Usuario</h1>
                <br/><br/>
                <form onSubmit={(event) => handleSubmit(event)} style={{textAlign: "center"}}>
                    <label htmlFor="username">Nombre de usuario (3 minimo): </label>
                    <input name="username" type="text" value={username} onChange={(event) => setUsername(event.target.value)} />
                    <label htmlFor="password">Contrase&ntilde;a: (8 minimo, 1 mayuscula, 1 simbolo)</label>
                    <input name="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
                    <label htmlFor="passwordV">Confirmar la contrase&ntilde;a: </label>
                    <input name="passwordV" type="password" value={passwordV} onChange={(event) => setPasswordV(event.target.value)} />
                    <button style={{textAlign: "center" }} className="btn blueBTN" type="submit" disabled={!(isUsernameValid && isPasswordValid && doPasswordsMatch)}>Crear</button>
                </form>
            </div>
        </>
    )
}

export default RegisterPageES