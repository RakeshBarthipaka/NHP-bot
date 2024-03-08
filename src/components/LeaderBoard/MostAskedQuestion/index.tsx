import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import "react-tabs/style/react-tabs.css";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
//import style from "../../LeaderBoard/LeaderBoard.module.scss";
import { MostAskedQuestion as Questions } from "../../../utils/MockData";
import SortOutlinedIcon from "@mui/icons-material/SortOutlined";
import { Button, ButtonGroup } from "@mui/material";

const MostAskedQuestion = (props: any) => {
    const [isDisplayAnswer, setIsDisplayAnswer] = useState<boolean>(false);
    const [displayAnsId, setDisplayAnsId] = useState<number>(0);

    const toggleAnswerDisplay = (id: any) => {
        if (isDisplayAnswer && id === displayAnsId) {
            setIsDisplayAnswer(false);
        } else {
            setIsDisplayAnswer(true);
        }
        setDisplayAnsId(id);
    };

    return (
        <>
            <Box className="asked-question-top-box">
                <span className="iconText">
                    <RemoveRedEyeOutlinedIcon className="viewIcon IconElemt" />
                </span>
                <span className="iconText">By Views</span>
                <span className="iconText">
                    <SortOutlinedIcon className="ShortByIcon IconElemt" />
                </span>
                <span className="iconText">By Date</span>
                <ButtonGroup variant="outlined" aria-label="Basic button group">
                    <Button>Top 10</Button>
                    <Button>ALL</Button>
                </ButtonGroup>
            </Box>
            {Questions.map((item, index) => {
                return (
                    <React.Fragment key={index}>
                        <Box className="question-box" onClick={() => toggleAnswerDisplay(item.id)}>
                            <Box
                                sx={{
                                    width: "23px",
                                    float: "left",
                                    paddingRight: "2px"
                                }}
                            >
                                {isDisplayAnswer && displayAnsId === item.id ? (
                                    <RemoveCircleOutlineOutlinedIcon
                                        sx={{
                                            fontSize: 20
                                        }}
                                    />
                                ) : (
                                    <ControlPointIcon
                                        sx={{
                                            fontSize: 20
                                        }}
                                    />
                                )}
                            </Box>
                            <Box className="question-text">
                                <Typography className="question">{item.question}</Typography>
                                <Typography className="otherInfo">
                                    requested by: {item.requestedBy} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;requested on: {item.requestedOn}
                                    <span>
                                        <RemoveRedEyeOutlinedIcon className="viewIcon" />
                                    </span>{" "}
                                    {item.views}
                                </Typography>
                            </Box>
                        </Box>
                        {isDisplayAnswer && displayAnsId === item.id && (
                            <div className="answer-container">
                                <Box>
                                    <Typography>
                                        Financial growth is an aspect of improving your personal finances and becoming more financially stable. When you are in
                                        the process of improving your finances, there are a few other approaches to your lifestyle that you can implement that
                                        will improve your financial position further. Financial growth is an aspect of improving your personal finances and
                                        becoming more financially stable. When you are in the process of improving your finances, there are a few other
                                        approaches to your lifestyle that you can implement that will improve your financial position further. These approaches
                                        are meant to advance your financial standing and be a boost to your financial improvements. Your plan for paying off
                                        your outstanding debts is similar to your plan for paying off your loans. Debts should be one of your top priorities now
                                        that you are attempting to jump start financial growth.
                                    </Typography>
                                </Box>
                            </div>
                        )}
                    </React.Fragment>
                );
            })}
        </>
    );
};

export default MostAskedQuestion;
