import React from 'react';
import "./Home.css"
import Services from "./Services"
import Contact from "./Contact"
import { Link } from 'react-router-dom';
import HeroAnimate from '../components/HeroAnimate'

function Home() {
    const toTop = () => {
        window.scrollTo(0, 0)
    }
    return (
        <div className='home_container'>
            <HeroAnimate/>
            <section className='hero_section format_page bc_3 c_2'>
                <div>
                    <h1>Create Amazing Websites</h1>
                    <h2>At Develapp, we specialize in crafting stunning and functional websites that grow your business. Experience the difference today.</h2>
                    <Link onClick={toTop} className='link' to={'/contact'}><button>Contact Now</button></Link>
                </div>
            </section>
            <section className='services_section c_2'>
                <Services minHight={"none"}/>
            </section>
            <section className='contact_section c_2'>
                <Contact/>
            </section>
            <section className='faq_section center_page c_2'>
                <h1>Frequent Questions</h1>
                <h2>FAQ</h2>

                <h4>What web development services do you offer?</h4>
                <p>We offer a wide range of web development services including front-end development, back-end development, full-stack development, e-commerce development, CMS development, and custom web application development.</p>

                <h4>How experienced are your web developers?</h4>
                <p>Our web developers have years of experience in the industry and are highly skilled in various programming languages and frameworks such as HTML, CSS, JavaScript, PHP, Python, Ruby on Rails, and more.</p>

                <h4>Can you help with website redesign or revamp?</h4>
                <p>Yes, we can help you with website redesign or revamp. Our team of designers and developers will work closely with you to understand your requirements and deliver a modern and user-friendly website that aligns with your brand.</p>

                <h4>Do you provide ongoing website maintenance and support?</h4>
                <p>Yes, we offer ongoing website maintenance and support services to ensure that your website is always up-to-date, secure, and functioning properly. Our team will handle regular updates, backups, security checks, bug fixes, and provide technical support whenever needed.</p>

                <h4>What is the typical turnaround time for web development projects</h4>
                <p>The turnaround time for web development projects depends on the complexity and scope of the project. We will provide you with a detailed timeline during the initial consultation based on your specific requirements.</p>

            </section>
        </div>
    );
}

export default Home;