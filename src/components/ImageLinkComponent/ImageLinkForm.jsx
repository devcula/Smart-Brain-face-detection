import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onButtonSubmit })=>{
    return (
        <div style={{textAlign: "center"}}>
            <p className="f3 white">
                {'This Magic Brain will detect faces in your pictures. Give it a try..'}
            </p>
            <div className="align-center pa4">
                <div className="align-center shadow-5 form">
                    <input 
                    placeholder="Enter link to your image" 
                    type="text" 
                    className="pa3 br-pill link-image w-60 f5" 
                    onChange={onInputChange}
                    />
                    <button 
                    className="detect-button grow" 
                    onClick={onButtonSubmit}>
                        DETECT
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ImageLinkForm;