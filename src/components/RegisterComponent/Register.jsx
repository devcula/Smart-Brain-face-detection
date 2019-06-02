import React from 'react';
import './Register.css';

class Register extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email: "",
            name: "",
            password: "",
            isValidEmail: false
        }
    }

    onEmailChange = (event) =>{
        if(/^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/.test(event.target.value)){
            document.getElementById("invalidEmailLabel").style.display="none";
            this.setState({isValidEmail: true});
        }
        else{
            document.getElementById("invalidEmailLabel").style.display="block";
            this.setState({isValidEmail: false});
        }
        this.setState({email: event.target.value});
    }

    onNameChange = (event) =>{
        this.setState({name: event.target.value});
    }

    onPasswordChange = (event) =>{
        this.setState({password: event.target.value});
    }

    register = () =>{
        if(this.state.email && this.state.name && this.state.password && this.state.isValidEmail){
            this.props.changeLoadingStatus(true);
            fetch(this.props.URI + "/register", {
                method: "POST",
                body: JSON.stringify(this.state),
                headers: {"Content-Type": "application/json"}
            }).then(response =>  response.json())
            .then(res => {
                if(res.id){
                    this.props.updateUser(res);
                    this.props.updateRoute('home');
                    this.props.changeLoadingStatus(false);
                }
                else{
                    alert(res.message);
                    this.props.changeLoadingStatus(false);
                }
            })
            .catch(err => {
                console.log(err);
            })
        }
        else{
            alert("Please enter valid information to register");
        }
    }

    render(){
        return (
            <div className="align-center register center w-80 br3">
                <main className="pa4 black-80 register-fields">
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
                                <p id="invalidEmailLabel" className="f5 b red" style={{display: "none"}}>Invalid Email</p>
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
                            <p onClick={() => this.props.updateRoute('signin')} className="pointer tc f5 link dim black db">Already a member? Login</p>
                        </div>
                    </div>
                </main>
            </div>
        )
    }
}

export default Register;