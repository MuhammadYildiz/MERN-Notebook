import { createContext, useReducer } from "react"
export const NoteContext = createContext();
export const noteReducer = (state, action) => {
    switch (action.type) {
        case "CreateNote":
            return {
                notes: [action.payload, ...state.notes]
            }
        case "GetAllNotes":
            return {
                notes: action.payload
            }
        case "DeleteNoteById":
            return{
                notes: state.notes.filter((note)=>note._id !== action.payload._id)
            }
        default:
            return state
    }
};
export default function ContextProvider({ children }) {
    const [state, dispatch] = useReducer(noteReducer, {
        notes:null
    })
    return (
        < NoteContext.Provider value={{...state,dispatch}}>
            {children}
        </NoteContext.Provider>
    )
}
