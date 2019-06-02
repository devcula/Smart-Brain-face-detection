import React, { Component } from 'react';
import './App.css';
import Navigation from '../components/NavComponent/Navigation.jsx'
import Logo from '../components/LogoComponent/Logo.jsx';
import Particles from 'react-particles-js';
import Router from '../components/RoutingComponent/Router.jsx';
import Loader from '../components/LoaderComponent/Loader.jsx';
import { connect } from 'react-redux';
import {
  onInputChange,
  onBoxUpdate,
  onAppReset,
  changeRoute,
  changeSignedInStatus,
  updateUser,
  changeLoadingStatus
}
  from '../redux/actionCreators';


const URI = "http://localhost:3001";

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

const mapStateToProps = (state) => {
  return {
    inputUrl: state.inputUrlChangeReducer.inputUrl,
    boxes: state.updateBoxReducer.boxes,
    route: state.changeRouteReducer.route,
    isSignedIn: state.changeSignedInStatusReducer.isSignedIn,
    currentUser: state.updateUserReducer.currentUser,
    loading: state.loadingStatusReducer.loading
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
        dispatch(changeLoadingStatus(false));
      }
      else {
        dispatch(changeSignedInStatus(false));
      }
      dispatch(changeRoute(route));
    },
    updateUser: (user) => dispatch(updateUser(user)),
    changeLoadingStatus: (status) => dispatch(changeLoadingStatus(status))
  }
}

class App extends Component {

  componentDidMount = () => {
    this.props.changeLoadingStatus(false);
  }

  onButtonSubmit = () => {
    if (this.props.inputUrl) {
      this.props.changeLoadingStatus(true);
      fetch(URI + "/clarifai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: this.props.currentUser.id,
          imageurl: this.props.inputUrl
        })
      })
        .then(response => response.json())
        .then(data => {
          this.props.setFaceData(this.calculateFaceLocation(data));
          this.props.changeLoadingStatus(false);
        })
        .catch(err => {
          console.log(err);
          this.props.changeLoadingStatus(false);
        });
    }
    else {
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
      fetch(URI + "/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
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
        <Loader loading={this.props.loading} />
        <Particles params={particlesOptions} className="particles" />
        <Navigation props={this.props} />
        <Logo />
        <Router
          props={this.props}
          onButtonSubmit={this.onButtonSubmit}
          URI={URI}
        />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
