import React, { useContext } from 'react';
import Field from "@/components/Field";
import { Context } from "@/components/Context/Context";

const Step4 = ({ onClick,onPrevious }: any) => {
  const { type, setType, quantity, setQuantity, otherParticularities, setOtherParticularities, value, setValue } = useContext(Context);

  const handleNextClick =()=>{
    if (type && quantity && otherParticularities && value) {
      onClick();
  } 
  }
  return (
    <div style={{
      width:'80%',
      margin:'0 auto',
      padding: "40px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    }}>
      <h1 style={{ fontSize: '24px', color: '#000',width:'100%',margin:'0px auto 15px' }}>Object of the Contract</h1>
      <div style={{
        width:'100%',
        margin:'0 auto',
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        gap:'30px',
    }}>
        <div style={{width:'100%'}}>

        <Field
          placeholder="Enter contract type"
          value={type}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setType(e.target.value)}
          required
        />
        <br/>
        <Field
          placeholder="Enter contract quantity"
          value={quantity}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuantity(e.target.value)}
          required
        />
        </div>
        <div style={{width:'100%'}}>

        <Field
          placeholder="Enter contract value"
          value={value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
          required
        />
        <br/>

        <Field
          placeholder="Enter other contract particulars"
          value={otherParticularities}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOtherParticularities(e.target.value)}
        />
        </div>   
    </div>

    <div style={{display:'flex',justifyContent:'end'}}>
            <button style={btnStyle} onClick={onPrevious}>Previous</button>
            <button style={btnStyle} onClick={handleNextClick}>Next</button>
    </div>
    
    </div>
    
  );
}

export default Step4;

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

