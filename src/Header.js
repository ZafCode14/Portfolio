import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthService from './services/auth.service';
import "./Header.css"
import Sidebar from './components/Sidebar'

function Header() {
    const [userName, setUserName] = useState(undefined);
    const [timeToRefresh, setTimeToRefresh] = useState(false);
    const [isNav, setIsNav] = useState(false);
    const data = AuthService.getCurrentData()

    useEffect(() => {
        if (data) {
            setUserName(data.user_data.username);
            let currentTime = Math.floor(new Date() / 1000);
            let expireTime = data.claims.exp;
            let difference = expireTime - currentTime - 60;
            let milliseconds = difference * 1000;

            console.log(expireTime, currentTime, difference);
            setTimeout(function() {
                AuthService.refresh().then(() => {
                    setTimeToRefresh(prev => !prev);
                    console.log("refreshed token");
                })
            }, milliseconds);
        }
    // eslint-disable-next-line
    }, [timeToRefresh])

    const logout = () => {
        AuthService.logout();
    }
    const handleNav = () => {
        setIsNav(!isNav); 
    }
    const toTop = () => {
        window.scrollTo(0, 0)
    }
    return (
        <header className='bc_1'>
            <div className='header_container'>
                <div style={{display: "flex", alignItems: "center"}}>
                    <div className='bars narrow_header nav' onClick={handleNav}>
                        <div className='narrow_header bar bc_3'></div>
                        <div className='narrow_header bar bc_3'></div>
                        <div className='narrow_header bar bc_3'></div>
                    </div>
                    <Link className='link develapp c_1' to={'/'} onClick={toTop}>DEVELAPP</Link>
                </div>
                <div className='wide_header'>
                    <Link className='link c_1' to={'/'} onClick={toTop}>Home</Link>
                    <Link className='link c_1' to={'/about'} onClick={toTop}>About</Link>
                    <Link className='link c_1' to={'/services'} onClick={toTop}>Services</Link>
                    <Link className='link c_1' to={'/blog'} onClick={toTop}>Blog</Link>
                    {
                    data?.claims.is_staff ?
                    <Link className='link c_1' to={'/messages'} onClick={toTop}>Messages</Link>
                    :
                    <Link className='link c_1' to={'/contact'} onClick={toTop}>Contact</Link>
                    }
                </div>
                {
                data ?
                <Link className='link c_1' to={'/account'} onClick={toTop}>{userName}</Link>
                :
                <div className='login_register'>
                    <Link className='link c_1' to={'/login'} onClick={toTop}>Login</Link>
                    <Link className='link c_1 register' to={'/register'} onClick={toTop}>Register</Link>
                </div>
                }
            </div>
            <Sidebar
            username={userName}
            handleNav={handleNav}
            logout={logout}
            isNav={isNav}
            isAuthenticated={data}
            isStaff={data?.claims.is_staff}
            />
        </header>
    );
}

export default Header;