import React from 'react';
import { Link } from 'react-router-dom';
import "./Sidebar.css"

function Sidebar(props) {
    const style_nav = {
        right: props.isNav ? "0" : "-300px"
    };
    const toTop = () => {
        window.scrollTo(0, 0)
    }
    return (
        <div>
            <div className='show_hide_bar bc_1' style={style_nav} onClick={props.handleNav}>
                <Link onClick={toTop} className='link wide_header c_1' to={'/account'}>{props.username}</Link>
                {
                props.isAuthenticated ?
                <div className='sidebar_account_links'>
                    <Link onClick={toTop} className='link c_1' to={'/account'}>{props.username}</Link>
                    <a className='link c_1' href="/" onClick={props.logout}>logOut</a>
                </div>
                :
                <div className='login_register login_register_sidebar'>
                    <Link onClick={toTop} className='link c_1' to={'/login'}>Login</Link>
                    <Link onClick={toTop} className='link c_1' to={'/register'}>Register</Link>
                </div>
                }
                <div className='sidebar_main_links'>
                    <Link onClick={toTop} className='link c_1' to={'/'}>Home</Link>
                    <Link onClick={toTop} className='link c_1' to={'/about'}>About</Link>
                    <Link onClick={toTop} className='link c_1' to={'/services'}>Services</Link>
                    <Link onClick={toTop} className='link c_1' to={'/blog'}>Blog</Link>
                    {
                    props.isStaff ?
                    <Link onClick={toTop} className='link c_1' to={'/messages'}>Messages</Link>
                    :
                    <Link onClick={toTop} className='link c_1' to={'/contact'}>Contact</Link>
                    }
                </div>
            </div>
        </div>
    );
}

export default Sidebar;