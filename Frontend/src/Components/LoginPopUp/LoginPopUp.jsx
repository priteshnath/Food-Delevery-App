import React, { useContext, useState } from 'react'
import './LoginPopUp.css'
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const LoginPopUp = ({ setShowLogin }) => {
    const { url, setToken } = useContext(StoreContext);
    const [currentState, setCurrentState] = useState('Sign Up');
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const onChageHandler = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({ ...prev, [name]: value }));
    }

    const onLogin = async (e) => {
        e.preventDefault();
        let newUrl = url;
        if(currentState === "Login"){
            newUrl += '/api/user/login'
        }else{
            newUrl += '/api/user/register'
        }
        const response = await axios.post(newUrl, data);
        if(response.data.success){
            setToken(response.data.token);
            localStorage.setItem('token', response.data.token);
            setShowLogin(false);
        }else{
            alert(response.data.message);
        }
    }

    return (
        <div className='login-popup'>
            <form className='login-popup-container' onSubmit={onLogin}>
                <div className="login-popup-title">
                    <h2>{currentState}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
                </div>
                <div className="login-popup-inputs">
                    {currentState === "Login"
                        ?
                        <></>
                        :
                        <input type="text" placeholder='Your Name'
                            name='name'
                            onChange={onChageHandler}
                            value={data.name}
                            required
                        />
                    }
                    <input type="text" placeholder='Your Email'
                        name='email'
                        onChange={onChageHandler}
                        value={data.email}
                        required />
                    <input type="password" placeholder='Password'
                        name='password'
                        onChange={onChageHandler}
                        value={data.password}
                        required />
                </div>
                <button type='submit'>{currentState === "Sign Up" ? "Create Account " : "Login"}</button>
                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <p>By Continure, i agree to the terms of use & privacy policy.</p>
                </div>
                {
                    currentState === "Sign Up"
                        ?
                        <p>Already have an Account ? <span onClick={() => setCurrentState("Login")}>Login here</span></p>
                        :
                        <p>Create A new Account ? <span onClick={() => setCurrentState("Sign Up")}>Click here</span></p>
                }
            </form>
        </div>
    )
}

export default LoginPopUp