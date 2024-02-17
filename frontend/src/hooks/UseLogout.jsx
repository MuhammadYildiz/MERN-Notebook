import { useAuthContext } from "./UseAuthContext";

export const UseLogout =() =>{
    const { dispatch } = useAuthContext();
    const logout = () => {
        localStorage.removeItem("user")
        dispatch({type:'LOGOUT'})
    }
    return {logout}
}
