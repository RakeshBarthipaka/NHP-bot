import React, { useState } from "react";
import "./Uploads.scss";

import { Document, Page, pdfjs } from 'react-pdf';
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
import { Avatar, Button, ButtonGroup, Drawer, Stack, Toolbar } from "@mui/material";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import SortOutlinedIcon from "@mui/icons-material/SortOutlined";
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import StackedBarChart from "../BarChart/BarChart";
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import CropOutlinedIcon from '@mui/icons-material/CropOutlined';
import pdfFile from '../../assets/uploadedFileView.pdf'

const Uploads = (props: any) => {
    const pdfUrl = pdfFile;
    const [uploadFileViewer, setUploadFileViewer] = useState(false);
    const [numPages, setNumPages] = useState<number | null>(null);
    const [scale, setScale] = useState<number>(1.0);
    const [containerWidth, setContainerWidth] = useState<number>(250);

    function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
        setNumPages(numPages);
    }

    function calculatePageWidth() {
        // Default width of each page
        const defaultPageWidth = 540; // You can adjust this value as needed
        // Calculate the width for the PDF pages based on the container width and scale
        const pageWidth = containerWidth * (scale || 1);
        // If the calculated width is less than the default width, use the default width
        return Math.max(pageWidth, defaultPageWidth);
    }

    const card = (
        <>
            <CardContent className="upload-outer-box" >
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
            <Box className="file-row" onClick={() => {setUploadFileViewer(true)}}>
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
            <Box className="upload-container" sx={{ boxShadow: "none"}}> 
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
                    {/* <Box className="file-count">
                        <span>
                        Total no.of topics &nbsp;
                        </span>
                        <Box>8</Box>
                    </Box> */}
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center"
                        }}
                    >
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
                {/* <Box className="file-count">                   
                        <span>Total no.of files</span> &nbsp;<Box>8</Box>
                    </Box> */}
                </Box>
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

            <Drawer
                anchor='right'
                open={uploadFileViewer}
                onClose={() => setUploadFileViewer(false)}  >

                <div>
                    <Toolbar className="drawerHeader">
                        <DescriptionOutlinedIcon />
                        <Typography variant="h6" noWrap component="div"> Data Source View </Typography>
                    </Toolbar>
                    <div className="uploadedFileViewDiv">
                        <Stack className="stackDataOptions">
                            <Box display={"flex"} gap={1}>
                                unilever_chat_1706852987594.pdf
                            </Box>
                            <Box display={"flex"} >
                                <span >
                                    <Avatar className="iconsBtns">
                                        <ContentCopyOutlinedIcon />
                                    </Avatar>
                                </span>

                                <span >
                                    <Avatar className="iconsBtns">
                                        <FileDownloadOutlinedIcon />
                                    </Avatar>
                                </span>
                                <span >
                                    <Avatar className="iconsBtns">
                                        <CropOutlinedIcon />
                                    </Avatar>
                                </span>

                            </Box>
                        </Stack>
                        <div className="uploadedFileView">
                            <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
                                {Array.from(new Array(numPages || 0), (_, index) => (
                                    <Page
                                        key={`page_${index + 1}`}
                                        pageNumber={index + 1}
                                        width={calculatePageWidth()} // Adjust the width dynamically
                                        scale={scale}
                                        // className={styles.pdfPage}
                                        data-page-number={index + 1}
                                        customTextRenderer={() => null || ""}
                                    />
                                ))}
                            </Document>
                        </div>
                    </div>
                </div>
            </Drawer>

        </>
    );
};

export default Uploads;
