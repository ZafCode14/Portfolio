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
    const [isStaff, setIsStaff] = useState(undefined);
    const user = AuthService.getCurrentUser();
    const [messageSuccess, setMessageSuccess] = useState(false);
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [registerSuccess, setRegisterSuccess] = useState(false);

    useEffect(() => {
        if (user) {
            AuthService.data().then((result) => {
                setIsStaff(result.claims.is_staff);
            })

            const handleLogin = () => {
                setLoginSuccess(true);
                setTimeout(() => {
                    setLoginSuccess(false);
                }, 5000)
            }
            handleLogin();
        }

    // eslint-disable-next-line
    }, [])

    const isAuthenticated = user ? true : false

    const handleSuccess = () => {
        setMessageSuccess(true);
        setTimeout(() => {
            setMessageSuccess(false);
        }, 5000)
    }

    const handleRegister = () => {
        setRegisterSuccess(true);
        setTimeout(() => {
            setRegisterSuccess(false);
        }, 5000)
    }

    return (
    <div className="App">
        <BrowserRouter>
            <Header isAuthenticated={isAuthenticated} isStaff={isStaff} handleSuccess={handleSuccess}/>
            <Routes>
                <Route path="/" element={<Home handleSuccess={handleSuccess} messageSuccess={messageSuccess} loginSuccess={loginSuccess}/>}/>
                <Route path="/about" element={<About/>}/>
                <Route path="/services" element={<Services/>}/>
                <Route path="/blog" element={<Blog user={user}/>}/>
                <Route path="/messages" element={isStaff ? <Messages/> : <Navigate to="/contact"/>}/>
                <Route path="/contact" element={!isStaff ? <Contact handleSuccess={handleSuccess}/> : <Navigate to="/messages"/>}/>
                <Route path="/login" element={user ? <Navigate to="/"/> : <Login registerSuccess={registerSuccess}/>}/>
                <Route path="/register" element={user ? <Navigate to="/"/> : <Register handleRegister={handleRegister}/>}/>
                <Route path="/account" element={user ?<Account user={user}/> : <Navigate to="/login"/>}/>
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
            <Footer isStaff={isStaff}/>
        </BrowserRouter>
    </div>
    ); 
}

export default App;