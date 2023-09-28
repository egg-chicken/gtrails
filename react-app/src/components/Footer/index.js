import React from 'react';
import { NavLink } from 'react-router-dom';
import './footer.css'

const Footer = () => {
    return (
        <footer>
            <div className="footer-content">
                <p className='text'>&copy; 2023 GTrails, Edith Gomez Garcia</p>
                <ul className="footer-links">
                    <li><NavLink exact to="/">Home</NavLink></li>
                    <li><NavLink exact to="/">About</NavLink></li>
                    <li><NavLink exact to="/">Contact</NavLink></li>
                </ul>
            </div>
            <div className='credits'>
                <p className='text'>Let's Connect</p>
                <div className='f-icons'>
                    <i className="fab fa-instagram"></i>
                    <i className="fab fa-linkedin"></i>
                    <i className="fab fa-github"></i>
                </div>
                </div>
            <div className='credits'> Icons made by <a href="https://www.flaticon.com/authors/pop-vectors" title="Pop Vectors">  Pop Vectors </a> from  <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
        </footer>
    )
}

export default Footer;
