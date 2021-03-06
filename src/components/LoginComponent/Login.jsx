import React from 'react';
import './Login.css';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            isValidEmail: false
        }
    }

    onEmailChange = (event) => {
        if(/^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/.test(event.target.value)){
            document.getElementById("invalidEmailLabel").style.display="none";
            this.setState({isValidEmail: true});
        }
        else{
            document.getElementById("invalidEmailLabel").style.display="block";
            this.setState({isValidEmail: false});
        }
        this.setState({ email: event.target.value });
    }

    onPasswordChange = (event) => {
        this.setState({ password: event.target.value });
    }

    login = () => {
        if (this.state.email && this.state.password && this.state.isValidEmail) {
            this.props.changeLoadingStatus(true);
            fetch(this.props.URI + "/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(this.state)
            }).then(response => {
                return response.json();
            })
                .then(user => {
                    if (user.id) {
                        this.props.updateUser(user);
                        this.props.updateRoute('home');
                        this.props.changeLoadingStatus(false);
                    }
                    else {
                        alert(user.message);
                        this.props.changeLoadingStatus(false);
                    }
                }).catch(err => {
                    console.log(err);
                    alert("Technical Error");
                    this.props.changeLoadingStatus(false);
                });
        }
        else {
            alert("Please enter valid email and password");
        }
    }

    render() {
        return (
            <div className="align-center login center w-80 br3 shadow-5">
                <main className="pa4 black-80 login-fields">
                    <div className="measure center">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f2 fw6 ph0 mh0 tc">Sign In</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f4" htmlFor="email">Email</label>
                                <input
                                    className="br-pill outline-0 shadow-5 pa3 input-reset bn bg-transparent hover-bg-black hover-white w-100"
                                    type="email"
                                    name="email"
                                    id="email"
                                    required
                                    onChange={this.onEmailChange}
                                />
                                <p id="invalidEmailLabel" className="f5 b red" style={{display: "none"}}>Invalid Email</p>
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f4" htmlFor="password">Password</label>
                                <input
                                    className="br-pill outline-0 shadow-5 pa3 input-reset bn bg-transparent hover-bg-black hover-white w-100"
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
                                onClick={this.login}
                                className="w-100 br-pill outline-0 pa4 b ph3 pv2 input-reset ba shadow-5 grow pointer f4 dib"
                                type="submit"
                                value="Sign in" />
                        </div>
                        <div className="lh-copy mt3">
                            <p onClick={() => this.props.updateRoute('register')} className="f5 tc link dim black db pointer">Not a member yet? Register!</p>
                            {/* <a href="/" className="f5 link dim black db">Forgot your password?</a> */}
                        </div>
                    </div>
                </main>
            </div>
        )
    }
}

export default Login;