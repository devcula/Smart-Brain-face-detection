import React from 'react';
import Box from '../BoxComponent/Box';

const FaceDetection = ({ imageUrl, boxList })=>{
    return (
        <div className="align-center">
            <div className="absolute mt2">
                <img id="inputimage" src={ imageUrl } alt=""  width="500px" height="auto"/>
                {
                    boxList.map(box =>{
                        return (
                            <Box box={box} />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default FaceDetection;