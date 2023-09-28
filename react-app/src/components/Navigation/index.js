import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	return (
		<nav className='nav-container'>
			<div>
				<NavLink className="home nav-link" exact to="/">
					<span>GTrails</span>
					<i className="fa fa-hiking" style={{color:'#25d066',}}></i>
				</NavLink>
			</div>
			<div>
				<NavLink className="nav-link sub-link" exact to="/explore">Explore</NavLink>
				<NavLink className="nav-link sub-link" exact to="/community">Community</NavLink>
				<NavLink className="nav-link sub-link" exact to="/saved">Saved</NavLink>
			</div>
			<div className='right-nav-side'>
				{isLoaded && (
					<ProfileButton user={sessionUser}/>
				)}
			</div>
		</nav>
	);
}

export default Navigation;
