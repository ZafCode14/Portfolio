import React from 'react';
import './Footer.css'
import { Link } from 'react-router-dom';

function Footer(props) {
    const toTop = () => {
        window.scrollTo(0, 0)
    }
    return (
        <footer className='bc_1 c_2'>
            <div className='footer_container'>
                <div className='footer_heading'>
                    <Link onClick={toTop} className='link c_1' to={'/'}><h3>DEVELAPP</h3></Link>
                </div>
                <div className='footer_nav'>
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
                <div className='footer_copyright c_1'>
                    <p>&copy; 2023 Website. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;