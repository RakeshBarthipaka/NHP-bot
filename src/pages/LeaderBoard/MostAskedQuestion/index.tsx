import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import "react-tabs/style/react-tabs.css";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
//import style from "../../LeaderBoard/LeaderBoard.module.scss";

const MostAskedQuestion = (props: any) => {
    const [isDisplayAnswer, setIsDisplayAnswer] = useState<boolean>(false);

    const toggleAnswerDisplay = () => {
        setIsDisplayAnswer(!isDisplayAnswer);
    };
    return (
        <>
            <Box className="question-box" onClick={toggleAnswerDisplay}>
                <Box
                    sx={{
                        width: "23px",
                        float: "left",
                        paddingRight: "2px"
                    }}
                >
                    {isDisplayAnswer ? (
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
                    <Typography className="question">Show recommended Queries after one Queries that info come from history</Typography>
                    <Typography className="otherInfo">
                        requested by: Vishnu &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;requested on: 22/01/2024
                        <span>
                            <RemoveRedEyeOutlinedIcon className="viewIcon" />
                        </span>{" "}
                        9
                    </Typography>
                </Box>
            </Box>
            {isDisplayAnswer && (
                <div className="answer-container">
                    <Box>
                        <Typography>
                            Financial growth is an aspect of improving your personal finances and becoming more financially stable. When you are in the process
                            of improving your finances, there are a few other approaches to your lifestyle that you can implement that will improve your
                            financial position further. Financial growth is an aspect of improving your personal finances and becoming more financially stable.
                            When you are in the process of improving your finances, there are a few other approaches to your lifestyle that you can implement
                            that will improve your financial position further. These approaches are meant to advance your financial standing and be a boost to
                            your financial improvements. Your plan for paying off your outstanding debts is similar to your plan for paying off your loans.
                            Debts should be one of your top priorities now that you are attempting to jump start financial growth.
                        </Typography>
                    </Box>
                </div>
            )}
            <Box className="question-box">
                <Box
                    sx={{
                        width: "23px",
                        float: "left",
                        paddingRight: "2px"
                    }}
                >
                    <ControlPointIcon
                        sx={{
                            fontSize: 20
                        }}
                    />
                </Box>
                <Box className="question-text">
                    <Typography className="question">Show recommended Queries after one Queries that</Typography>
                    <Typography className="otherInfo">
                        requested by: Vishnu &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;requested on: 22/01/2024
                        <span>
                            <RemoveRedEyeOutlinedIcon className="viewIcon" />
                        </span>{" "}
                        9
                    </Typography>
                </Box>
            </Box>
            <Box className="question-box">
                <Box
                    sx={{
                        width: "23px",
                        float: "left",
                        paddingRight: "2px"
                    }}
                >
                    <ControlPointIcon
                        sx={{
                            fontSize: 20
                        }}
                    />
                </Box>
                <Box className="question-text">
                    <Typography className="question">Show recommended Queries after one come from history</Typography>
                    <Typography className="otherInfo">
                        requested by: Vishnu &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;requested on: 22/01/2024
                        <span>
                            <RemoveRedEyeOutlinedIcon className="viewIcon" />
                        </span>{" "}
                        9
                    </Typography>
                </Box>
            </Box>
            <Box className="question-box">
                <Box
                    sx={{
                        width: "23px",
                        float: "left",
                        paddingRight: "2px"
                    }}
                >
                    <ControlPointIcon
                        sx={{
                            fontSize: 20
                        }}
                    />
                </Box>
                <Box className="question-text">
                    <Typography className="question">Show recommended Queries after one Queries that</Typography>
                    <Typography className="otherInfo">
                        requested by: Vishnu &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;requested on: 22/01/2024
                        <span>
                            <RemoveRedEyeOutlinedIcon className="viewIcon" />
                        </span>{" "}
                        9
                    </Typography>
                </Box>
            </Box>
            <Box className="question-box">
                <Box
                    sx={{
                        width: "23px",
                        float: "left",
                        paddingRight: "2px"
                    }}
                >
                    <ControlPointIcon
                        sx={{
                            fontSize: 20
                        }}
                    />
                </Box>
                <Box className="question-text">
                    <Typography className="question">Show recommended one Queries that info come from history</Typography>
                    <Typography className="otherInfo">
                        requested by: Vishnu &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;requested on: 22/01/2024
                        <span>
                            <RemoveRedEyeOutlinedIcon className="viewIcon" />
                        </span>{" "}
                        9
                    </Typography>
                </Box>
            </Box>
            <Box className="question-box">
                <Box
                    sx={{
                        width: "23px",
                        float: "left",
                        paddingRight: "2px"
                    }}
                >
                    <ControlPointIcon
                        sx={{
                            fontSize: 20
                        }}
                    />
                </Box>
                <Box className="question-text">
                    <Typography className="question">Show recommended Queries after come from history</Typography>
                    <Typography className="otherInfo">
                        requested by: Vishnu &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;requested on: 22/01/2024
                        <span>
                            <RemoveRedEyeOutlinedIcon className="viewIcon" />
                        </span>{" "}
                        9
                    </Typography>
                </Box>
            </Box>
            <Box className="question-box">
                <Box
                    sx={{
                        width: "23px",
                        float: "left",
                        paddingRight: "2px"
                    }}
                >
                    <ControlPointIcon
                        sx={{
                            fontSize: 20
                        }}
                    />
                </Box>
                <Box className="question-text">
                    <Typography className="question">Show recommended Queries after one Queries that info come from history</Typography>
                    <Typography className="otherInfo">
                        requested by: Vishnu &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;requested on: 22/01/2024
                        <span>
                            <RemoveRedEyeOutlinedIcon className="viewIcon" />
                        </span>{" "}
                        9
                    </Typography>
                </Box>
            </Box>
        </>
    );
};

export default MostAskedQuestion;
