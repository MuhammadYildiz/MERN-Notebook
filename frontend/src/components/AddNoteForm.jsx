import { useEffect, useState } from 'react'
import { UseContextHooks } from '../hooks/UseContextHooks';
import { useAuthContext } from '../hooks/UseAuthContext';
import { Link } from 'react-router-dom';
/* Alert */
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function AddNoteForm() {
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [error, setError] = useState(null)
    const [emptySpace, setEmptySpace] = useState([])
    const { dispatch } = UseContextHooks();
    const { user } = useAuthContext();
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!user) {
            setError("Please Login")
            return
        }
        let note;
        note = {
            title,
            desc
        }
        const response = await fetch('http://localhost:5002/api/notes', {
            method: "POST",
            body: JSON.stringify(note),
            headers: {
                'content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const noteData = await response.json()
        if (!response.ok) {
            setError(noteData.Error)
            setEmptySpace(noteData.emptySpace)
        }
        if (response.ok) {
            setError(null)
            setEmptySpace([])
            dispatch({ type: "CreateNote", payload: noteData })
            setTitle("")
            setDesc("")
            /* alert */
            toast.success('Add a new note is successfully!', {});        
        }
    }
    useEffect(() => {

    }, [])
    return (
        <div className='h-[85dvh] flex justify-center items-center ' >
            <div className='shadow-gray-500 shadow-lg  p-3 sm:m-10  bg-sky-900 rounded-xl text-center' >
                <h3 className='text-white text-2xl m-5 lg-5 text-center'>Add a new note</h3>
                <form onSubmit={handleSubmit} className=' text-center bg-white p-3' >
                    <div className='flex flex-col sm:flex-row items-center w-full justify-between text-start'>
                        <div className='w-full  px-5'>
                            <label htmlFor="title">Note Title:</label>
                            <textarea type="text" name='title' id='title' placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)}
                                className={`outline-none px-3 p-1 w-full my-5 rounded-sm max-h-[45dvh]  ${emptySpace.includes("title") ? "border-2 border-red-500" : "border-2 border-sky-700 "} `}
                            />
                        </div>
                        <div className='w-full  px-5'>
                            <label htmlFor="desc">Note Description:</label>
                            <textarea type="text" name='desc' id='desk' placeholder='Description' value={desc} onChange={(e) => setDesc(e.target.value)}
                                className={`outline-none px-3 p-1 w-full my-5 rounded-sm max-h-[45dvh] ${emptySpace.includes("desc") ? "border-2 border-red-500" : "border-2 border-sky-700  "} `}
                            />
                        </div>
                    </div>
                    <button type="submit" className='bg-sky-900 hover:bg-sky-700 text-white rounded-3xl p-2 px-10 font-bold uppercase' >Add</button>
                </form>
                <ToastContainer />
                {error && <div > <p className='bg-white m-5  text-red-600 p-1 px-3 text-sm'>{error}</p> </div>}
                <Link to={"/"} className=" text-sm border-2 border-sky-900 bg-white hover:text-red-700 rounded-3xl p-2 px-4   font-bold uppercase text-center">
                    My Notes
                </Link>
            </div>
            
        </div>
    )
}
