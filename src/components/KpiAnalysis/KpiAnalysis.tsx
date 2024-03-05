import { useState } from "react";
import { Avatar, Box, Button, ButtonGroup, Stack } from "@mui/material";
import styles from "./KpiAnalysis.module.css";

import TroubleshootOutlinedIcon from '@mui/icons-material/TroubleshootOutlined';

import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import StackedBarChart from "../BarChart/BarChart";
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const KpiAnalysis = () => {
    const [isValue, setIsValue] = useState<boolean>(false);



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
                            {/* <span onClick={() => {}}>
                                <Avatar sx={{ bgcolor: "#E1E5F2",
                                 color: "rgba(12, 9, 156, 1)", "&:hover": {
                                            backgroundColor: "#0027B0",
                                                color: ' rgba(30, 255, 241, 0.8)'
                                            
                                        } }}>
                                    <ShareOutlinedIcon  />
                                </Avatar>
                            </span> */}
                        </Box>
                    </Stack>
                </Box>
            </Box>
        </>
    );
};

export default KpiAnalysis;