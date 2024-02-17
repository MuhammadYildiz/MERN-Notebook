import { useState } from "react";
import { useAuthContext } from "./UseAuthContext";

export const useLogin = () => {
    const [error, setError] = useState(null);
    const [upload, setUpload] = useState(null);
    const { dispatch } = useAuthContext();
    const login = async (email, password) => {
        setUpload(true);
        setError(null);
        const response = await fetch("http://localhost:5002/api/user/login", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        })
        const loginData = await response.json()
        if(!response.ok){
            setUpload(false)
            setError(loginData.message)
        }
        if (response.ok) {
            localStorage.setItem("user", JSON.stringify(loginData))
            dispatch({ type: "LOGIN", payload: loginData })
            setUpload(false)
        }
    }
    return {login, upload, error}
}