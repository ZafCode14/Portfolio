import React from 'react';
import { Link } from 'react-router-dom';
import "./Sidebar.css"

function Sidebar(props) {
    const style_nav = {
        left: props.isNav ? "0" : "-100vw"
    };
    const toTop = () => {
        window.scrollTo(0, 0)
    }
    return (
        <div style={{display: "flex"}}>
            <div className='navigation_slider' style={style_nav}>
                <div className='show_hide_bar bc_1' onClick={props.handleNav}>

                    { props.isAuthenticated &&
                    <a className='link c_1 sidebar_logout' href="/" onClick={props.logout}>logOut</a> }

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
                <div className='exit_navigation_slider' onClick={props.handleNav}> </div>
            </div>
        </div>
    );
}

export default Sidebar;