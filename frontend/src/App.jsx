import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Home from "./pages/Home"
import Navbar from "./components/Navbar"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import { useAuthContext } from "./hooks/UseAuthContext"
import AddNoteForm from "./components/AddNoteForm"
function App() {
    const { user } = useAuthContext();

    return (
        <>
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path="/" element={user ? <Home /> : <Navigate  to="/login" /> } />
                    <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
                    <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />
                    <Route path="/addNote" element={ <AddNoteForm/> } />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
