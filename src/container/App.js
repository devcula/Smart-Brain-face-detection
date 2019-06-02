import React, { Component } from 'react';
import './App.css';
import Navigation from '../components/NavComponent/Navigation'
import Logo from '../components/LogoComponent/Logo';
import Particles from 'react-particles-js';
import Router from '../components/RoutingComponent/Router';
import { connect } from 'react-redux';
import {onInputChange, 
  onBoxUpdate, 
  onAppReset, 
  changeRoute, 
  changeSignedInStatus,
  updateUser } 
  from '../redux/actionCreators';


const URI = "https://dry-ravine-79367.herokuapp.com";

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
    isSignedIn: state.changeSignedInStatusReducer.isSignedIn,
    currentUser: state.updateUserReducer.currentUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onInputChange: (event) => {
      dispatch(onBoxUpdate([]));
      dispatch(onInputChange(event.target.value));
    },
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
    },
    updateUser: (user) => dispatch(updateUser(user))
  }
}

class App extends Component {

  onButtonSubmit = () => {
    if(this.props.inputUrl){
      fetch(URI + "/clarifai",{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          id: this.props.currentUser.id,
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
          id: this.props.currentUser.id,
          entries: faceData.length
        })
      }).then(response => response.json())
      .then(user => {
        this.props.updateUser(user);
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
          onButtonSubmit={this.onButtonSubmit}
          URI = {URI}
        />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
