import React from 'react';


const Navigation = ({isSignedin, onRouteChange}) => {
	
	if (isSignedin) {
		return (
			<nav style={{display: 'flex', justifyContent: 'flex-end'}} >
				<p onClick= {() => onRouteChange('signout')} className= "f3 link dim black underline pa3 pointer">Sign Out</p>
			</nav>
		);	
	} else {
		return (
			<nav style={{display: 'flex', justifyContent: 'flex-end'}} >
				<p onClick= {() => onRouteChange('signup')} className= "f3 link dim black underline pa3 pointer">Register</p>
				<p onClick= {() => onRouteChange('signin')} className= "f3 link dim black underline pa3 pointer">Sign In</p>
			</nav>
		);
	}
	
}

export default Navigation;