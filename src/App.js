import React, {Component} from 'react';
import './App.css';
import Navigation from './components/NavComponent/Navigation'
import Logo from './components/LogoComponent/Logo';

class App extends Component{
  render(){
    return (
      <div>
        <Navigation />
        <Logo />
      </div>
    )
  }
}

export default App;
