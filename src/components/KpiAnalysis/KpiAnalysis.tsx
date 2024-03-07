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

import React from 'react';
import { Line } from 'react-chartjs-2';

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
            field: "rowheader",
            headerName: "$ in Millions",
            sortable: false,
            flex: 1,
            minWidth: 150,
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
        { id: 1, rowheader: "Products",2019: "$213,883", 2020: "$213,883", 2021: "$213,883",2022: "$213,883", 2023: "$213,883" },
        { id: 2, rowheader: "Services",2019: "46,291", 2020: "46,291", 2021: "46,291",2022: "46,291", 2023: "46,291" },
        { id: 3, rowheader: "Total Net Sales",2019: "$260,174", 2020: "$260,174", 2021: "$260,174",2022: "$260,174", 2023: "$260,174" },
        { id: 4, rowheader: "Total Cost of Sales",2019: "$161,782", 2020: "$161,782", 2021: "$161,782",2022: "$161,782", 2023: "$161,782" },
        { id: 5, rowheader: "Total Gross Profit",2019: "$98,392", 2020: "$104,392", 2021: "$152,392",2022: "$152,392", 2023: "$152,392" },
        { id: 6, rowheader: "% Gross Margin",2019: "37.8%", 2020: "38.2%", 2021: "41.8%",2022: "44.8%", 2023: "48.12%" },
        
    ];

    const rowsPercentage = [
      { id: 1, rowheader: "Products",2019: "$213,883", 2020: "$213,883", 2021: "$213,883",2022: "$213,883", 2023: "$213,883" },
      { id: 2, rowheader: "Services",2019: "46,291", 2020: "46,291", 2021: "46,291",2022: "46,291", 2023: "46,291" },
      { id: 3, rowheader: "Total Net Sales",2019: "$260,174", 2020: "$260,174", 2021: "$260,174",2022: "$260,174", 2023: "$260,174" },
      { id: 4, rowheader: "Total Cost of Sales",2019: "$161,782", 2020: "$161,782", 2021: "$161,782",2022: "$161,782", 2023: "$161,782" },
      { id: 5, rowheader: "Total Gross Profit",2019: "$98,392", 2020: "$104,392", 2021: "$152,392",2022: "$152,392", 2023: "$152,392" },
      { id: 6, rowheader: "% Gross Margin",2019: "37.8%", 2020: "38.2%", 2021: "41.8%",2022: "44.8%", 2023: "48.12%" },       
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

      
      const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top' as const,
          },
          title: {
            display: true,
            text: 'Gross Margin Trend for the last 5 years',
          },
        },
      };
      
      const labels = ['2019', '2020', '2021', '2022', '2023', '2024', '2025'];
      
      const data = {
        labels,
        datasets: [
          {
            label: 'Dataset 1',
            data: [5, 12, 9,25,35,22,40 ], 
          },
          {
            label: 'Dataset 2',
            data: [7, 11,10,28,36,32,45 ], 
          },
          {
            label: 'Dataset ',
            data: [9,11,15,29,34,39,44 ], 
          },
        ],
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

                          <Box sx={{ display: "flex" }} >
                            <span onClick={copyTableToClipboard}>
                              <Avatar
                                sx={{
                                  bgcolor: "#E1E5F2",
                                  color: "rgba(12, 9, 156, 1)", "&:hover": {
                                    backgroundColor: "#0027B0",
                                    color: ' rgba(30, 255, 241, 0.8)'
                                  }
                                }}
                              >
                                <ContentCopyOutlinedIcon />
                              </Avatar>
                            </span>

                            <span onClick={downloadAsPdf}>
                              <Avatar sx={{
                                bgcolor: "#E1E5F2",
                                color: "rgba(12, 9, 156, 1)", "&:hover": {
                                  backgroundColor: "#0027B0",
                                  color: ' rgba(30, 255, 241, 0.8)'
                                }
                              }}>
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
                            border: 'none', 
                            overflowX: "scroll !important",
                            "& .first-column.cell": {
                                backgroundColor: "#F2F2F7",
                                fontWeight: 600,
                            },
                            ".highlight": {
                                bgcolor: "grey"
                            },
                            ".MuiDataGrid-cell": {
                                backgroundColor: "none",
                                fontWeight: 500,
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
                            '& .MuiDataGrid-virtualScroller::-webkit-scrollbar': {
                              height: '6px',
                            },
                            '& .MuiDataGrid-virtualScroller::-webkit-scrollbar-track': {
                              background: '#f1f1f1',
                            },
                            '& .MuiDataGrid-virtualScroller::-webkit-scrollbar-thumb': {
                              backgroundColor: '#bbb',
                              borderRadius: '6px',
                            },
                            '& .MuiDataGrid-virtualScroller::-webkit-scrollbar-thumb:hover': {
                              background: '#757575',
                            },
                        }}
                        rows={isValue ?rows : rowsPercentage} 
                        columns={columns}
                        disableRowSelectionOnClick
                        disableColumnFilter
                        hideFooterSelectedRowCount
                        hideFooterPagination
                        
                    />
                    </Stack>
                    <Stack className={styles.kpiAnalysisText}>
                      <h5>Summary of Gross Margin</h5>
                    <ul>
                      <li>
                        India has shown fluctuation with significant declines in 2020 and subsequent improvement in the following years.
                      </li>
                      <li>Mexico has shown a consistant increase in UOM over the years. </li>
                      <li>China’s UOM has shown some variability, with an overall decrease in 2022. </li>
                      <li>Thailand has shown some generally increasing trend in UOM with slight decline in 2022.</li>
                      
                    </ul>
                    </Stack>
                </Box>

                <Box paddingLeft={4} paddingTop={2} marginBottom={4}> 
                    <Line options={options} data={data} />
                </Box>
            </Box>
        </>
    );
};

export default KpiAnalysis;