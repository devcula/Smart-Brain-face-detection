import React, {Component} from 'react';
import './App.css';
import Navigation from './components/NavComponent/Navigation'
import Logo from './components/LogoComponent/Logo';
import ImageLinkForm from './components/ImageLinkComponent/ImageLinkForm';
import Rank from './components/RankComponent/Rank';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import FaceDetection from './components/FaceDetectionComponent/FaceDetection';

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

class App extends Component{
  constructor(){
    super();
    this.state={
      input: "",
      imageUrl: "",
      box: {}
    }
  }

  calculateFaceLocation = (data) =>{
    const faceData = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputimage");
    const { height, width } = image;
    return {
      leftCol: faceData.left_col * width,
      rightCol: width - (faceData.right_col * width),
      topRow: faceData.top_row * height,
      bottomRow: height - (faceData.bottom_row * height)
    }
  }
  
  setFaceData = (box)=>{
    this.setState({box:box});
  }

  onInputChange = ( event ) =>{
    this.setState({input: event.target.value});
  }

  onButtonSubmit = ()=>{
    this.setState({imageUrl: this.state.input});
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
    .then(response => this.setFaceData(this.calculateFaceLocation(response)))
    .catch(err => console.log(err));
  }

  render(){
    return (
      <div>
        <Particles params={particlesOptions} className="particles"/>
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm 
        onInputChange={ this.onInputChange }
        onButtonSubmit={ this.onButtonSubmit }
        />
        <FaceDetection box={this.state.box} imageUrl={ this.state.imageUrl }/>
      </div>
    )
  }
}

export default App;
