import React from 'react';
import ImageLinkForm from '../ImageLinkComponent/ImageLinkForm';
import Rank from '../RankComponent/Rank';
import FaceDetection from '../FaceDetectionComponent/FaceDetection';
import Login from '../LoginComponent/Login';
import Register from '../RegisterComponent/Register';

const Router = ({props, onButtonSubmit, URI }) => {
    const {onInputChange, route, updateRoute, updateUser} = props;
    if (route === 'signin') {
        return <Login updateRoute={updateRoute} updateUser={updateUser} URI={URI}/>;
    }
    else if (route === 'home') {
        return (
            <div>
                <Rank currentUser = {props.currentUser}/>
                <ImageLinkForm
                    onInputChange={onInputChange}
                    onButtonSubmit={onButtonSubmit}
                />
                <FaceDetection boxList={props.boxes} imageUrl={props.inputUrl} />
            </div>
        )
    }
    else if(route === 'register'){
        return <Register updateRoute={updateRoute} updateUser={updateUser} URI={URI}/>;
    }
    else if(route==="signout"){
        return <Login updateRoute={updateRoute} updateUser={updateUser} URI={URI}/>;
    }
    else{
        
    }
}

export default Router;