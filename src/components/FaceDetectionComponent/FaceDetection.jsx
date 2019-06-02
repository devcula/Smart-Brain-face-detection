import React from 'react';
import Box from '../BoxComponent/Box.jsx';

const FaceDetection = ({ imageUrl, boxList })=>{
    return (
        <div className="align-center">
            <div className="absolute mt2">
                <img id="inputimage" src={ imageUrl } alt=""  width="500px" height="auto"/>
                {
                    boxList.map((box,i) =>{
                        return (
                            <Box key={i} box={box} />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default FaceDetection;