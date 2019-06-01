import  React from 'react';
import './Navigation.css';

const Navigation = ({ props }) =>{
    const {updateRoute, isSignedIn} = props;
    if(isSignedIn) {
        return (
            <nav>
                <p onClick={() => updateRoute('signout')} className="f3 dim link pa3 white pointer">Sign Out</p>
            </nav>
        )
    }
    else{
        return (
            <nav>
                <p onClick={() => updateRoute('signin')} className="f3 dim link pa3 white pointer">Sign In</p>
                <p onClick={() => updateRoute('register')} className="f3 dim link pa3 white pointer">Register</p>
            </nav>
        )
    }
}

export default Navigation;