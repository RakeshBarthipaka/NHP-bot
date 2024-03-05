import React from "react";
import "./Uploads.scss";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import UploadsIcon from "../../assets/images/Uploads.svg";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import PictureAsPdfOutlinedIcon from "@mui/icons-material/PictureAsPdfOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
//import SearchBar from "./SearchBar";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import SearchBar from "../Common/SearchBar";

const Uploads = (props: any) => {
    const card = (
        <>
            <CardContent>
                <Box className="upload-box">
                    <Box className="plus-icon-cont">
                        <AddIcon />
                    </Box>
                    <Typography sx={{ color: "#000000" }}>
                        Drag and Drop or Browse to<span style={{ color: "#0C099C" }}>Upload a File</span>
                    </Typography>
                    <Typography className="allowed-text">Allowed Formats: PDF</Typography>
                </Box>
            </CardContent>
        </>
    );

    const fileItems = (
        <>
            <Box className="file-row">
                <Typography sx={{ color: "#0027B0", display: "flex", fontSize: "14px" }}>
                    <PictureAsPdfOutlinedIcon sx={{ color: "#EB5757" }} />
                    &nbsp;unilever_chat_1706852987594.pdf
                </Typography>
                <Typography sx={{ color: "#5376F0", fontSize: "12px" }}>10 min ago</Typography>
                <DeleteOutlinedIcon sx={{ color: "#0C099C" }} />
            </Box>
        </>
    );
    return (
        <>
            <Box className="upload-container">
                <Box className="upload-heading">
                    {/* <img src={UploadsIcon} alt="Uploads" /> */}
                    <CloudUploadOutlinedIcon />
                    <h3 className="disply-page-title">UPLOADS & ATTACHMENTS</h3>
                </Box>
                <Divider />
                <Card variant="outlined" sx={{ marginTop: "10px", backgroundColor: "#F2F2F7" }}>
                    {card}
                </Card>
                <Divider sx={{ marginTop: "10px", marginBottom: "10px", borderColor: "#5376F0" }} />
                <Box className="search-row">
                    <SearchBar />
                    <Box className="file-count">
                        Total no.of files &nbsp;<Box>8</Box>
                    </Box>
                </Box>
                {fileItems}
                {fileItems}
                {fileItems}
                {fileItems}
                {fileItems}
                {fileItems}
                {fileItems}
                {fileItems}
                {fileItems}
            </Box>
        </>
    );
};

export default Uploads;
