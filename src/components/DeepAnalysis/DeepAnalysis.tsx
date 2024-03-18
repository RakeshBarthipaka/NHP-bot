import { Avatar, Box, Button, ButtonGroup, Grid, Stack } from "@mui/material";
import TroubleshootOutlinedIcon from "@mui/icons-material/TroubleshootOutlined";
import { Icon, IconButton } from "@fluentui/react";
import { GenerateTable } from "../Tables/GenerateTable";
import { GridColDef, DataGrid, GridCellParams, GridRenderCellParams } from "@mui/x-data-grid";
import { cp } from "fs";
import clsx from "clsx";
import DownloadPDF from "../Answer/GeneratePDF";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import StackedBarChart from "../BarChart/BarChart";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useState } from "react";
import "./DeepAnalysis.scss";

// interface Props {
//     text: string;
//     // value: string;
//     // onClick: (value: string) => void;
// }

const getColor = (value: any) => {
    if (Number(value.replace("%", "")) > 20) {
        return " rgba(50, 215, 75, 1)";
    }
    if (Number(value.replace("%", "")) > 0 && Number(value.replace("%", "")) < 20) {
        return "inherit";
    }

    if (Number(value.replace("%", "")) < 0) {
        return "rgba(255, 69, 58, 1)";
    }
};

