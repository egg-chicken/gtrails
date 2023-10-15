import React from 'react';
import { NavLink } from 'react-router-dom';
import './footer.css'

const Footer = () => {
    const social = {
        github:'https://github.com/egg-chicken',
        // insta: '',
        linkedinHandle:'https://www.linkedin.com/in/edithgomezgarcia/',
    };

    const handleClick = e => {
		e.preventDefault();
		alert("Feature Coming Soon!")
	};

    return (
        <footer>
            <div className='abc'>
				<NavLink className="footer-home nav-link" exact to="/">
                    <i className="fa fa-hiking" style={{color:'#25d066'}}></i>
					<span className='fh' style={{color:'#efefec'}}>GTrails</span>
				</NavLink>
			</div>
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
                        <a href={social.linkedinHandle}><i className="fab fa-linkedin"></i></a>
                        <a href={social.github}><i className="fab fa-github"></i></a>
                        {/* <i className="fab fa-instagram"></i> */}
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
