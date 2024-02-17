import { useState } from 'react'
import  {useAuthContext}  from './UseAuthContext'
export const useSignup = ()=>{
    const [error, setError] = useState(null);
    const [continueTo, setContinueTo] = useState(null)
    const {dispatch} = useAuthContext()
    const signup =  async (email, password)=>{
        setContinueTo(true)
        setError(null)
        const response = await fetch("http://localhost:5002/api/user/signup",{
            method: "POST",
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({email, password})
        })
        const signupData = await response.json()
        if(!response.ok){
            setContinueTo(false)
            setError(signupData.message)
        }
        if(response.ok){
            localStorage.setItem("user",JSON.stringify(signupData))
            dispatch({type: "LOGIN", payload:signupData})
            setContinueTo(false)
        }
    }

  return {signup,continueTo,error}
}
