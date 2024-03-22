import React, { useCallback, useEffect, useState } from "react";
import "./Uploads.scss";

import { Document, Page, pdfjs } from "react-pdf";
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
import { deleteApiFile, postApiFiles, fileUpload, getApiDownload } from "../../api";
import { format, parseISO } from "date-fns";
import { Avatar, Drawer, Toolbar } from "@mui/material";
import { Stack } from "@fluentui/react";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

import ControlPointIcon from "@mui/icons-material/ControlPoint";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import SortOutlinedIcon from "@mui/icons-material/SortOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import StackedBarChart from "../BarChart/BarChart";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import CropOutlinedIcon from "@mui/icons-material/CropOutlined";
import pdfFile from "../../assets/uploadedFileView.pdf";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useDropzone } from "react-dropzone";

const Uploads = (props: any) => {
    const [UploadFileList, setUploadFileList] = useState<any>([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [deleteFileID, setDeleteFileID] = useState(false);
    const [isFileDeleted, setIsFileDeleted] = useState(false);
    const [selectedFile, setSelectedFile] = useState("");
    const [loading, setLoading] = useState(false);
    const [searchKey, setSearchKey] = useState<string>("");

    const pdfUrl = pdfFile;
    const [uploadFileViewer, setUploadFileViewer] = useState(false);
    const [numPages, setNumPages] = useState<number | null>(null);
    const [scale, setScale] = useState<number>(1.0);
    const [containerWidth, setContainerWidth] = useState<number>(250);
    const [dataID, setDataID] = useState("");
    const [dataFilename, setDataFilename] = useState("");
    const [pdfUrlData, setPdfUrlData] = useState("");
    const [openSnackBar, setOpenSnackBar] = useState(false);
    const [snackBarText, setSnackBarText] = useState("");
    const [severity, setSeverity] = useState<any>("info");
    const { acceptedFiles, open, getRootProps, getInputProps } = useDropzone({
        accept: {
            "application/pdf": [".pdf"]
        },
        onDropAccepted: (acceptedFiles: any) => {
            handleFileChange(acceptedFiles);
            console.log(acceptedFiles);
        },
        noClick: true,
        noKeyboard: true
    });

    const Dropedfiles = acceptedFiles.map((file: any) => (
        <li key={file.path}>
            {file.path} - {file.size} bytes
        </li>
    ));

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

    function copyTableToClipboard() {
        window?.getSelection()?.removeAllRanges();
        let range = document.createRange();
        const gridContainer: any = document.querySelectorAll(".react-pdf__Page__textContent span");
       const  ga = Array.from(gridContainer);
       // navigator.clipboard.writeText(gridContainer);
       var captionsText = ga.map(function(caption: any) {
        return caption.textContent;
      });
        navigator.clipboard.writeText(captionsText.join().replace(/,/g, '\n'));
    }

    const getUploadFileData = async () => {
        try {
            const response = await postApiFiles(
                {
                    page: 0,
                    limit: 10,
                    search_key: searchKey,
                    sort_key: "date",
                    sort_type: "asc"
                },
                "file/list/",
                {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                }
            );
            setUploadFileList(response.items);
            setIsLoaded(true);
        } catch (error) {
            setUploadFileList([""]);
        }
    };

    const deleteUploadFileData = async (id: any) => {
        try {
            const response = await deleteApiFile(`file/delete/${id}`);
            setIsLoaded(false);
        } catch (error) {
            setIsFileDeleted(false);
        }
    };

    const handleFileChange = async (file: any) => {
        const formData = new FormData();
        // formData.append("file", file);
        // const upload = await fileUpload(formData, "file/upload/");
        formData.append("file", file[0]);
        const upload: any = await fileUpload(formData, "file/upload/");
        console.log("upload:", upload);

        if (upload.status === 200) {
            setSnackBarText("File uploaded Successfully !");
            setSeverity("success");
            setOpenSnackBar(true);
        } else {
            setSnackBarText("File uploaded Faild !");
            setSeverity("error");
            setOpenSnackBar(true);
        }
    };

    const downloadPDF = async (id: any, filename: any) => {
        try {
            const response: any = getApiDownload(`file/download/${id}`);
            response.then((response: any) => {
                const url = response.url;
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", `${filename}.pdf`); //or any other extension
                document.body.appendChild(link);
                link.click();
            });
            setIsLoaded(false);
        } catch (error) {
            setIsFileDeleted(false);
        }
    };

    const viewdownloadPDF = async (id: any, filename: any) => {
        try {
            const response: any = getApiDownload(`file/download/${id}`);
            response.then((response: any) => {
                const url = response.url;
                setPdfUrlData(url);
            });

            setIsLoaded(false);
        } catch (error) {
            setIsFileDeleted(false);
        }
    };

    const handleSnackBarClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }
        setOpenSnackBar(false);
    };

    // const handleFileChange = async (event: any) => {
    //     const file = event.target.files[0];
    //     if (file.type == "application/pdf") {
    //         const formData = new FormData();
    //         formData.append("file", file);
    //         const upload = await fileUpload(formData, "file/upload/");
    //         console.log("upload:", upload);
    //     } else {
    //         console.log("Invalid file type"); //Toast message will be shown
    //     }
    // };

    useEffect(() => {
        if (!isLoaded) {
            getUploadFileData();
        }
    }, [isLoaded]);

    useEffect(() => {
        const getData = setTimeout(() => {
            getUploadFileData();
        }, 1000);

        return () => clearTimeout(getData);
    }, [isLoaded, searchKey]);

    const card = (
        <>
            <CardContent className="upload-outer-box">
                <div className="upload-box">
                    <Box {...getRootProps({ className: "dropzone" })}>
                        <Box className="plus-icon-cont" onClick={open}>
                            <AddIcon />
                        </Box>
                        <Typography sx={{ color: "#000000" }}>
                            Drag and Drop or Browse to
                            <span style={{ color: "var(--active-themes)" }}>
                                Upload a File
                                <input
                                    id="file-upload"
                                    type="file"
                                    // onChange={handleFileChange}
                                    disabled={loading}
                                    {...getInputProps()}
                                />
                            </span>
                        </Typography>
                        {selectedFile && (
                            <div>
                                {/* <p>Selected File: {selectedFile}</p> */}
                                {/* <p>Selected File: {Dropedfiles}</p> */}
                            </div>
                        )}
                        <Typography className="allowed-text">Allowed Formats: PDF</Typography>
                    </Box>
                </div>
            </CardContent>
        </>
    );

    const fileItems = (data: any) => {
        return (
            <>
                <Box
                    className="file-row"
                    onClick={() => {
                        setDataID(data?.id);
                        setDataFilename(data?.filename);
                        viewdownloadPDF(data?.id, data?.filename);
                        setUploadFileViewer(true);
                    }}
                >
                    <Typography flex={2} className="uploadedFileName">
                        <PictureAsPdfOutlinedIcon sx={{ color: "var(--active-themes)" }} />
                        {data?.filename}
                    </Typography>
                    <Typography flex={1} sx={{ color: "var(--active-themes)", fontSize: "12px" }}>
                        {format(parseISO(data?.date), "dd-MM-yyyy h:mm a")}
                    </Typography>
                    <DeleteOutlinedIcon
                        onClick={() => {
                            deleteUploadFileData(data?.id);
                        }}
                        sx={{ color: "var(--active-themes)" }}
                    />
                </Box>
            </>
        );
    };

    return (
        <>
            <Snackbar open={openSnackBar} anchorOrigin={{ vertical: "top", horizontal: "right" }} autoHideDuration={6000} onClose={handleSnackBarClose}>
                <Alert onClose={handleSnackBarClose} severity={severity} variant="filled" sx={{ width: "100%" }}>
                    {snackBarText}
                </Alert>
            </Snackbar>

            <Box className="upload-container" sx={{ boxShadow: "none" }}>
                <Box className="upload-heading">
                    {/* <img src={UploadsIcon} alt="Uploads" /> */}
                    <CloudUploadOutlinedIcon />
                    <h3 className="disply-page-title">UPLOADS & ATTACHMENTS</h3>
                </Box>
                <Divider
                    sx={{
                        border: " 1px solid var(--bg-primary-light)"
                    }}
                />
                <Card variant="outlined" sx={{ marginTop: "10px", backgroundColor: "#F2F2F7" }}>
                    {card}
                </Card>

                <Divider sx={{ marginTop: "10px", marginBottom: "10px", borderColor: "var(--active-themes)" }} />

                <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Box className="search-row">
                        <SearchBar
                            searchKey={searchKey}
                            setSearchKey={value => {
                                setSearchKey(value);
                            }}
                        />
                        <Box className="file-count">
                            Total no.of files &nbsp;<Box>{UploadFileList?.length}</Box>
                        </Box>
                    </Box>
                    <Box sx={{ flexDirection: "column" }}>{UploadFileList?.map((data: any) => fileItems(data))}</Box>
                </Box>
            </Box>

            <Drawer anchor="right" open={uploadFileViewer} onClose={() => setUploadFileViewer(false)}>
                <div>
                    <Toolbar className="drawerHeader">
                        <DescriptionOutlinedIcon />
                        <Typography variant="h6" noWrap component="div">
                            {" "}
                            Data Source View{" "}
                        </Typography>
                    </Toolbar>
                    <div className="uploadedFileViewDiv">
                        <Stack className="stackDataOptions">
                            <Box display={"flex"} gap={1}>
                                {`${dataFilename}`}
                            </Box>
                            <Box display={"flex"}>
                                <span onClick={copyTableToClipboard}>
                                    <Avatar className="iconsBtns">
                                        <ContentCopyOutlinedIcon />
                                    </Avatar>
                                </span>

                                <span>
                                    <Avatar
                                        onClick={() => {
                                            downloadPDF(dataID, dataFilename);
                                        }}
                                        className="iconsBtns"
                                    >
                                        <FileDownloadOutlinedIcon />
                                    </Avatar>
                                </span>
                                {/* <span>
                                    <Avatar className="iconsBtns">
                                        <CropOutlinedIcon />
                                    </Avatar>
                                </span> */}
                            </Box>
                        </Stack>
                        <div className="uploadedFileView">
                            <Document file={pdfUrlData} onLoadSuccess={onDocumentLoadSuccess}>
                                {Array.from(new Array(numPages || 0), (_, index) => (
                                    <Page
                                        renderTextLayer={true}
                                        renderAnnotationLayer={true}
                                        key={`page_${index + 1}`}
                                        pageNumber={index + 1}
                                        width={calculatePageWidth()} // Adjust the width dynamically
                                        scale={scale}
                                        data-page-number={index + 1}
                                        //customTextRenderer={() => null || ""}
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
