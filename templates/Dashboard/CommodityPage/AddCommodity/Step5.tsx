
import { Context } from '@/components/Context/Context';
import React, { useContext } from 'react';

const Step5 = ({ onClick,onPrevious }: any ) => {
    const { userType, commodityType, type, quantity, value, otherParticularities, userCard } = useContext(Context);

    return (
        <div style={{
            width:'80%',
            margin:'0 auto',
            padding: "40px",
        }}>
            <h1 style={{ fontSize: '24px', color: '#000',marginBottom:'1rem', width: '100%' }}>Contract Data</h1>
            <p style={{ marginBottom: 10 }}><strong>Type:</strong> {type || 'No Type Defined'}</p>
            <p style={{ marginBottom: 10 }}><strong>Quantity:</strong> {quantity || '0'}</p>
            <p style={{ marginBottom: 10 }}><strong>Value:</strong> {value || '0'}</p>
            <p style={{ marginBottom: 10 }}><strong>User Email:</strong> {userCard || 'None'}</p>
            <p style={{ marginBottom: 10 }}><strong>User Type:</strong> {userType || 'None'}</p>
            <p style={{ marginBottom: 10 }}><strong>Other Particularities:</strong> {otherParticularities || 'None'}</p>
            <p style={{ marginBottom: 10 }}><strong>Commodity Type:</strong> {commodityType || 'None'}</p>

            <div style={{display:'flex',justifyContent:'end'}}>
                <button style={btnStyle} onClick={onPrevious}>Previous</button>
                <button style={btnStyle} onClick={onClick}>Next</button>
            </div>
        </div>
    );
}

export default Step5;

const btnStyle = {
    width: "fit-content",
    marginTop: "64px",
    display: "grid",
    alignSelf: "end",
    padding: "20px 20px",
    background: "#31B099",
    color: "white",
    borderRadius: "4px",
    fontSize: "18px",
    marginLeft:'20px'
};
