import React from 'react';

const Rank = ({state})=> {
    return (
        <div style={{textAlign: "center"}}>
            <div className="white f2">
                {`Hello ${state.currentUser.name}, number of faces that you have detected so far is...`}
            </div>
            <div className="f1 white">
                {state.currentUser.entries}
            </div>
        </div>
    )
}

export default Rank;