export const DeepAnalysis = () => {
    const [isValue, setIsValue] = useState<boolean>(false);
    const columns: GridColDef[] = [
        {
            field: "Country",
            headerName: "Country",
            sortable: false,
            width: 130,
            disableColumnMenu: true,
            cellClassName: (params: GridCellParams<any, number>) => {
                if (params.value == null) {
                    return "";
                }

                return clsx("first-column", {
                    cell: true
                });
            }
        },
        {
            field: "2019",
            headerName: "2019",
            sortable: false,
            width: 130,
            disableColumnMenu: true,
            renderCell: (params: GridRenderCellParams) => {
                const color: any = getColor(params.value);

                return (
                    <Box
                        sx={{
                            color: color
                        }}
                    >
                        {params.value}
                    </Box>
                );
            }
        },
        {
            field: "2020",
            headerName: "2020",
            sortable: false,
            width: 130,
            disableColumnMenu: true,
            renderCell: (params: GridRenderCellParams) => {
                const color: any = getColor(params.value);

                return (
                    <Box
                        sx={{
                            color: color
                        }}
                    >
                        {params.value}
                    </Box>
                );
            }
        },
        {
            field: "2021",
            headerName: "2021",
            sortable: false,
            width: 130,
            disableColumnMenu: true,
            renderCell: (params: GridRenderCellParams) => {
                const color: any = getColor(params.value);

                return (
                    <Box
                        sx={{
                            color: color
                        }}
                    >
                        {params.value}
                    </Box>
                );
            }
        },
        {
            field: "2022",
            headerName: "2022",
            sortable: false,
            width: 130,
            disableColumnMenu: true,
            renderCell: (params: GridRenderCellParams) => {
                const color: any = getColor(params.value);

                return (
                    <Box
                        sx={{
                            color: color
                        }}
                    >
                        {params.value}
                    </Box>
                );
            }
        },
        {
            field: "2023",
            headerName: "2023",
            sortable: false,
            width: 130,
            disableColumnMenu: true,
            renderCell: (params: GridRenderCellParams) => {
                const color: any = getColor(params.value);

                return (
                    <Box
                        sx={{
                            color: color
                        }}
                    >
                        {params.value}
                    </Box>
                );
            }
        }
    ];

    const rows = [
        { id: 1, Country: "India", 2019: "15", 2020: "10", 2021: "43", 2022: "77", 2023: "36" },
        { id: 2, Country: "India", 2019: "28", 2020: "10", 2021: "-43", 2022: "77", 2023: "36" },
        { id: 3, Country: "India", 2019: "-10", 2020: "10", 2021: "43", 2022: "77", 2023: "36" },
        { id: 4, Country: "India", 2019: "33", 2020: "-10", 2021: "43", 2022: "-77", 2023: "36" },
        { id: 5, Country: "India", 2019: "22", 2020: "10", 2021: "43", 2022: "77", 2023: "36" },
        { id: 6, Country: "India", 2019: "-64", 2020: "10", 2021: "43", 2022: "77", 2023: "-36" },
        { id: 7, Country: "India", 2019: "56", 2020: "10", 2021: "43", 2022: "77", 2023: "36" }
    ];

    const rowsPercentage = [
        { id: 1, Country: "India", 2019: "15%", 2020: "10%", 2021: "43%", 2022: "77%", 2023: "36%" },
        { id: 2, Country: "India", 2019: "28%", 2020: "10%", 2021: "-43%", 2022: "77%", 2023: "36%" },
        { id: 3, Country: "India", 2019: "-10%", 2020: "10%", 2021: "43%", 2022: "77%", 2023: "36%" },
        { id: 4, Country: "India", 2019: "33%", 2020: "-10%", 2021: "43%", 2022: "-77%", 2023: "36%" },
        { id: 5, Country: "India", 2019: "22%", 2020: "10%", 2021: "43%", 2022: "77%", 2023: "36%" },
        { id: 6, Country: "India", 2019: "-64%", 2020: "10%", 2021: "43%", 2022: "77%", 2023: "-36%" },
        { id: 7, Country: "India", 2019: "56%", 2020: "10%", 2021: "43%", 2022: "77%", 2023: "36%" }
    ];

    const summary = [
        {
            text: "India has shown fluctuation with significant declines in 2020 and subsequent improvement in the following years."
        },
        {
            text: "Mexico has shown a consistant increase in UOM over the years."
        },
        {
            text: "China’s UOM has shown some variability, with an overall decrease in 2022."
        },
        {
            text: "Thailand has shown some generally increasing trend in UOM with slight decline in 2022."
        }
    ];

    const copyChatData = async (e: any) => {
        e.stopPropagation();
        navigator.clipboard.writeText("tessss");
    };

    function copyTableToClipboard() {
        window?.getSelection()?.removeAllRanges();
        let range = document.createRange();
        const gridContainer: any = document.querySelector(".forMakingPdfDA");
        range.selectNode(gridContainer);
        window?.getSelection()?.addRange(range);
        document.execCommand("copy");
        window?.getSelection()?.removeAllRanges();
    }

    const downloadAsPdf = () => {
        const gridContainer: any = document.querySelector(".forMakingPdfDA");

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
        <Grid xs={12}>
            <div className="forMakingPdfDA">
                <Box paddingLeft={3} paddingBottom={2} className="headerDA">
                    {" "}
                    <TroubleshootOutlinedIcon className="headerIcon" /> <span className="headerText">DEEP ANALYSIS</span>{" "}
                </Box>
                <Box paddingBottom={2}>
                    <hr className="verticalLineStyle" />
                </Box>

                <Box paddingLeft={2}>
                    <span>Country UOM details for the last 5 years</span>
                </Box>

                <Box paddingLeft={3} paddingTop={4}>
                    <Stack
                        className="stackShareOptionsDA"
                        direction="row"
                        alignContent="center"
                        alignItems="center"
                        justifyContent="space-between"
                        paddingLeft={2}
                    >
                        <Box display={"flex"} gap={2}>
                            <ButtonGroup
                                disableElevation
                                size="small"
                                variant="contained"
                                aria-label="button group"
                                className="keywordBtnGrpDA"
                                sx={{
                                    "& .secondButtonDA": {
                                        marginLeft: isValue ? "3px" : "6px",
                                        marginRight: isValue ? "6px" : "6px"
                                    },
                                    "& .firstButtonDA": {
                                        marginLeft: isValue ? "3px" : "6px",
                                        marginRight: isValue ? "6px" : "3px"
                                    }
                                }}
                            >
                                <Button onClick={() => setIsValue(false)} className={isValue ? "secondButtonDA" : "firstButtonDA"}>
                                    %
                                </Button>
                                <Button onClick={() => setIsValue(true)} className={isValue ? "firstButtonDA" : "secondButtonDA"}>
                                    Value
                                </Button>
                            </ButtonGroup>
                            {/* <ButtonGroup
                                disableElevation
                                size="small"
                                variant="contained"
                                aria-label="Disabled button group"
                                className="disabledButtonStyle"
                                disabled
                            >
                                <Button>USD</Button>
                                <Button variant="outlined">Local</Button>
                            </ButtonGroup> */}
                        </Box>

                        <Box display="flex">
                            <span onClick={copyTableToClipboard}>
                                <Avatar
                                    className="avatarDA"
                                >
                                    <ContentCopyOutlinedIcon />
                                </Avatar>
                            </span>

                            <span onClick={downloadAsPdf}>
                                <Avatar
                                    className="avatarDA"
                                >
                                    {" "}
                                    <FileDownloadOutlinedIcon />
                                </Avatar>
                            </span>
                        </Box>
                    </Stack>

                    <DataGrid
                        hideFooter
                        className="deepAnalysisTable"
                        rows={isValue ? rows : rowsPercentage}
                        columns={columns}
                        disableRowSelectionOnClick
                        disableColumnFilter
                        hideFooterSelectedRowCount
                        hideFooterPagination
                    />
                </Box>
                <Box paddingLeft={2} paddingTop={3}>
                    <span>In summary the yearly trend UOM in </span>
                </Box>
                <Box paddingLeft={4} paddingTop={2}>
                    {summary?.map(data => <li className="summary">{data.text}</li>)}
                </Box>
                <Box paddingLeft={4} paddingTop={2}>
                    <span>Graph Analytics by Region </span>
                    <StackedBarChart />
                </Box>
            </div>
        </Grid>
    );
};
