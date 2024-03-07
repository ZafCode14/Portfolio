import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthService from '../services/auth.service'
import FormInput from '../components/FormInput'

function Login() {
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Username",
      label: "Username",
      required: true
    },
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "Password",
      label: "Password",
      required: true
    },
  ]

  const handleSubmit = async (e) => {
    e.preventDefault();
      try {
        await AuthService.login(values.username, values.password)
        .then(() => {
            const user = AuthService.getCurrentUser();
            if (user) {
              navigate("/");
              window.location.reload()
            } else {
              setErrorMessage("Incorrect Username or Password");
            }
          }
        );
      } catch (err) {
        console.log(err);
      }
  }

  const onChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value});
  }

  console.log(values);
  return (
    <div className="login_form format_page">
      <h1>Login</h1>
      <form onSubmit={handleSubmit} className="form_tag bc_3">
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
        <button className='form_button'>Login</button>
      </form>
    </div>
  )
};

export default Login