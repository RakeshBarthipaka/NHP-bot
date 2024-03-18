import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownAltOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import SortOutlinedIcon from "@mui/icons-material/SortOutlined";
import { Button, ButtonGroup } from "@mui/material";

const MostLikedAnswer = () => {
    return (
        <>
            <Box className="liked-ans-top-box">
            <ButtonGroup className="mui-custom-toggle" variant="outlined" aria-label="Basic button group">
                    <Button className="mui-toggle-active">
                        <span className="iconText">
                        <ThumbUpOutlinedIcon className="viewIcon IconElemt" />
                        </span>
                        <span>By Likes</span>
                    </Button>
                    <Button>
                        <span className="iconText">
                        <RemoveRedEyeOutlinedIcon className="viewIcon IconElemt" />
                        </span>
                        <span>By Vies</span>
                    </Button>
                    <Button>
                        <span className="iconText">
                            <SortOutlinedIcon className="ShortByIcon IconElemt" />
                        </span>
                        <span>By Date</span>
                    </Button>
                </ButtonGroup>
               
            </Box>
            <br></br>
            <Box className="LikedAnswerpanel">
                <Box>
                    <Box className="likedQuestion">
                        <Typography className="questionText">Show recommended Queries after one Queries that info come from history</Typography>
                        <Box sx={{ display: "flex", gap: "20px" }}>
                            <Typography className="otherOptions">requested by: Vishnu </Typography>
                            <Typography className="otherOptions">requested on: 22/01/2024 </Typography>
                            <span>
                                <span className="viewIcon">
                                    <span>
                                        <RemoveRedEyeOutlinedIcon />
                                    </span>
                                    <span>9</span>
                                </span>
                                <span className="thumbUp">
                                    <span>
                                        <ThumbUpOutlinedIcon />
                                    </span>
                                    <span>2</span>
                                </span>
                                <span className="thumbDown">
                                    <span>
                                        <ThumbDownAltOutlinedIcon />
                                    </span>
                                    <span>2</span>
                                </span>
                            </span>
                        </Box>
                    </Box>
                    <Typography className="answerText">
                        Financial growth is an aspect of improving your personal finances and becoming more financially stable. When you are in the process of
                        improving your finances, there are a few other approaches to your lifestyle that you can implement that will improve your financial
                        position further. These approaches are meant to advance your financial standing and be a boost to your financial improvements. Your plan
                        for paying off your outstanding debts is similar to your plan for paying off your loans. Debts should be one of your top priorities now
                        that you are attempting to jump start financial growth. Make an initial assessment of all of your outstanding debts and then make a plan
                        to tackle each one. Starting with the lowest balance is best because that debt can be paid off quick and easy. Attempt to pay off a
                        couple at a time, depending on your debt load so that you can get out of your debts much faster.
                        <div className="showMore-spacer"><a className="showMore-link">Show more.</a></div>
                    </Typography>
                </Box>
            </Box>
        </>
    );
};

export default MostLikedAnswer;
