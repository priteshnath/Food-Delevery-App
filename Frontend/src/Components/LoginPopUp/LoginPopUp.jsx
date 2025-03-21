import React, { useState } from 'react'
import './LoginPopUp.css'
import { assets } from '../../assets/assets';

const LoginPopUp = ({ setShowLogin }) => {
    const [currentState, setCurrentState] = useState('Sign Up');
    return (
        <div className='login-popup'>
            <form className='login-popup-container'>
                <div className="login-popup-title">
                    <h2>{currentState}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
                </div>
                <div className="login-popup-inputs">
                    {currentState === "Login"
                        ?
                        <></>
                        :
                        <input type="text" placeholder='Your Name' required />
                    }
                    <input type="text" placeholder='Your Email' required />
                    <input type="password" placeholder='Password' required />
                </div>
                <button>{currentState === "Sign Up" ? "Create Account " : "Login"}</button>
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