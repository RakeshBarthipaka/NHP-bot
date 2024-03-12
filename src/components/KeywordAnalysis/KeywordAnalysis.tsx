import { Avatar, Box, Button, ButtonGroup, Grid, Stack } from "@mui/material";
import "./KeywordAnalysis.scss";
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
    return (
        <Grid xs={12} padding={3}>
            <div className="forMakingPdf">
                <Box paddingLeft={3} paddingBottom={1} className="headerKA">
                    {" "}
                    <TroubleshootIcon className="headerIcon" /> <span className="headerText">KEYWORD ANALYSIS</span>{" "}
                </Box>
                <Box>
                    <hr className="verticalLineStyle" />
                </Box>

                <Box paddingLeft={3} paddingTop={2}>
                    <Stack
                        className="stackShareOptions"
                        direction="row"
                        alignContent="center"
                        alignItems="center"
                        justifyContent="space-between"
                        justifyItems={"center"}
                        paddingLeft={2}
                        gap={2}
                    >
                        <Box display={"flex"} gap={2}>
                            <ButtonGroup disableElevation size="small" variant="contained" aria-label="Disabled button group" className="keywordBtnGrp">
                                <Button className="firstButton">{tagName}</Button>
                                <Button className="secondButton" variant="outlined">
                                    5
                                </Button>
                            </ButtonGroup>
                        </Box>

                        <Box>
                            The keyword ‘Market’ is linked to 12 questions. Please have a quick review each question and you may get the answer what you are
                            looking for.
                        </Box>
                    </Stack>
                    <Box paddingTop={2}>
                        <hr className="verticalLineStyle" />
                    </Box>
                    <Stack alignContent="center" alignItems="center" justifyItems={"center"} justifyContent={"end"} direction={"row"}>
                        <Box display={"flex"} justifyContent={"center"}>
                            <span className="iconText">
                                <VisibilityOutlinedIcon />
                            </span>
                            <span className="iconText">By Views</span>
                            <span className="iconText">
                                <SortOutlinedIcon />
                            </span>
                            <span className="iconText">By Date</span>
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
