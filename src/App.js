import './App.css'
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
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
import Chat from './pages/chat/Chat'

function App() {
    const data = AuthService.getCurrentData();
    const [messageSuccess, setMessageSuccess] = useState(false);
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [registerSuccess, setRegisterSuccess] = useState(false);

    useEffect(() => {
        if (data) {
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
            <Header/>
            <Routes>
                <Route path="/" element={<Home handleSuccess={handleSuccess} messageSuccess={messageSuccess} loginSuccess={loginSuccess}/>}/>
                <Route path="/about" element={<About/>}/>
                <Route path="/services" element={<Services/>}/>
                <Route path="/blog" element={<Blog user={data}/>}/>
                {data?.claims.is_staff ?
                <Route path="/messages" element={<Messages/>}/>
                :
                <Route path="/contact" element={<Contact handleSuccess={handleSuccess}/>}/>
                }
                <Route path="/login" element={data ? <Navigate to="/"/> : <Login registerSuccess={registerSuccess}/>}/>
                <Route path="/register" element={data ? <Navigate to="/"/> : <Register handleRegister={handleRegister}/>}/>
                <Route path="/account" element={data ?<Account user={data}/> : <Navigate to="/login"/>}/>
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
            <Footer isStaff={data?.claims.is_staff}/>
            { data && <Chat isStaff={data?.claims.is_staff}/> }
        </BrowserRouter>
    </div>
    ); 
}

export default App;