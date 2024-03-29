import React from 'react';
import { NavLink } from 'react-router-dom';
import './footer.css'

const Footer = () => {

    const handleClick = e => {
		e.preventDefault();
		alert("Feature Coming Soon!")
	};

    return (
        <footer>
            <NavLink className="footer-home nav-link-f" exact to="/">
                <i className="fa fa-hiking" style={{color:'#25d066'}}></i>
                <span className='fh' style={{color:'#efefec'}}>GTrails</span>
            </NavLink>
            <div className="footer-content">
                <NavLink className='f-links' exact to="/explore">Explore</NavLink>
                <NavLink className='f-links' onClick={handleClick} to='/'>Maps</NavLink>
                <NavLink className='f-links' onClick={handleClick} to='/'>Community</NavLink>
                <NavLink className='f-links' onClick={handleClick} to='/'>Contact</NavLink>
            </div>
            <div className='footer-credits'>
                <div className='connect-info'>
                    <p className='text'>Connect With Me</p>
                    <div className='f-icons'>
                        <a target="_blank" href='https://www.linkedin.com/in/edithgomezgarcia/'><i className="fab fa-linkedin"></i></a>
                        <a target="_blank" href='https://github.com/egg-chicken'><i className="fab fa-github"></i></a>
                    </div>
                </div>
                <div>
                    <p className='text-end'>&copy; 2023 GTrails, Edith Gomez Garcia</p>
                    <div className='credits icon-cred'>
                        Icons made by
                        <a  className='icon-cred' href="https://www.flaticon.com/authors/pop-vectors" title="Pop Vectors">
                        Pop Vectors
                        </a>
                        from
                        <a className='icon-cred' href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;
