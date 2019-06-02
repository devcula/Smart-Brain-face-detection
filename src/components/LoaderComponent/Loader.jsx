import React from "react";
import './Loader.css'
import { css } from '@emotion/core';
import { GridLoader } from 'react-spinners';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

const Loader = ({loading}) =>{
    if(loading){
        return (
            <div className='overlay'>
              <div className='sweet-loading middle'>
                <GridLoader
                  css={override}
                  sizeUnit={"px"}
                  size={30}
                  color={'#888888'}
                  loading={loading}
                />
              </div>
            </div>
        )
    }
    else{
        return null;
    }
}

export default Loader;