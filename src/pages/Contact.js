import React from 'react';
import { useState } from 'react';
import "./Contact.css"
import ContService from "../services/cont.service"
import { useNavigate } from 'react-router-dom';

function Contact(props) {
    const [values, setValues] = useState({
        name: "",
        email: "",
        message: ""
    })

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        ContService.create_message(values)
        .then(() => {
            navigate("/");
            window.scrollTo(0, 0);
            props.handleSuccess();
            setValues({name: "", email: "", message: ""})
        })
        .catch((error) => {
            console.log("!!!!!" + error);
        })
    }

    const onChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value})
    }
    console.log(values);
    return (
        <div className='contact_page format_page'>
            <h1>Contact Us Today</h1>
            <h2>Fill out the form below to get in touch with us. We are here to help with all your web development needs</h2>
            <form className='form_tag formInput bc_3' onSubmit={handleSubmit}>
                    <label>Name:</label>
                    <input
                    className='form_input'
                    placeholder='Enter your name'
                    type='text'
                    name='name'
                    value={values["name"]}
                    onChange={onChange}
                    required={true}
                    />
                    <label>Email:</label>
                    <input
                    className='form_input'
                    placeholder='Enter your email'
                    type='email'
                    name='email'
                    value={values["email"]}
                    onChange={onChange}
                    required={true}
                    />
                    <label>Message:</label>
                    <textarea
                    className='form_input'
                    placeholder='Enter your message'
                    name='message'
                    value={values["message"]}
                    onChange={onChange}
                    required={true}
                    />
                    <button>Send</button>
            </form>
        </div>
    );
}

export default Contact;