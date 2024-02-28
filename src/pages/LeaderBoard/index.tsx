import React from "react";
// import styles from './LeaderBoard.module.css'
import Box from "@mui/material/Box";
//import Typography from '@mui/material/Typography';
//import LeaderBoard from '../../assets/images/LeaderBoard.svg'
//import Stack from '@mui/material/Stack';
//import Avatar from '@mui/material/Avatar';
import Divider from "@mui/material/Divider";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import MostAskedQuestion from "./MostAskedQuestion";
import MostLikedAnswer from "./MostLikedAnswer";
import "../LeaderBoard/LeaderBoard.scss";
// import LeaderBoardIcon from "../../assets/images/LeaderBoard.svg";
import LeaderboardOutlinedIcon from '@mui/icons-material/LeaderboardOutlined';

const LeaderBoard = (props: any) => {
    return (
        <>
            <Box  sx={{ width: "100%", padding: "5px 15px" }}>
                <Box className="leader-board-heading">
                    {/* <img src={LeaderBoardIcon} alt="Uploads" /> */}
                    <LeaderboardOutlinedIcon />
                    <h3 className="disply-page-title">Leader Board</h3>
                </Box>
               
                <Tabs>
                    <TabList>
                        <Tab>Most Asked Questions</Tab>
                        <Tab>Most Liked Answers</Tab>
                    </TabList>
                    <TabPanel>
                        <MostAskedQuestion />
                    </TabPanel>
                    <TabPanel>
                        <MostLikedAnswer />
                    </TabPanel>
                </Tabs>
            </Box>
        </>
    );
};

export default LeaderBoard;
