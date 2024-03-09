import React, { useEffect, useState } from 'react'
import AuthService from '../services/auth.service'
import "./Account.css"
import { useNavigate } from 'react-router-dom';

function Account(props) {
    const [values, setValues] = useState({
        userId: "",
        username: "",
        email: "",
        firstName: "",
        lastName: "",
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: ""
    });

    const navigate = useNavigate();
    const inputs = [
        {
            id: 1,
            type: "text",
            name: "username",
            className: "edit_value",
            label: "Username:",
            placeholder: "Edit your username",
            required: true
        },
        {
            id: 2,
            type: "email",
            name: "email",
            className: "edit_value",
            label: "Email:",
            placeholder: "Edit your email",
            required: true
        },
        {
            id: 3,
            type: "text",
            name: "firstName",
            className: "edit_value",
            label: "First name:",
            placeholder: "Edit your first name",
        },
        {
            id: 4,
            type: "text",
            name: "lastName",
            className: "edit_value",
            label: "Last name:",
            placeholder: "Edit your last name",
        },
        {
            id: 5,
            type: "password",
            name: "oldPassword",
            className: "edit_value",
            label: "Change password:",
            placeholder: "Enter your password",
        },
        {
            id: 6,
            type: "password",
            name: "newPassword",
            className: "edit_value",
            label: "",
            placeholder: "Enter your new password",
        },
        {
            id: 7,
            type: "password",
            name: "confirmNewPassword",
            className: "edit_value",
            pattern: values.newPassword,
            label: "",
            placeholder: "Confirm your new password",
        },
    ]
    useEffect(() => {
        if (props.user){
            AuthService.data().then((result) => {
                console.log(result.user_data);
                setValues({ ...values, ...result.user_data });
            }, (error) => {
                console.log(error);
            })
        }
    // eslint-disable-next-line
    }, [])


    const handleChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value})
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
        await AuthService.edit(values)
        .then(() => {
                window.location.reload()
                console.log(values)
            },
            (error) => {
                console.log(error);
            }
        );
        } catch (err) {
        console.log(err);
        }
    }

    const logout = () => {
        AuthService.logout();
        navigate("/");
        window.location.reload();
    }
    console.log(values);
    return (
        <form onSubmit={onSubmit} className="format_page">
            <h1>Account</h1>
            <div className='account'>
                <div className='account_row_column'>
                    {inputs.map((input) => {
                        return (
                            <div className='account_row' key={input.id}>
                                <p className='edit_label'>{input.label}</p>
                                <input
                                    {...input}
                                    value={values[input.name]}
                                    onChange={handleChange}
                                />
                            </div>
                        )
                    })}
                </div>
                <button onClick={logout}>Log out</button>
                <button type='submit'>Save</button>
            </div>
        </form>
    )
    };

export default Account;