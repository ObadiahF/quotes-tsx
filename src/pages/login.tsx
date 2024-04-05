import { ChangeEvent, useEffect, useState } from 'react'
import axios from "axios";
import style from './styles/login.module.css'


import { FaBookmark, FaCheck, FaArrowRight } from 'react-icons/fa';

const Auth = ()  => {

    const [mode, setMode] = useState("login");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const switchState = () => {
        setError("");
        setName("");
        setPassword("");
        setConfirmPassword("");
        if (mode === "login") {
            setMode("signup");
        } else {
            setMode("login");
        }
    }

    const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(event.target.value);
    };

    const submit = async (e: React.MouseEvent) => {
        e.preventDefault();
        
        if (!name || !password) {
            setError("Please fill out all forms");
            return;
        }

        if (mode === "signup" && password !== confirmPassword) {
            setError("Passwords don't match");
            return;
        }
        setError("");
        if (mode === "login") {
            axios.post('http://127.0.0.1:3000/login', {
               name,
               password 
            }).then((res) => {
                const session = res.data.session;
                localStorage.setItem("sessionId", session);
                window.location.href = '/';
            }).catch((error) => {
                console.log(error);
                if (!error.response) {
                    setError("Connection to Server Failed");
                    return;
                }
                const errorMessage = error.response.data.error;
                setError(errorMessage);
            })
        } else {
            axios.post('http://127.0.0.1:3000/signup', {
               name,
               password 
            }).then(() => {
                window.location.href = '/';
            }).catch((error) => {
                console.log(error);
                const errorMessage = error.response.data.error;
                console.log(errorMessage);
                if (errorMessage === "Username already taken") {
                    setError(errorMessage)
                } else {
                    setError("Error connecting to server")
                }
            })
        }
    }

    return (
        <div className={style.container}>
            <h1>{mode === "login" ? "Login" : "Sign Up"}</h1>
            {error && (
                <p>{error}</p>
            )}
            <form>
                <input type="text" placeholder='Name' value={name} onChange={handleNameChange} maxLength={50}/>
                <input type="text" placeholder='Password' value={password} onChange={handlePasswordChange} maxLength={100}/>
                {mode === "signup" && 
                    <input type="text" placeholder='Confirm Password' value={confirmPassword} onChange={handleConfirmPasswordChange} maxLength={100}/>
                }
                <button type='submit' className={style.loginBtn} onClick={submit}>{mode === "login" ? "Sign In" : "Sign Up"}</button>
            </form>

            <div className={style.signuplink}>
               <span onClick={switchState}>{mode === "login" ? "Don't Have an account?" : "Already have an account?"}</span>
            </div>
        </div>
    )
}

export default Auth