import React from 'react';
import './Navigation.css';

const Navigation = ({isSignedin, onRouteChange, onSignOut}) => {
	
	if (isSignedin) {
		return (
			<nav style={{display: 'flex', justifyContent: 'flex-end'}} >
				<p onClick= {() => onRouteChange('signout')} className= "button ">Sign Out</p>
			</nav>
		);	
	} else {
		return (
			<nav style={{display: 'flex', justifyContent: 'flex-end'}} >
				<p onClick= {() => onRouteChange('signup')} className= "button ">Sign Up</p>
				<p onClick= {() => onRouteChange('signin')} className= "button">Sign In</p>
			</nav>
		);
	}	
}

export default Navigation;