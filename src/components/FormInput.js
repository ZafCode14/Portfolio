import React, { useState } from 'react';
import "./FormInput.css";

function FormInput(props) {
    const [focused, setFocused] = useState(false);
    const {label, errorMessage, onChange, id, ...inputProps} = props;

    const handleFocus = (e) => {
        setFocused(true);
    }
    return (
        <div className='formInput'>
            <label>{label}</label>
            <input
                className='form_input'
                {...inputProps} 
                onChange={onChange} 
                onBlur={handleFocus} 
                onFocus={() => 
                    inputProps.name === "confirmPassword" && setFocused(true)}
                focused={focused.toString()}
                />
                <span className='error'> {errorMessage} </span>
        </div>
    );
}

export default FormInput;