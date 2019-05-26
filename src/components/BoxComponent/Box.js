import React from 'react';
import './Box.css'

const Box = ({ box }) => {
    return (
        <div
            className="bounding-box"
            style={{ top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol }}>
        </div>
    )
}

export default Box;