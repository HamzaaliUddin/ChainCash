import { Context } from "@/components/Context/Context";
import React, { useContext } from "react";

function Step2({ onClick,onPrevious }: any) {
  const { commodityType, setCommodityType } = useContext(Context);

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommodityType(e.target.value);
  };

  return (
    <div
      style={{
        padding: "40px",
        margin:'0px auto',
        width:'80%',
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <h2>Select the type of commodity contract to be created:</h2>
      <div
        style={{
          display: "flex",
          gap: "14px",
          width: "100%",
          marginTop: "20px",
        }}
      >
        <label style={labelStyle}>
          <input type="radio" defaultChecked name="commidityType" value="grain" onChange={handleRadioChange} checked={commodityType === "grain"} />
          Grain
        </label>
        <label style={labelStyle}>
          <input type="radio" name="commidityType" value="protein" onChange={handleRadioChange} checked={commodityType === "protein"} />
          Protein
        </label>
        <label style={labelStyle}>
          <input type="radio" name="commidityType" value="other" onChange={handleRadioChange} checked={commodityType === "other"} />
          Other
        </label>


      </div>
      <div style={{display:'flex',justifyContent:'end'}}>
            <button style={btnStyle} onClick={onPrevious}>Previous</button>
            <button style={btnStyle} onClick={onClick}>Next</button>
    </div>
    
    </div>
  );
}

export default Step2;


const labelStyle = {
  padding: "10px",
  border: "1px solid #DCE4E8",
  borderRadius: "10px",
  display: "flex",
  alignItems: "center",
  gap: "11px",
  fontSize: "16px",
  width: "100%",
  fontWeight: "600",
  background: "#00000001",
  cursor: "pointer",
}

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
