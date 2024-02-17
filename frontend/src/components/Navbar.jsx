import { Link, NavLink } from "react-router-dom";
import { UseLogout } from "../hooks/UseLogout"
import { useAuthContext } from "../hooks/UseAuthContext";
export default function Navbar() {
    const { logout } = UseLogout()
    const { user } = useAuthContext();
    const handleClick = () => {
        logout()
    }
    return (
        <div className=" shadow-black shadow-lg h-[100px] flex items-center p-5 justify-between bg-sky-900">
            <Link to={"/"} className="text-white text-3xl uppercase  ">
                Notebook App
            </Link>
            <nav className="  flex  items-center  h-full   ">
                {user ?
                    <div className="flex  flex-col-reverse sm:flex-row sm:items-center  items-end  ">
                        <span className="text-white text-sm sm:mx-2 translate-y-2  sm:translate-y-0">{user.email} </span>
                        <NavLink to={"/"} className=" text-sm border bg-white rounded-md border-red-600 hover:bg-red-800 hover:text-white px-3 py-2 font-bold uppercase  text-center" onClick={handleClick}>Logout</NavLink>

                    </div> :
                    <div className=" flex justify-end items-center  h-full w-full">
                        <NavLink to={"/login"} className="text-white text-sm border-b px-3 py-2 hover:border-red-700 uppercase mx-5 [&.active]:bg-red-700  rounded-md">Login</NavLink>
                        <NavLink to={"/signup"} className="text-white text-sm border-b px-3 py-2 hover:border-red-700 uppercase [&.active]:bg-red-700  rounded-md">Signup</NavLink>
                    </div>
                }
            </nav>
        </div>
    )
}
