import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom';

const Footer = () => {
    return (
        <div className='footer' id='footer'>
            <div className="footer-content">
                <div className='footer-content-left'>
                    <img src={assets.logo} alt="" />
                    <p>
                        FoodZy is your trusted partner in satisfying cravings with quality and care. We deliver fresh, delicious meals straight from our cloud kitchen to your doorstep. Whether you're in the mood for comfort food, a healthy bite, or something new, FoodZy brings flavor and convenience together in every order.
                    </p>
                </div>
                <div className='footer-content-center'>
                    <h2>COMPANY</h2>
                    <ul>
                        <li>
                            <Link
                                to='/'
                                onClick={() => {
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <a href="#explore-menu" >Menu</a>
                        </li>
                        <li>
                            <a href="#About" >About FoodZy</a>
                        </li>
                    </ul>
                </div>
                <div className='footer-content-right'>
                    <h2>GET IN TOUCH</h2>
                    <ul>
                        <li>+1-343-344-3434</li>
                        <li>contact@foodzy.com</li>
                    </ul>
                </div>
            </div>
            <hr />
            <p className='footer-copyrigt'>Copyright 2024 © Foodzy.com - All Right Reserved.</p>
        </div>
    )
}

export default Footer