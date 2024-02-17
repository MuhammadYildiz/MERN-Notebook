import { useState } from "react"
import { Link } from "react-router-dom";
import { useSignup } from "../hooks/UseSignup"
export default function Signup() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [visible, setVisible] = useState(false)
    const { signup, continueTo, error } = useSignup();
    const handleSubmit = async (e) => {
        e.preventDefault()
        await signup(email, password);
    }
    return (
        <div className="h-[85dvh] flex flex-col justify-center items-center bg-blue-50">
            <div className="bg-sky-900 shadow-gray-500 shadow-lg  m-3 rounded-xl p-5 flex flex-col text-center justify-between w-[350px] ">
                <h3 className="uppercase font-bold text-xl m-5 text-white">Signup</h3>
                <form onSubmit={handleSubmit} className="bg-white p-5">
                    <div className="flex flex-col justify-start text-start">
                        <label htmlFor="email" className="mb-5">Email: <br />
                            <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="xxx@gmil.com"
                                className="outline-none border border-black px-3 my-2 w-full py-1"
                            />
                        </label>
                        <label htmlFor="password">Password: <br />
                            <div className=" border border-black px-3 my-2 w-full py-1 flex justify-between items-center">
                                <input type={visible ? "text" : "password"} id="password" autoComplete="" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="******"
                                    className="w-full outline-none"
                                />
                                {visible ?
                                    <i className="fa-solid fa-eye cursor-pointer" onClick={() => setVisible(false)}></i>
                                    : <i className="fa-solid fa-eye-slash cursor-pointer" onClick={() => setVisible(true)}></i>
                                }
                            </div>
                        </label>
                    </div>
                    <button type="submit" className="bg-black text-white font-bold px-4 py-2 rounded-md m-3 uppercase text-sm cursor-pointer" disabled={continueTo} >Signup</button>
                </form>
                {error && <div> <p className="text-sm text-red-600 mt-2 bg-white"> {error} </p> </div>}
                <div className="flex justify-center mt-3 text-sm ">
                    <p className="text-white">User?</p>
                    <Link to={'/login'} className="text-red-500 mx-3 hover:underline "> Login</Link>
                </div>
            </div>
        </div>
    )
}
