import React from 'react';
import ImageLinkForm from '../ImageLinkComponent/ImageLinkForm.jsx';
import Rank from '../RankComponent/Rank.jsx';
import FaceDetection from '../FaceDetectionComponent/FaceDetection.jsx';
import Login from '../LoginComponent/Login.jsx';
import Register from '../RegisterComponent/Register.jsx';
import Footer from '../FooterComponent/Footer';

const Router = ({props, onButtonSubmit, URI }) => {
    const {onInputChange, route, updateRoute, updateUser, changeLoadingStatus} = props;
    if (route === 'signin') {
        return (
            <div>
                <Login 
                changeLoadingStatus={changeLoadingStatus} 
                updateRoute={updateRoute} 
                updateUser={updateUser} 
                URI={URI}/>
                <Footer />
            </div>
        )
    }
    else if (route === 'home') {
        return (
            <div>
                <Rank currentUser = {props.currentUser}/>
                <ImageLinkForm
                    onInputChange={onInputChange}
                    onButtonSubmit={onButtonSubmit}
                    changeLoadingStatus={changeLoadingStatus}
                />
                <FaceDetection boxList={props.boxes} imageUrl={props.inputUrl} />
            </div>
        )
    }
    else if(route === 'register'){
        return (
            <div>
                <Register 
                    changeLoadingStatus={changeLoadingStatus} 
                    updateRoute={updateRoute} 
                    updateUser={updateUser} 
                    URI={URI}
                /> 
                <Footer />
            </div>
        )
    }
    else if(route==="signout"){
        return (
            <div>
                <Login 
                changeLoadingStatus={changeLoadingStatus} 
                updateRoute={updateRoute} 
                updateUser={updateUser} 
                URI={URI}
                />
                <Footer />
            </div>
        )
    }
    else{
        
    }
}

export default Router;