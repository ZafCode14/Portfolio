import './App.css'
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom'
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Header from "./Header"
import Blog from "./pages/Blog"
import Account from "./pages/Account"
import About from "./pages/About"
import Services from "./pages/Services"
import Contact from "./pages/Contact"
import Messages from "./pages/Messages"
import AuthService from './services/auth.service'
import Footer from './Footer'
import { useEffect, useState } from 'react'

function App() {
    const [isStaff, setIsStaff] = useState(undefined)
    const user = AuthService.getCurrentUser();

    useEffect(() => {
        if (user) {
            AuthService.data().then((result) => {
                setIsStaff(result.claims.is_staff);
            })
        }
    // eslint-disable-next-line
    }, [])
    let isAuthenticated
    if (user) {
        isAuthenticated = true;
    } else {
        isAuthenticated = false;
    }
    console.log(isAuthenticated);
    return (
    <div className="App">
        <BrowserRouter>
            <Header isAuthenticated={isAuthenticated} isStaff={isStaff}/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/about" element={<About/>}/>
                <Route path="/services" element={<Services/>}/>
                <Route path="/blog" element={<Blog user={user}/>}/>
                <Route path="/messages" element={isStaff ? <Messages/> : <Navigate to="/contact"/>}/>
                <Route path="/contact" element={!isStaff ? <Contact/> : <Navigate to="/messages"/>}/>
                <Route path="/login" element={user ? <Navigate to="/"/> : <Login/>}/>
                <Route path="/register" element={user ? <Navigate to="/"/> : <Register/>}/>
                <Route path="/account" element={user ?<Account user={user}/> : <Navigate to="/login"/>}/>
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
            <Footer isStaff={isStaff}/>
        </BrowserRouter>
    </div>
    ); 
}

export default App;