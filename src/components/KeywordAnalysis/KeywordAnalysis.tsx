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
    const shareIconStyles = {};

    const IconStyles = { color: "blue", borderRadius: "8px" };
    const IconActiveStyles = { backgroundColor: "lightgray", borderRadius: "8px" };

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
                            The keyword ‘Market’ is linked to 12 questions. Please have a quick review each question and you may get the answer what you are
                            looking for.
                        </Box>

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
