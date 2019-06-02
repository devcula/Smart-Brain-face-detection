import React from 'react';
import Tilt from 'react-tilt';
import logo from '../../resources/logo.png';
import './Logo.css';

const Logo = () => {
    return (
        <div className="ma4 mt0">
            <Tilt className="Tilt" options={{ max: 45 }} style={{ height: 150, width: 150 }} >
                <div className="Tilt-inner App-logo">
                    <img src={logo} alt="logo"/>
                </div>
            </Tilt>
        </div>
    )
}

export default Logo;