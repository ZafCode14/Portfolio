import React, { useEffect } from 'react';
import './Services.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';

function Services() {
    const [index1, setIndex1] = useState(0);
    const [index2, setIndex2] = useState(1);
    const [index3, setIndex3] = useState(2);
    const [index4, setIndex4] = useState(3);

    useEffect(() => {
        setInterval(() => {
            setIndex1(prev => {
                if (prev < 3) {
                    return prev + 1
                } else {
                    return 0
                }
            });
            setIndex2(prev => {
                if (prev < 3) {
                    return prev + 1
                } else {
                    return 0
                }
            });
            setIndex3(prev => {
                if (prev < 3) {
                    return prev + 1
                } else {
                    return 0
                }
            });
            setIndex4(prev => {
                if (prev < 3) {
                    return prev + 1
                } else {
                    return 0
                }
            });
        }, 1000)
    }, [])

    const colors = [
            "rgba(255, 247, 0, 0.1)",
            "rgba(8, 0, 255, 0.1)",
            "rgba(255, 0, 0, 0.1)",
            "rgba(0, 255, 13, 0.1)"
    ] 

    const data = [
        {
            title: "UI/UX Design", 
            main: "Create intuitive and visually appealing user interfaces (UI) and user experiences (UX) to engage website visitors and enhance usability.",
            backgroundColor: colors[index1]
        }, 
        {
            title: "Responsive Design", 
            main: "Create websites that adapt to different screen sizes and devices",
            backgroundColor: colors[index2]
        }, 
        {
            title: "Custom Web Development", 
            main: "Build unique and tailored web solutions to meet your specific requirements",
            backgroundColor: colors[index3]
        }, 
        {
            title: "SEO Services", 
            main: "Optimize websites for search engines to improve visibility, organic traffic, and online presence.",
            backgroundColor: colors[index4]
        }, 
        {
            title: "CMS Services", 
            main: "Implement user-friendly platforms to easily manage and update website content",
            backgroundColor: colors[index2]
        }, 
        {
            title: "Maintenance and Support", 
            main: "Ongoing support, updates, and maintenance services to ensure websites remain functional",
            backgroundColor: colors[index1]
        }, 
    ]

    const toTop = () => {
        window.scrollTo(0, 0)
    }
    return (
        <div className='section_page format_page'>
            <h1>Services</h1>
            <h2>Unlock the full potential of your online presence with our top-notch web development services</h2>

            <div className="all_services">
                {data.map((service, index) => {
                    return (
                        <div key={index} className='service' style={{backgroundColor: service.backgroundColor}}>
                            <h3>{service.title}</h3>
                            <p>{service.main}</p>
                        </div>
                    )
                })}
            </div>
            <Link className='link' to={'/contact'}><button onClick={toTop}>Contact Now</button></Link>
        </div>
    );
}

export default Services;