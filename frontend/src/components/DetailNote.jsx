import moment from "moment"
/* import "moment/locale/tr" */
import { useAuthContext } from "../hooks/UseAuthContext";
import { UseContextHooks } from "../hooks/UseContextHooks"
export default function DetailNote({ note }) {
    const { dispatch } = UseContextHooks();
    const { user } = useAuthContext();
    const handleDelete = async () => {
        if (!user) {
            return
        }
        const response = await fetch("http://localhost:5002/api/notes/" + note._id, {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        const deleteNotes = await response.json()
        if (response.ok) {
            dispatch({ type: "DeleteNoteById", payload: deleteNotes })
        }
    }
    return (
        <div className=' bg-sky-900 shadow-gray-500 shadow-lg w-[420px] h-40 m-3 rounded-xl p-3 flex justify-between '>
            <div className="basis-[95%] overflow-scroll bg-white flex flex-col justify-between border p-3">
                <div>
                    <h4 className="text-sm font-bold uppercase ">{note.title}</h4>
                    <h5 className="text-md my-3 ">{note.desc}</h5>
                </div>
                <p className="text-[10px]">{moment(new Date(note.createdAt)).fromNow()}</p>
            </div>
            <div>
                <button onClick={handleDelete} className="text-white hover:bg-white hover:text-red-700 ml-1 px-2 py rounded-md text-sm py-1"><i className="fa-solid fa-trash"></i></button>
            </div>
        </div>
    )
}
