
import { useContext } from "react"
import { NoteContext } from "../context/ContextProvider"
export const UseContextHooks = () => {
    const context = useContext(NoteContext)
    if (!context) {
        throw new Error("Context not upload")
    }
    return  context
}
