import React from 'react'
import { ThreeDots } from 'react-loader-spinner';

 const Loader = ({height,width}:any) => {
    return (
            <ThreeDots
                visible={true}
                height={height}
                width={width}
                color="#31B099"
                ariaLabel="three-dots-loading"
            />
            
    );
};

export default Loader
