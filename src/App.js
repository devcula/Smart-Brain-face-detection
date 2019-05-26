import React, { Component } from 'react';
import './App.css';
import Navigation from './components/NavComponent/Navigation'
import Logo from './components/LogoComponent/Logo';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import Router from './components/RoutingComponent/Router';

const app = new Clarifai.App({
  apiKey: '4d486af086af4bab919bd537a915c5c6'
});

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
      isSignedIn: false
    }
  }

  resetState = () => {
    this.setState({
      input: "",
      imageUrl: "",
      boxes: [],
      route: "signin",
      isSignedIn: false
    })
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
    this.setState({ imageUrl: this.state.input });
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(response => this.setFaceData(this.calculateFaceLocation(response)))
      .catch(err => console.log(err));
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
      console.log(faceLocationsData);
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
        />
      </div>
    )
  }
}

export default App;
