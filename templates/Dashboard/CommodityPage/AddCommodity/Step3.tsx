import { Context } from "@/components/Context/Context";
import styles from "./AddCommodity.module.sass";
import Select from "@/components/Select";
import getUsers from "pages/api/getUsers";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

function Step3({ onClick,onPrevious }: any) {
    const { userCard, setUserCard } = useContext(Context);
    const [users, setUsers] = useState<any[]>([]);

    const fetchUserData = async () => {
        try {
            const userData = (await getUsers()) || [];
            setUsers(userData);
        } catch (error) {
            console.error("Error fetching users:", error);

        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    const handleNextClick = () => {
        if (userCard) {
            onClick();
        } else {
            toast.error('Please select a user.');
        }
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
            <h2>Select the user</h2>
            <div
                style={{
                    display: "flex",
                    gap: "14px",
                    width: "100%",
                    marginTop: "20px",
                }}
            >
                <Select
                    title="Select the user"
                    classToggle={styles.toggleSelect}
                    style={{ width: "100%" }}
                    value={userCard}
                    onChange={(e) => setUserCard(e)}
                    options={users.map((user) => ({ title: user.userName, value: user.email }))}
                />
            </div>
            <div style={{display:'flex',justifyContent:'end'}}>
            <button style={btnStyle} onClick={onPrevious}>Previous</button>
            <button style={btnStyle} onClick={handleNextClick}>Next</button>
    </div>
    
        </div>
    );
}

export default Step3;

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
  
