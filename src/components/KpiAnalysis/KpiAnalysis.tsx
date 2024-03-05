import { useState } from "react";
import { Avatar, Box, Button, ButtonGroup, Stack } from "@mui/material";
import styles from "./KpiAnalysis.module.css";

import TroubleshootOutlinedIcon from '@mui/icons-material/TroubleshootOutlined';

import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import StackedBarChart from "../BarChart/BarChart";
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { GridColDef, DataGrid, GridCellParams, GridRenderCellParams } from "@mui/x-data-grid";
import clsx from "clsx";

const getColor = (value: any) => {

    console.log(value, 'valueeee');
  
    if(Number(value.replace("%", "")) > 20) {
return " rgba(50, 215, 75, 1)";

    } 
    if(Number(value.replace("%", "")) > 0 && Number(value.replace("%", "")) < 20 ){
        return "inherit";
    }

    if (Number(value.replace("%", "")) < 0) {
 return "rgba(255, 69, 58, 1)";
    }

  };

const KpiAnalysis = () => {
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
                      color: color,
                    }}
                  >
                    {params.value}
                  </Box>
                );
              },
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
                      color: color,
                    }}
                  >
                    {params.value}
                  </Box>
                );
              },
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
                      color: color,
                    }}
                  >
                    {params.value}
                  </Box>
                );
              },
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
                      color: color,
                    }}
                  >
                    {params.value}
                  </Box>
                );
              },
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
                      color: color,
                    }}
                  >
                    {params.value}
                  </Box>
                );
              },
        }
    ];


    const rows = [
        { id: 1, Country: "India",2019: "15", 2020: "10", 2021: "43",2022: "77", 2023: "36" },
        { id: 2, Country: "India",2019: "28", 2020: "10", 2021: "-43",2022: "77", 2023: "36" },
        { id: 3, Country: "India",2019: "-10", 2020: "10", 2021: "43",2022: "77", 2023: "36" },
        { id: 4, Country: "India",2019: "33", 2020: "-10", 2021: "43",2022: "-77", 2023: "36" },
        { id: 5, Country: "India",2019: "22", 2020: "10", 2021: "43",2022: "77", 2023: "36" },
        { id: 6, Country: "India",2019: "-64", 2020: "10", 2021: "43",2022: "77", 2023: "-36" },
        { id: 7, Country: "India",2019: "56", 2020: "10", 2021: "43",2022: "77", 2023: "36" },
    ];

    const rowsPercentage = [
        { id: 1, Country: "India",2019: "15%", 2020: "10%", 2021: "43%",2022: "77%", 2023: "36%" },
        { id: 2, Country: "India",2019: "28%", 2020: "10%", 2021: "-43%",2022: "77%", 2023: "36%" },
        { id: 3, Country: "India",2019: "-10%", 2020: "10%", 2021: "43%",2022: "77%", 2023: "36%" },
        { id: 4, Country: "India",2019: "33%", 2020: "-10%", 2021: "43%",2022: "-77%", 2023: "36%" },
        { id: 5, Country: "India",2019: "22%", 2020: "10%", 2021: "43%",2022: "77%", 2023: "36%" },
        { id: 6, Country: "India",2019: "-64%", 2020: "10%", 2021: "43%",2022: "77%", 2023: "-36%" },
        { id: 7, Country: "India",2019: "56%", 2020: "10%", 2021: "43%",2022: "77%", 2023: "36%" },
    ];


    function copyTableToClipboard() {
        window?.getSelection()?.removeAllRanges();
        let range = document.createRange();
        const gridContainer: any = document.querySelector('.forMakingPdf');
        range.selectNode(gridContainer);
        window?.getSelection()?.addRange(range);
        document.execCommand('copy');
        window?.getSelection()?.removeAllRanges();
      }


      const downloadAsPdf = () => {

        const gridContainer: any = document.querySelector('.forMakingPdf');

        html2canvas(gridContainer).then(canvas => {
          const imgData = canvas.toDataURL('image/png');
          const pdf = new jsPDF();
          const imgWidth = 210; // A4 size
          const imgHeight = canvas.height * imgWidth / canvas.width;
          pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
          pdf.save('datagrid.pdf');
        });
      };


    return (
        <>
            <Box sx={{ width: "100%", padding: "5px 15px" }}>
                <Box className="leader-board-heading"> 
                    <TroubleshootOutlinedIcon />
                    <h3 className="disply-page-title">KPI Analysis</h3>
                </Box>
                <Box>
                    <h4>Gross Margin</h4>

                    <Stack
                    className="stackShareOptions"
                        direction="row"
                        alignContent="center"
                        alignItems="center"
                        justifyContent="space-between"
                        paddingLeft={2}
                        sx={{
                            //paddingBottom: "20px",
                            background: "#F2F2F7",
                            padding: "5px 10px"
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
                                aria-label="button group"

                                sx={{
                                    border: "1px solid rgba(12, 9, 156, 1)",
                                    background: "rgba(255, 255, 255, 1)",
                                    borderRadius: "8px",
                                    paddingTop: '2px',
                                    paddingBottom: '2px',
                                    maxHeight: '32px',
                                    overflow: 'hidden',
                                    '& .secondButton':{
                                        fontSize: '12px !important',
                                        padding: '6px 12px',
                                        border: 'none',
                                        borderRadius: "6px",
                                        marginLeft: isValue ?  '3px' : '6px',
                                        marginRight: isValue ? '6px' : '6px',
                                        color: "rgba(12, 9, 156, 1)",
                                        bgcolor: "rgba(255, 255, 255, 1)",
                                        "&.MuiButtonBase-root:hover": {
                                            bgcolor: "rgba(255, 255, 255, 1)"
                                          },
                                          
                                    },
                                    '& .firstButton':{
                                        borderRadius: "6px",
                                        fontSize: '12px !important',
                                        padding: '12px 24px !important',
                                        marginTop: '1px',
                                        marginLeft: isValue ?  '3px' : '6px',
                                        marginRight: isValue ? '6px' : '3px',
                                        height: '24px !important',
                                        background: 'rgba(12, 9, 156, 1)',
                                        "&:hover": {
                                            bgcolor: "rgba(12, 9, 156, 1) !important"
                                          },
                                    }
                                }}
                            >
                                <Button  onClick={()=> setIsValue(false)} className={ isValue ? "secondButton" : "firstButton"}>%</Button>
                                <Button  onClick={()=> setIsValue(true)} className={ isValue ? "firstButton" : "secondButton"}>Value</Button>
                            </ButtonGroup>
                            <ButtonGroup
                                disableElevation
                                size="small"
                                variant="contained"
                                aria-label="Disabled button group"
                                style={{
                                    borderRadius: "10px",
                                    border: "1px"
                                }}
                                disabled
                            >
                                <Button>USD</Button>
                                <Button variant="outlined">Local</Button>
                            </ButtonGroup>
                        </Box>

                        <Box
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
                            
                        </Box>

                    </Stack>

                    <Stack>
                    <DataGrid
                        hideFooter
                        sx={{
                            overflowX: "scroll !important",
                            "& .first-column.cell": {
                                backgroundColor: "#F2F2F7"
                            },
                            ".highlight": {
                                bgcolor: "grey"
                            },
                            ".MuiDataGrid-cell": {
                                backgroundColor: "none",
                                fontWeight: 700,
                                border: '1px solid #BBBBBB'
                            },
                            "& .MuiDataGrid-columnHeader": {
                                backgroundColor: "#5376F0",
                                color: "white",
                                fontSize: "14px",
                                fontWeight: 700,
                                lineHeight: "16px",
                                letterSpacing: "0em",
                                textAlign: "left",
                                border: '1px solid #BBBBBB'
                            },
                            // '.MuiDataGrid-root .MuiDataGrid-row:hover, MuiDataGrid-root.MuiDataGrid-row.Mui-hovered':{
                            //     backgroundColor: "unset",
                            // },
                        }}
                        rows={isValue ?rows : rowsPercentage} 
                        columns={columns}
                        disableRowSelectionOnClick
                        disableColumnFilter
                        hideFooterSelectedRowCount
                        hideFooterPagination
                        
                    />
                    </Stack>
                    
                </Box>
            </Box>
        </>
    );
};

export default KpiAnalysis;