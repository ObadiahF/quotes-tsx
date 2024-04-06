import { ChangeEvent, useEffect, useState } from 'react'
import axios from "axios";
import style from './styles/login.module.css'
import LoadingBar from 'react-top-loading-bar'

const Auth = ()  => {

    const [mode, setMode] = useState("login");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [progress, setProgress] = useState(0)
    
    const domain = "https://quotes-tsx.onrender.com"

    useEffect(() => {
        const name = localStorage.getItem("name")
        const sessionId = localStorage.getItem("sessionId")

        if (name && sessionId) {
            window.location.href = "/"
        } else {
            localStorage.clear();
        }
    }, [])

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
        setProgress(50);
        if (mode === "login") {
            axios.post(`${domain}/login`, {
               name,
               password 
            }).then((res) => {
                setProgress(100);
                const session = res.data.session;
                localStorage.setItem("sessionId", session);
                localStorage.setItem("name", name);
                window.location.href = '/';
            }).catch((error) => {
                setProgress(100);
                console.log(error);
                if (!error.response) {
                    setError("Connection to Server Failed");
                    return;
                }
                const errorMessage = error.response.data.error;
                setError(errorMessage);
            })
        } else {
            axios.post(`${domain}/signup`, {
               name,
               password 
            }).then((res) => {
                setProgress(100);
                const session = res.data.session;
                localStorage.setItem("sessionId", session);
                localStorage.setItem("name", name);
                window.location.href = '/';
            }).catch((error) => {
                setProgress(100);
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
        <>
        <LoadingBar color="#f11946" progress={progress} onLoaderFinished={() => setProgress(0)} />
        <div className={`${style.container} text-white bg-gray-800 p-6 rounded-md`}>
            <h1 className="text-2xl font-bold mb-4">{mode === "login" ? "Login" : "Sign Up"}</h1>
            {error && (
                <p className="text-red-500 mb-4">{error}</p>
            )}
            <form>
                <input 
                    type="text"
                    placeholder='Name' 
                    value={name} 
                    onChange={handleNameChange}
                    maxLength={50}
                    className="w-full p-2 mb-4 rounded-md bg-gray-700 text-white focus:outline-none focus:ring focus:border-blue-300"
                />
    
                <input 
                    type="password" 
                    placeholder='Password' 
                    value={password} 
                    onChange={handlePasswordChange} 
                    maxLength={100}
                    className="w-full p-2 mb-4 rounded-md bg-gray-700 text-white focus:outline-none focus:ring focus:border-blue-300"
                />
                
                {mode === "signup" && 
                    <input 
                        type="password" 
                        placeholder='Confirm Password' 
                        value={confirmPassword} 
                        onChange={handleConfirmPasswordChange} 
                        maxLength={100}
                        className="w-full p-2 mb-4 rounded-md bg-gray-700 text-white focus:outline-none focus:ring focus:border-blue-300"
                    />
                }
                <button 
                    type='submit' 
                    className={`${style.loginBtn}`}
                    onClick={submit}
                >
                    {mode === "login" ? "Sign In" : "Sign Up"}
                </button>
            </form>
    
            <div className={style.signuplink}>
                <span className="cursor-pointer" onClick={switchState}>
                    {mode === "login" ? "Don't Have an account?" : "Already have an account?"}
                </span>
            </div>
        </div>
        </>
    )
    
}

export default Auth