import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Grid } from "@mui/material";
import styles from "./Chat.module.css";
import { useSelector } from "react-redux";


const UserLocationSave = () => {
    const [location, setLocation] = useState("");
    const [loading, setLoading] = useState(false);
    let userLocation = localStorage.getItem("userLocation") ? localStorage.getItem("userLocation") : "";
    const { colorCode } = useSelector((state: any) => state.theme.color);

    const handleSubmit = () => {
        setLoading(true)
        localStorage.setItem("userLocation", location);
    };

    useEffect(() => {
        setLoading(false)
    }, [userLocation]);

    return (
        <>
            {!userLocation && (
                <div className={styles.userLocation}>
                    <div style={{ display: "flex", alignItems: "center", flexDirection: "column", gap: "10px" }}>
                        <Typography variant="h6" style={{ color: "white" }}> Save your location & continue</Typography>
                        <TextField
                            label="Enter Location"
                            variant="filled"
                            fullWidth
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            style={{ background: "white" }}
                        />
                        <Button variant="contained" style={{background:colorCode}}  onClick={handleSubmit} disabled={loading}>
                            {loading ? "Saving..." : "Save"}
                        </Button>
                    </div>
                </div>
            )
            }
        </>
    );
};

export default UserLocationSave;
