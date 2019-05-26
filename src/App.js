import React, { Component } from 'react';
import './App.css';
import Navigation from './components/NavComponent/Navigation'
import Logo from './components/LogoComponent/Logo';
import ImageLinkForm from './components/ImageLinkComponent/ImageLinkForm';
import Rank from './components/RankComponent/Rank';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import FaceDetection from './components/FaceDetectionComponent/FaceDetection';
import Login from './components/LoginComponent/Login';
import Register from './components/RegisterComponent/Register';

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
      route: "signin"
    }
  }

  onRouteChange = (route)=>{
    this.setState({ route: route });
  }

  calculateFaceLocation = (data) => {
    // const faceData = data.outputs[0].data.regions[0].region_info.bounding_box;
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
    else{
      return [];
    }
  }

  setFaceData = (box) => {
    this.setState({ boxes: box });
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

  render() {
    return (
      <div>
        <Particles params={particlesOptions} className="particles" />
        <Navigation onRouteChange={ this.onRouteChange }/>
        <Logo />
        <Register onRouteChange={this.onRouteChange} />
        { this.state.route === "signin" ?
          <Login onRouteChange = { this.onRouteChange }/> :
          <div>
            <Rank />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
            />
            <FaceDetection boxList={this.state.boxes} imageUrl={this.state.imageUrl} />
          </div>
        }
      </div>
    )
  }
}

export default App;
