import { Context } from "@/components/Context/Context";
import { useContext } from "react";

function Step1({ onClick, }: any) {
  const { userType, setUserType } = useContext(Context);

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserType(e.target.value);
  };

  return (
    <div
      style={{
        width:'80%',
        margin:'0px auto',
        padding: "40px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <h2>Are you a seller:</h2>
      <div
        style={{
          display: "flex",
          gap: "14px",
          marginTop: "20px",
          width: "100%",
        }}
      >
        <label style={labelStyle}>
          <input
            type="radio"
            name="userType"
            value="seller"
            onChange={handleRadioChange}
            checked={userType === "seller"}
          />
          Yes
        </label>
        <label style={labelStyle}>
          <input
            type="radio"
            name="userType"
            value="buyer"
            onChange={handleRadioChange}
            checked={userType === "buyer"}
          />
          No
        </label>
      </div>
      <div style={{display:'flex',justifyContent:'end'}}>
            <button onClick={() => onClick(userType)} style={btnStyle}>Next</button>
    </div>
    
    </div>
  );
}

export default Step1;

const labelStyle = {
  padding: "10px",
  border: "1px solid #DCE4E8",
  borderRadius: "10px",
  display: "flex",
  alignItems: "center",
  gap: "11px",
  fontSize: "16px",
  fontWeight: "600",
  background: "#00000001",
  cursor: "pointer",
  width: "50%",
};

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
