import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	const handleClick = e => {
		e.preventDefault();
		alert("Feature Coming Soon!")
	}

	return (
		<nav className='nav-container'>
			<div className='a'>
				<NavLink className="home nav-link" exact to="/">
					<i className="fa fa-hiking" style={{color:'#25d066'}}></i>
					<span className='main-text'>GTrails</span>
				</NavLink>
			</div>
			<div className='b'>
				<NavLink className="nav-link sub-link" exact to="/explore">Explore</NavLink>
				<NavLink onClick={handleClick} className="nav-link sub-link" exact to="/community">Community</NavLink>
				<NavLink onClick={handleClick} className="nav-link sub-link" exact to="/saved">Saved</NavLink>
			</div>
			<div className='c right-nav-side'>
				{isLoaded && (
					<ProfileButton user={sessionUser}/>
				)}
			</div>
		</nav>
	);
}

export default Navigation;
