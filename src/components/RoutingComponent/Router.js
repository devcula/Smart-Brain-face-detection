import React from 'react';
import ImageLinkForm from '../ImageLinkComponent/ImageLinkForm';
import Rank from '../RankComponent/Rank';
import FaceDetection from '../FaceDetectionComponent/FaceDetection';
import Login from '../LoginComponent/Login';
import Register from '../RegisterComponent/Register';

const Router = ({ state, onRouteChange, onButtonSubmit, onInputChange, updateUser, URI }) => {
    if (state.route === 'signin') {
        return <Login onRouteChange={onRouteChange} updateUser={updateUser} URI={URI}/>;
    }
    else if (state.route === 'home') {
        return (
            <div>
                <Rank state = {state}/>
                <ImageLinkForm
                    onInputChange={onInputChange}
                    onButtonSubmit={onButtonSubmit}
                />
                <FaceDetection boxList={state.boxes} imageUrl={state.imageUrl} />
            </div>
        )
    }
    else if(state.route === 'register'){
        return <Register onRouteChange={onRouteChange} updateUser={updateUser} URI={URI}/>;
    }
    else if(state.route==="signout"){
        return <Login onRouteChange={onRouteChange} updateUser={updateUser} URI={URI}/>;
    }
    else{
        
    }
}

export default Router;