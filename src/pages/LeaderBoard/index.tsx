import React from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
//import LeaderBoard from '../../assets/images/LeaderBoard.svg'
//import Stack from '@mui/material/Stack';
//import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';

const LeaderBoard = (props: any) => {
    const boxStyle = {
        width: 'auto',
        p: 1,
        bgcolor: '#5376F033',
        color: "#333333",
        borderRadius: 2,
        fontSize: '0.8rem',
        marginBottom: '0.5rem',
    }
  return (
    <>
        <Box marginLeft={3} sx={{ width: '100%'}}>
            <Typography variant="h6" fontWeight="bold" color="#0C099C" gutterBottom>
                Leader Board
            </Typography>
            <Divider />
            <Tabs>
                <TabList>
                    <Tab>Most Asked Questions</Tab>
                    <Tab>Most Liked Answers</Tab>
                </TabList>
                <TabPanel>
                    <Box
                        marginLeft={3}
                        sx={boxStyle}
                    >
                        <Box sx={{
                            width:"23px",
                            float:"left",
                            paddingRight:"2px"
                        }}><ControlPointIcon sx={{
                            fontSize:20
                        }}/></Box>
                        <Box>
                            <Typography fontSize={12}>Show recommended Queries after one Queries that info come from history</Typography>
                            <Typography fontSize={11} fontWeight="bold" color="#0C099C">requested by: Vishnu  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;requested on: 22/01/2024
                            {/* &nbsp;&nbsp;&nbsp;<RemoveRedEyeOutlinedIcon sx={{color:"#435241", fontSize:20}}/> */}
                            </Typography>
                        </Box>
                        
                    </Box>
                    <Box
                        marginLeft={3}
                        sx={boxStyle}
                    >
                        <Box sx={{
                            width:"23px",
                            float:"left",
                            paddingRight:"2px"
                        }}><ControlPointIcon sx={{
                            fontSize:20
                        }}/></Box>
                        <Box>
                            <Typography fontSize={12}>What is the return policy to t-shirts?</Typography>
                            <Typography fontSize={11} fontWeight="bold" color="#0C099C">requested by: Vishnu  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;requested on: 22/01/2024</Typography>
                        </Box>
                    </Box>
                    <Box
                        marginLeft={3}
                        sx={boxStyle}
                    >
                        <Box sx={{
                            width:"23px",
                            float:"left",
                            paddingRight:"2px"
                        }}><ControlPointIcon sx={{
                            fontSize:20
                        }}/></Box>
                        <Box>
                            <Typography fontSize={12}>Show recommended Queries after one Queries that info come from history</Typography>
                            <Typography fontSize={11} fontWeight="bold" color="#0C099C">requested by: Vishnu  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;requested on: 22/01/2024</Typography>
                        </Box>
                    </Box>
                    <Box
                        marginLeft={3}
                        sx={boxStyle}
                    >
                        <Box sx={{
                            width:"23px",
                            float:"left",
                            paddingRight:"2px"
                        }}><ControlPointIcon sx={{
                            fontSize:20
                        }}/></Box>
                        <Box>
                        <Typography fontSize={12}>Show recommended Queries after one Queries that info come from history</Typography>
                        <Typography fontSize={11} fontWeight="bold" color="#0C099C">requested by: Vishnu  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;requested on: 22/01/2024</Typography>
                        </Box>
                        <Typography fontSize={12}>Show recommended Queries after one Queries that info come from history</Typography>
                        <Typography fontSize={11} fontWeight="bold" color="#0C099C">requested by: Vishnu  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;requested on: 22/01/2024</Typography>
                    </Box>
                    <Box
                        marginLeft={3}
                        sx={boxStyle}
                    >
                        <Box sx={{
                            width:"23px",
                            float:"left",
                            paddingRight:"2px"
                        }}><ControlPointIcon sx={{
                            fontSize:20
                        }}/></Box>
                        <Box>
                            <Typography fontSize={12}>Show recommended Queries after one Queries that info come from history</Typography>
                            <Typography fontSize={11} fontWeight="bold" color="#0C099C">requested by: Vishnu  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;requested on: 22/01/2024</Typography>
                        </Box>
                    </Box>
                    <Box
                        marginLeft={3}
                        sx={boxStyle}
                    >
                        <Box sx={{
                            width:"23px",
                            float:"left",
                            paddingRight:"2px"
                        }}><ControlPointIcon sx={{
                            fontSize:20
                        }}/></Box>
                        <Box>
                            <Typography fontSize={12}>Show recommended Queries after one Queries that info come from history</Typography>
                            <Typography fontSize={11} fontWeight="bold" color="#0C099C">requested by: Vishnu  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;requested on: 22/01/2024</Typography>
                        </Box>
                    </Box>
                    <Box
                        marginLeft={3}
                        sx={boxStyle}
                    >
                        <Box sx={{
                            width:"23px",
                            float:"left",
                            paddingRight:"2px"
                        }}><ControlPointIcon sx={{
                            fontSize:20
                        }}/></Box>
                        <Box>
                            <Typography fontSize={12}>Show recommended Queries after one Queries that info come from history</Typography>
                            <Typography fontSize={11} fontWeight="bold" color="#0C099C">requested by: Vishnu  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;requested on: 22/01/2024</Typography>
                        </Box>
                    </Box>
                </TabPanel>
                <TabPanel>
                    <h2>Most Liked Answers</h2>
                </TabPanel>
            </Tabs>
        </Box>
    </>
  )
}

export default LeaderBoard