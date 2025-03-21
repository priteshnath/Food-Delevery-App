import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
    return (
        <div className='footer' id='footer'>
            <div className="footer-content">
                <div className='footer-content-left'>
                    <img src={assets.logo} alt="" />
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, perspiciatis.
                        Cupiditate ratione consequuntur iusto placeat mollitia eveniet nulla pariatur,
                        maiores adipisci numquam a neque dolorem hic harum magni sunt praesentium.
                    </p>
                    <div className='footer-social-icon'>
                        <img src={assets.facebook_icon} alt="Facebook Icon" />
                        <img src={assets.linkedin_icon} alt="Linked-in Icon" />
                    </div>
                </div>
                <div className='footer-content-center'>
                    <h2>COMPANY</h2>
                    <ul><li>Home</li>
                        <li>About us</li>
                        <li>Delivery</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>
                <div className='footer-content-right'>
                    <h2>GET IN TOUCH</h2>
                    <ul>
                        <li>+1-343-344-3434</li>
                        <li>contact@tomato.com</li>
                    </ul>
                </div>
            </div>
            <hr />
            <p className='footer-copyrigt'>Copyright 2024 © Tomato.com - All Right Reserved.</p>
        </div>
    )
}

export default Footer