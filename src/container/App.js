import React, { Component } from 'react';
import './App.css';
import Navigation from '../components/NavComponent/Navigation'
import Logo from '../components/LogoComponent/Logo';
import Particles from 'react-particles-js';
import Router from '../components/RoutingComponent/Router';
import { connect } from 'react-redux';
import {onInputChange, onBoxUpdate, onAppReset, changeRoute, changeSignedInStatus} from '../redux/actionCreators';


const URI = "http://localhost:3000";

const particlesOptions = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

const mapStateToProps = (state) =>{
  return {
    inputUrl: state.inputUrlChangeReducer.inputUrl,
    boxes: state.updateBoxReducer.boxes,
    route: state.changeRouteReducer.route,
    isSignedIn: state.changeSignedInStatusReducer.isSignedIn
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onInputChange: (event) => dispatch(onInputChange(event.target.value)),
    setFaceData: (boxList) => dispatch(onBoxUpdate(boxList)),
    resetState: () => dispatch(onAppReset()),
    updateRoute: (route) => {
      if (route === "home") {
        dispatch(changeSignedInStatus(true));
      }
      else if (route === "signout") {
        dispatch(onAppReset());
      }
      else {
        dispatch(changeSignedInStatus(false));
      }
      dispatch(changeRoute(route));
    }
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      imageUrl: "",
      currentUser: {
        id: "",
        email: "",
        name: "",
        entries: "",
        joined: ""
      }
    }
  }

  resetState = () => {
    this.setState({
      imageUrl: "",
      currentUser: {
        id: "",
        email: "",
        name: "",
        entries: "",
        joined: ""
      }
    })
  }

  updateUser = (user) =>{
    this.setState(
      {
        currentUser: {
          id: user.id,
          email: user.email,
          name: user.name,
          entries: user.entries,
          joined: user.joined
        },
      }
    )
  }

  onButtonSubmit = () => {
    if(this.props.inputUrl){
      this.setState({ imageUrl: this.props.inputUrl });
      fetch(URI + "/clarifai",{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          id: this.state.currentUser.id,
          imageurl: this.props.inputUrl
        })
      })
      .then(response => response.json())
      .then(data => {
        this.props.setFaceData(this.calculateFaceLocation(data));
      })
      .catch(err => console.log(err));
    }
    else{
      alert("Please enter a url");
    }
  }

  calculateFaceLocation = (data) => {
    const faceData = data.outputs[0].data.regions;
    if (faceData) {
      const image = document.getElementById("inputimage");
      const { height, width } = image;
      const faceLocationsData = faceData.map(region => {
        const faceData = region.region_info.bounding_box;
        return {
          leftCol: faceData.left_col * width,
          rightCol: width - (faceData.right_col * width),
          topRow: faceData.top_row * height,
          bottomRow: height - (faceData.bottom_row * height)
        }
      });
      fetch(URI + "/update",{
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          id: this.state.currentUser.id,
          entries: faceData.length
        })
      }).then(response => response.json())
      .then(user => {
        this.updateUser(user);
      })
      .catch(err => console.log(err));
      return faceLocationsData;
    }
    else {
      return [];
    }
  }

  render() {
    return (
      <div>
        <Particles params={particlesOptions} className="particles" />
        <Navigation props={this.props} />
        <Logo />
        <Router 
          props={this.props}
          state={this.state}
          onButtonSubmit={this.onButtonSubmit}
          updateUser={this.updateUser} 
          URI = {URI}
        />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
