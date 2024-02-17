import { useEffect, } from 'react';
import { Link } from "react-router-dom"
import DetailNote from "../components/DetailNote"
import { UseContextHooks } from '../hooks/UseContextHooks';
import { useAuthContext } from "../hooks/UseAuthContext"
export default function Home() {
    /* const [notes, setNotes] = useState(null); */
    const { notes, dispatch } = UseContextHooks()
    const { user } = useAuthContext();
    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const response = await fetch('http://localhost:5002/api/notes', {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                /* setNotes(result); */
                dispatch({ type: "GetAllNotes", payload: result })
            } catch (error) {
                console.error('Error fetching notes:', error);
            }
        };
        if (user) {
            fetchNotes();
        }

    }, [dispatch, user]); // The empty dependency array ensures useEffect runs once on mount
    return (
        <div className=' flex w-full  flex-col  bg-blue-50 min-h-[85dvh] p-3 sm:p-10 '>
            <div className=' text-center m-5 mb-10'>
                <Link to={"/addNote"} className='bg-sky-900 text-white w-40  p-3 font-bold text-center rounded-md hover:bg-sky-700 ml-7'>Add new notes  <span className=' font-bold ml-1'> +</span> </Link>
            </div>
            <div className='flex-wrap flex w-full justify-center'>
                {notes ? (
                    notes.map((note) => (
                        <DetailNote key={note._id} note={note} />
                    ))
                ) : (
                    // Render loading state or handle error
                    <p className=''>Please
                        <Link to={"/login"} className='text-red-600 hover:underline'> Login</Link>
                    </p>

                )}
            </div>
        </div>
    );
}
