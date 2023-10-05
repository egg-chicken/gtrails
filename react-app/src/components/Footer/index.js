import React from 'react';
import { NavLink } from 'react-router-dom';
import './footer.css'

const Footer = () => {
    const social = {
        github:'https://github.com/egg-chicken',
        insta:'',
        linkedinHandle:'https://www.linkedin.com/in/edithgomezgarcia/',
    };

    const handleClick = e => {
		e.preventDefault();
		alert("Feature Coming Soon!")
	};

    return (
        <footer>
            <div className="footer-content">
                <p className='text'>&copy; 2023 GTrails, Edith Gomez Garcia</p>
                <ul className="footer-links">
                    <li><NavLink className='right-text' exact to="/">Home</NavLink></li>
                    <li><NavLink onClick={handleClick} exact to="/">About</NavLink></li>
                    <li><NavLink onClick={handleClick} exact to="/">Contact</NavLink></li>
                </ul>
            </div>
            <div className='credits'>
                <p className='text'>Let's Connect</p>
                <div className='f-icons'>
                    <a href={social.linkedinHandle}><i className="fab fa-linkedin"></i></a>
                    <a href={social.github}><i className="fab fa-github"></i></a>
                    {/* <i className="fab fa-instagram"></i> */}
                </div>
                </div>
            <div className='credits'> Icons made by <a href="https://www.flaticon.com/authors/pop-vectors" title="Pop Vectors">  Pop Vectors </a> from  <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
        </footer>
    )
}

export default Footer;
