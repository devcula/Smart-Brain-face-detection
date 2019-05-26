import React from 'react';
import './Login.css';

const Login = ({ onRouteChange }) => {
    return (
        <div className="align-center login center w-50 br3">
            <main className="pa4 black-80">
                <div className="measure center">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f2 fw6 ph0 mh0 tc">Sign In</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f4" htmlFor="email-address">Email</label>
                            <input className="br-pill outline-0 shadow-5 pa3 input-reset bn bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"/>
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f4" htmlFor="password">Password</label>
                            <input className="br-pill outline-0 shadow-5 pa3 input-reset bn bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" />
                        </div>
                    </fieldset>
                    <div className="tc">
                        <input
                        onClick={() => onRouteChange('home')} 
                        className="w-100 br-pill outline-0 pa4 b ph3 pv2 input-reset ba shadow-5 grow pointer f4 dib" 
                        type="submit" 
                        value="Sign in" />
                    </div>
                    <div className="lh-copy mt3">
                        <p onClick={() => onRouteChange('register')} className="f5 link dim black db pointer">Register</p>
                        <a href="/" className="f5 link dim black db">Forgot your password?</a>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Login;