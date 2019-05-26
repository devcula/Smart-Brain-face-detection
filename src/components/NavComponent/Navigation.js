import  React from 'react';
import './Navigation.css';

const Navigation = ({ onRouteChange }) =>{
    return (
        <nav>
            <p onClick={() => onRouteChange('signin')} className="f3 dim link pa3 white pointer">Sign Out</p>
        </nav>
    )
}

export default Navigation;