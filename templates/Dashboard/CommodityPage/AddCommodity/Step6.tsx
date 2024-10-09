import { Context } from '@/components/Context/Context';
import React, { useContext } from 'react';

const Step6 = () => {
    const { setCreateCommidity } = useContext(Context);

    const handleChange = () => {
        setCreateCommidity(true);
    }

    return (
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <button style={btnStyle} onClick={handleChange}  >Submit</button>
        </div>
    );
}

export default Step6;

const btnStyle = {
    width: "200px",
    marginTop: "64px",
    display: "grid",
    alignSelf: "end",
    padding: "15px 15px",
    background: "#31B099",
    color: "white",
    borderRadius: "4px",
    fontSize: "18px",
    marginLeft:'20px'
};
