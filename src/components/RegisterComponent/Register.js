import React from 'react';
import './Register.css';

class Register extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email: "",
            name: "",
            password: ""
        }
    }

    onEmailChange = (event) =>{
        this.setState({email: event.target.value});
    }

    onNameChange = (event) =>{
        this.setState({name: event.target.value});
    }

    onPasswordChange = (event) =>{
        this.setState({password: event.target.value});
    }

    register = () =>{
        if(this.state.email && this.state.name && this.state.password){
            fetch("http://localhost:3000/register", {
                method: "POST",
                body: JSON.stringify(this.state),
                headers: {"Content-Type": "application/json"}
            }).then(response => response.json())
            .then(res => {
                this.props.updateUser(res);
                this.props.onRouteChange('home');
            });
        }
        else{
            alert("Please enter all the information");
        }
    }

    render(){
        return (
            <div className="align-center register center w-50 br3">
                <main className="pa4 black-80">
                    <div className="measure center">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f2 fw6 ph0 mh0 tc">Welcome to Smart Brain</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f4" htmlFor="name">Name</label>
                                <input 
                                className="br-pill outline-0 shadow-5 pa3 input-reset bn bg-transparent hover-bg-black hover-white w-100" 
                                type="text" 
                                name="name"  
                                id="name" 
                                required
                                onChange={this.onNameChange}
                                />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f4" htmlFor="email-address">Email</label>
                                <input className="br-pill outline-0 shadow-5 pa3 input-reset bn bg-transparent hover-bg-black hover-white w-100" 
                                type="email" 
                                name="email-address"  
                                id="email-address"
                                required 
                                onChange={this.onEmailChange}
                                />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f4" htmlFor="password">Password</label>
                                <input className="br-pill outline-0 shadow-5 pa3 input-reset bn bg-transparent hover-bg-black hover-white w-100" 
                                type="password" 
                                name="password"  
                                id="password" 
                                required 
                                onChange={this.onPasswordChange}
                                />
                            </div>
                        </fieldset>
                        <div className="tc">
                            <input
                            className="w-100 br-pill outline-0 pa4 b ph3 pv2 input-reset ba shadow-5 grow pointer f4 dib" 
                            type="submit" 
                            value="Register" 
                            onClick={this.register}
                            />
                        </div>
                        <div className="lh-copy mt3">
                            <p onClick={() => this.props.onRouteChange('signin')} className="pointer f5 link dim black db">Already a member? Login </p>
                        </div>
                    </div>
                </main>
            </div>
        )
    }
}

export default Register;