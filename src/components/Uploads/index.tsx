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
import { Button, ButtonGroup } from "@mui/material";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import SortOutlinedIcon from "@mui/icons-material/SortOutlined";
const Uploads = (props: any) => {
    const card = (
        <>
            <CardContent className="upload-outer-box">
                <Box className="upload-box">
                    <Box className="plus-icon-cont">
                        <AddIcon />
                    </Box>
                    <Typography sx={{ color: "#000000" }}>
                        Drag and Drop or Browse to<span style={{ color: "var(--active-themes)" }}>Upload a File</span>
                    </Typography>
                    <Typography className="allowed-text">Allowed Formats: PDF</Typography>
                </Box>
            </CardContent>
        </>
    );

    const fileItems = (
        <>
            <Box className="file-row">
                <Typography sx={{ display: "flex", fontSize: "14px" }}>
                    <PictureAsPdfOutlinedIcon className="pdf-icon" />
                    &nbsp;unilever_chat_1706852987594.pdf
                </Typography>
                <Typography sx={{ color: "var(--active-themes)", fontSize: "12px" }}>10 min ago</Typography>
                <DeleteOutlinedIcon className="delete-icon" />
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
              
                <Card>
                    {card}
                </Card>
                <br></br>
           
                <Divider sx={{ marginTop: "10px", marginBottom: "10px", borderColor: "var(--active-themes)" }} />
               
                <Box sx={{ display: 'flex' }}>
                <Box className="search-row">
                    <SearchBar />
                   
                </Box>
                <ButtonGroup className="mui-custom-toggle" variant="outlined" aria-label="Basic button group">
                    <Button className="mui-toggle-active">
                        <span className="iconText">
                            <RemoveRedEyeOutlinedIcon className="viewIcon IconElemt" />
                        </span>
                        <span>By Views</span>
                    </Button>
                    <Button>
                        <span className="iconText">
                            <SortOutlinedIcon className="ShortByIcon IconElemt" />
                        </span>
                        <span>By Date</span>
                    </Button>
                </ButtonGroup>
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
