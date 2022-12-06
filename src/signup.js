import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [disabled, setDisabled] = useState(true)

    const navigate = useNavigate();

    const handleInputChange = e => {
        const name = e.target.name;

        name == 'email' ? setEmail(e.target.value) : setPassword(e.target.value);
        /@/.test(email) && password.length >= 8 ? setDisabled(false) : setDisabled(true);
    }

    const handleSubmit = e => {
        e.preventDefault();

        axios.post('https://pre-onboarding-selection-task.shop/auth/signup', {
            email,
            password
        })
        .then((response) => {
            localStorage.setItem("accessToken", response.data.access_token);
            navigate("/");
        })
        .catch((err) => {
            console.log(err)
        })
    }
    
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    E-mail
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={handleInputChange}
                        >
                    </input>
                </label>
                <br />
                <label>
                    Password
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={handleInputChange}
                        >
                    </input>
                </label>
                <br />
                <button type="submit" disabled={disabled}>
                    회원가입
                </button>
            </form>
            {email}<br />{password}
        </div>
    )
}

export default SignUp