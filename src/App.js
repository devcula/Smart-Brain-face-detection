import React, {Component} from 'react';
import './App.css';
import Navigation from './components/NavComponent/Navigation'
import Logo from './components/LogoComponent/Logo';
import ImageLinkForm from './components/ImageLinkComponent/ImageLinkForm';
import Rank from './components/RankComponent/Rank';
import Particles from 'react-particles-js';

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
  render(){
    return (
      <div>
        <Particles params={particlesOptions} className="particles"/>
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm />
      </div>
    )
  }
}

export default App;
