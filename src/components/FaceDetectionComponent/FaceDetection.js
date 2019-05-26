import React from 'react';
import './FaceDetection.css';

const FaceDetection = ({ imageUrl, box })=>{
    return (
        <div className="align-center">
            <div className="absolute mt2">
                <img id="inputimage" src={ imageUrl } alt=""  width="500px" height="auto"/>
                <div className="bounding-box" style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
            </div>
        </div>
    )
}

export default FaceDetection;