import  React from 'react';
import './Navigation.css';

const Navigation = ({ onRouteChange, isSignedIn }) =>{
    if(isSignedIn) {
        return (
            <nav>
                <p onClick={() => onRouteChange('signout')} className="f3 dim link pa3 white pointer">Sign Out</p>
            </nav>
        )
    }
    else{
        return (
            <nav>
                <p onClick={() => onRouteChange('signin')} className="f3 dim link pa3 white pointer">Sign In</p>
                <p onClick={() => onRouteChange('register')} className="f3 dim link pa3 white pointer">Register</p>
            </nav>
        )
    }
}

export default Navigation;