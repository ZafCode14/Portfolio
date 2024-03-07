import React from 'react';
import './Services.css';
import { Link } from 'react-router-dom';

function Services() {
    const data = [
        {
            title: "UI/UX Design", 
            main: "Create intuitive and visually appealing user interfaces (UI) and user experiences (UX) to engage website visitors and enhance usability."
        }, 
        {
            title: "Responsive Design", 
            main: "Create websites that adapt to different screen sizes and devices"
        }, 
        {
            title: "Custom Web Development", 
            main: "Build unique and tailored web solutions to meet your specific requirements"
        }, 
        {
            title: "SEO Services", 
            main: "Optimize websites for search engines to improve visibility, organic traffic, and online presence."
        }, 
        {
            title: "CMS Services", 
            main: "Implement user-friendly platforms to easily manage and update website content"
        }, 
        {
            title: "Maintenance and Support", 
            main: "Ongoing support, updates, and maintenance services to ensure websites remain functional"
        }, 
    ]
    return (
        <div className='section_page format_page'>
            <h1>Services</h1>
            <h2>Unlock the full potential of your online presence with our top-notch web development services</h2>

            <div className="all_services">
                {data.map((service, index) => {
                    return (
                        <div key={index} className='service bc_3'>
                            <h3>{service.title}</h3>
                            <p>{service.main}</p>
                        </div>
                    )
                })}
            </div>
            <Link className='link' to={'/contact'}><button>Contact Now</button></Link>
        </div>
    );
}

export default Services;