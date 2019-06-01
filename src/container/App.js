import React, { Component } from 'react';
import './App.css';
import Navigation from '../components/NavComponent/Navigation'
import Logo from '../components/LogoComponent/Logo';
import Particles from 'react-particles-js';
import Router from '../components/RoutingComponent/Router';


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

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imageUrl: "",
      boxes: [],
      route: "signin",
      isSignedIn: false,
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
      input: "",
      imageUrl: "",
      boxes: [],
      route: "signin",
      isSignedIn: false,
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
        isSignedIn: true
      }
    )
  }

  onRouteChange = (route) => {
    if (route === "home") {
      this.setState({ isSignedIn: true });
    }
    else if (route === "signout") {
      this.resetState();
    }
    else {
      this.setState({ isSignedIn: false });
    }
    this.setState({ route: route });
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  onButtonSubmit = () => {
    if(this.state.input){
      this.setState({ imageUrl: this.state.input });
      fetch(URI + "/clarifai",{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          id: this.state.currentUser.id,
          imageurl: this.state.input
        })
      })
      .then(response => response.json())
      .then(data => {
        this.setFaceData(this.calculateFaceLocation(data));
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

  setFaceData = (box) => {
    this.setState({ boxes: box });
  }

  render() {
    return (
      <div>
        <Particles params={particlesOptions} className="particles" />
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={this.state.isSignedIn} />
        <Logo />
        <Router
          state={this.state}
          onRouteChange={this.onRouteChange}
          onButtonSubmit={this.onButtonSubmit}
          onInputChange={this.onInputChange} 
          updateUser={this.updateUser} 
          URI = {URI}
        />
      </div>
    )
  }
}

export default App;
