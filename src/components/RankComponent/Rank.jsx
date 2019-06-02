import React from 'react';

const Rank = ({currentUser})=> {
    return (
        <div style={{textAlign: "center"}}>
            <div className="white f2">
                {`Hello ${currentUser.name}, number of faces that you have detected so far is...`}
            </div>
            <div className="f1 white">
                {currentUser.entries}
            </div>
        </div>
    )
}

export default Rank;