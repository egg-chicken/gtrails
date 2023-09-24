import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	return (
		<>
		<div>

			<NavLink exact to="/">
			<i class="fas fa-mountain"></i>
			<i class="fa fa-hiking"></i>
			<i class="fas fa-solid fa-tree">Home</i>
			</NavLink>
		</div>
		<ul>
			<li>
				<NavLink exact to="/explore">Explore</NavLink>
			</li>
			<li>
				<NavLink exact to="/community">Community</NavLink>
			</li>
			<li>
				<NavLink exact to="/saved">Saved</NavLink>
			</li>
			{isLoaded && (
				<li>
					<ProfileButton user={sessionUser} />
				</li>
			)}
		</ul>
		</>
	);
}

export default Navigation;
