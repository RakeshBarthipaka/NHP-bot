import { Avatar, Box, Button, ButtonGroup, Grid, Stack } from "@mui/material";
import styles from "./KeywordAnalysis.module.css";
import TroubleshootIcon from "@mui/icons-material/Troubleshoot";
import { Icon, IconButton } from "@fluentui/react";
import { GenerateTable } from "../Tables/GenerateTable";
import { GridColDef, DataGrid, GridCellParams } from "@mui/x-data-grid";
import { cp } from "fs";
import clsx from "clsx";
import DownloadPDF from "../Answer/GeneratePDF";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import StackedBarChart from "../BarChart/BarChart";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import SortOutlinedIcon from "@mui/icons-material/SortOutlined";
import KeywordList from "./KeywordList";

interface Props {
    tagName: string;
}

export const KeywordAnalysis = ({ tagName }: Props) => {
    console.log(tagName, "tagggg");

    const shareIconStyles = {};

    const IconStyles = { color: "blue", borderRadius: "8px" };
    const IconActiveStyles = { backgroundColor: "lightgray", borderRadius: "8px" };

    function copyTableToClipboard() {
        window?.getSelection()?.removeAllRanges();
        let range = document.createRange();
        const gridContainer: any = document.querySelector(".forMakingPdf");
        range.selectNode(gridContainer);
        window?.getSelection()?.addRange(range);
        document.execCommand("copy");
        window?.getSelection()?.removeAllRanges();
    }

    const downloadAsPdf = () => {
        const gridContainer: any = document.querySelector(".forMakingPdf");

        html2canvas(gridContainer).then(canvas => {
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF();
            const imgWidth = 210; // A4 size
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
            pdf.save("datagrid.pdf");
        });
    };

    return (
        <Grid xs={12} padding={3}>
            <div
                className="forMakingPdf"
                style={{
                    width: "100%",
                    paddingBottom: "24px"
                }}
            >
                <Box paddingLeft={3} paddingBottom={2} className={styles.header}>
                    {" "}
                    <TroubleshootIcon className={styles.headerIcon} /> <span className={styles.headerText}>KEYWORD ANALYSIS</span>{" "}
                </Box>
                <Box paddingBottom={2}>
                    <hr className={styles.verticalLineStyle} />
                </Box>

                <Box paddingLeft={3} paddingTop={4}>
                    <Stack
                        className="stackShareOptions"
                        direction="row"
                        alignContent="center"
                        alignItems="center"
                        justifyContent="space-between"
                        justifyItems={"center"}
                        paddingLeft={2}
                        sx={{
                            padding: "15px 15px"
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                gap: "10px"
                            }}
                        >
                            <ButtonGroup
                                disableElevation
                                size="small"
                                variant="contained"
                                aria-label="Disabled button group"
                                style={{
                                    borderRadius: "10px",
                                    border: "1px"
                                }}
                            >
                                <Button>{tagName}</Button>
                                <Button variant="outlined">5</Button>
                            </ButtonGroup>
                        </Box>

                        <Box>
                            {/* <p className={styles.headerText}>The keyword ‘Market’ is linked to 12 questions. </p> 
<span className={styles.subHeaderText}>Please have a quick review each question and you may get the answer what you are looking for.</span> */}
                            The keyword ‘Market’ is linked to 12 questions. Please have a quick review each question and you may get the answer what you are
                            looking for.
                        </Box>

                        {/* <Box
                            sx={{
                                display: "flex"
                            }}
                        >
                            <span onClick={copyTableToClipboard}>
                                <Avatar
                                   sx={{ bgcolor: "#E1E5F2",
                                   color: "rgba(12, 9, 156, 1)", "&:hover": {
                                              backgroundColor: "#0027B0",
                                                  color: ' rgba(30, 255, 241, 0.8)'
                                              
                                          } }}
                                >
                                    <ContentCopyOutlinedIcon/>
                                </Avatar>
                            </span>

                            <span onClick={downloadAsPdf}>
                                <Avatar sx={{ bgcolor: "#E1E5F2",
                                 color: "rgba(12, 9, 156, 1)", "&:hover": {
                                            backgroundColor: "#0027B0",
                                                color: ' rgba(30, 255, 241, 0.8)'
                                            
                                        } }}>
                                    {" "}
                                    <FileDownloadOutlinedIcon />
                                </Avatar>
                            </span>
                            <span onClick={() => {}}>
                                <Avatar sx={{ bgcolor: "#E1E5F2",
                                 color: "rgba(12, 9, 156, 1)", "&:hover": {
                                            backgroundColor: "#0027B0",
                                                color: ' rgba(30, 255, 241, 0.8)'
                                            
                                        } }}>
                                    <ShareOutlinedIcon  />
                                </Avatar>
                            </span>
                        </Box> */}
                    </Stack>
                    <hr className={styles.verticalLineStyle} />
                    <Stack alignContent="center" alignItems="center" justifyItems={"center"} justifyContent={"end"} direction={"row"}>
                        <Box display={"flex"} justifyContent={"center"}>
                            <span className={styles.iconText}>
                                <VisibilityOutlinedIcon />
                            </span>
                            <span className={styles.iconText}>By Views</span>
                            <span className={styles.iconText}>
                                <SortOutlinedIcon />
                            </span>
                            <span className={styles.iconText}>By Date</span>
                        </Box>
                    </Stack>
                </Box>
                <Box paddingLeft={3} paddingTop={4}>
                    <KeywordList />
                </Box>
            </div>
        </Grid>
    );
};
