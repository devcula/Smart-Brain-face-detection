import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ()=>{
    return (
        <div style={{textAlign: "center"}}>
            <p className="f3 white">
                {'This Magic Brain will detect faces in your pictures. Give it a try..'}
            </p>
            <div className="align-center">
                <div className="align-center shadow-5 form">
                    <input placeholder="Enter link to your image" type="text" className="pa3 br-pill link-image w-60 f5"/>
                    <button className="detect-button grow">DETECT</button>
                </div>
            </div>
        </div>
    )
}

export default ImageLinkForm;