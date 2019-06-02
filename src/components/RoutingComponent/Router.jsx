import React from 'react';
import ImageLinkForm from '../ImageLinkComponent/ImageLinkForm.jsx';
import Rank from '../RankComponent/Rank.jsx';
import FaceDetection from '../FaceDetectionComponent/FaceDetection.jsx';
import Login from '../LoginComponent/Login.jsx';
import Register from '../RegisterComponent/Register.jsx';

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