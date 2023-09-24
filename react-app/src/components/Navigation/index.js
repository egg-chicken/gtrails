import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	return (
		<>
			<div className='nav-bar'>
				<div>
					<NavLink className="home nav-link" exact to="/">
						<i class="fas fa-mountain"></i>
						<i class="fa fa-hiking"></i>
						<i class="fas fa-solid fa-tree"></i>
						GTrails
					</NavLink>
				</div>
				<div>
					<NavLink className="nav-link" exact to="/explore">Explore</NavLink>
				</div>
				<div>
					<NavLink className="nav-link" exact to="/community">Community</NavLink>
				</div>
				<div>
					<NavLink className="nav-link" exact to="/saved">Saved</NavLink>
				</div>
				<div>
					{isLoaded && (
						<ProfileButton user={sessionUser} />
					)}
				</div>
			</div>
		</>
	);
}

export default Navigation;
