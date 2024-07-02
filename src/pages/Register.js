import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FormInput from '../components/FormInput'

function Register(props) {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Username",
      errorMessage: "Usernaem should be 3-16 characters and shouldn't inculude any special characters",
      label: "Username",
      pattern: "^[a-zA-Z0-9]{3,16}$",
      required: true
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "Email should be a valid email",
      label: "Email",
      required: true
    },
    {
      id: 3,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage: "Password should be 8-20 characters and include at least 1 letter, 1 number",
      label: "Password",
      pattern: "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,20}$",
      required: true
    },
    {
      id: 4,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm password",
      errorMessage: "Passwords don't match",
      label: "Confirm password",
      pattern: values.password,
      required: true
    },
  ]

  const submit = async (e) => {
    e.preventDefault();
    try {
      navigate("/login");
      props.handleRegister();
    } catch (error) {
      setErrorMessage("Username already exists");
      console.log(error);
    }
  };


  const onChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value});
  }

  console.log(values);
  return (
    <div className="register_form format_page">
      <h1>Register</h1>
      <form className='form_tag bc_3' onSubmit={submit}>
        {inputs.map((input) => {
          return (
            <FormInput
              key={input.id} 
              {...input} 
              value={values[input.name]} 
              onChange={onChange}
            />
          );
        })}
        <span style={{color: "red"}}>{errorMessage}</span>
        <button className='form_button'>Subbmit</button>
      </form>
    </div>
  )
};

export default Register