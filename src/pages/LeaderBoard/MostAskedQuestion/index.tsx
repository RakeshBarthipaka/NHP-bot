import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import "react-tabs/style/react-tabs.css";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
import style from "../../LeaderBoard/LeaderBoard.module.scss";

const boxStyle = {
    width: "auto",
    p: 1,
    bgcolor: "#5376F033",
    color: "#333333",
    borderRadius: 2,
    fontSize: "0.8rem",
    marginBottom: "0.5rem",
    cursor: "pointer"
};

const MostAskedQuestion = (props: any) => {
    const [isDisplayAnswer, setIsDisplayAnswer] = useState<boolean>(false);

    const toggleAnswerDisplay = () => {
        setIsDisplayAnswer(!isDisplayAnswer);
    };
    return (
        <>
            <Box marginX={1} sx={boxStyle} onClick={toggleAnswerDisplay}>
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
                <Box>
                    <Typography fontSize={12}>Show recommended Queries after one Queries that info come from history</Typography>
                    <Typography fontSize={11} fontWeight="bold" color="#0C099C">
                        requested by: Vishnu &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;requested on: 22/01/2024 &nbsp;&nbsp;&nbsp;
                        <RemoveRedEyeOutlinedIcon sx={{ color: "#435241", fontSize: 20 }} /> 9
                    </Typography>
                </Box>
            </Box>
            {isDisplayAnswer && (
                <Box marginLeft={3} marginBottom={3} bgcolor="#F2F2F7" color="#000000" padding={2}>
                    <Typography fontSize="0.7rem">
                        Financial growth is an aspect of improving your personal finances and becoming more financially stable. When you are in the process of
                        improving your finances, there are a few other approaches to your lifestyle that you can implement that will improve your financial
                        position further. Financial growth is an aspect of improving your personal finances and becoming more financially stable. When you are
                        in the process of improving your finances, there are a few other approaches to your lifestyle that you can implement that will improve
                        your financial position further. These approaches are meant to advance your financial standing and be a boost to your financial
                        improvements. Your plan for paying off your outstanding debts is similar to your plan for paying off your loans. Debts should be one of
                        your top priorities now that you are attempting to jump start financial growth.
                    </Typography>
                </Box>
            )}
            <Box marginX={1} sx={boxStyle}>
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
                <Box>
                    <Typography fontSize={12}>What is the return policy to t-shirts?</Typography>
                    <Typography fontSize={11} fontWeight="bold" color="#0C099C">
                        requested by: Vishnu &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;requested on: 22/01/2024 &nbsp;&nbsp;&nbsp;
                        <RemoveRedEyeOutlinedIcon sx={{ color: "#435241", fontSize: 20 }} /> 9
                    </Typography>
                </Box>
            </Box>
            <Box marginX={1} sx={boxStyle}>
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
                <Box>
                    <Typography fontSize={12}>Show recommended Queries after one Queries that info come from history</Typography>
                    <Typography fontSize={11} fontWeight="bold" color="#0C099C">
                        requested by: Vishnu &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;requested on: 22/01/2024 &nbsp;&nbsp;&nbsp;
                        <RemoveRedEyeOutlinedIcon sx={{ color: "#435241", fontSize: 20 }} /> 9
                    </Typography>
                </Box>
            </Box>
            <Box marginX={1} sx={boxStyle}>
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
                <Box>
                    <Typography fontSize={12}>Show recommended Queries after one Queries that info come from history</Typography>
                    <Typography fontSize={11} fontWeight="bold" color="#0C099C">
                        requested by: Vishnu &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;requested on: 22/01/2024 &nbsp;&nbsp;&nbsp;
                        <RemoveRedEyeOutlinedIcon sx={{ color: "#435241", fontSize: 20 }} /> 9
                    </Typography>
                </Box>
            </Box>
            <Box marginX={1} sx={boxStyle}>
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
                <Box>
                    <Typography fontSize={12}>Show recommended Queries after one Queries that info come from history</Typography>
                    <Typography fontSize={11} fontWeight="bold" color="#0C099C">
                        requested by: Vishnu &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;requested on: 22/01/2024 &nbsp;&nbsp;&nbsp;
                        <RemoveRedEyeOutlinedIcon sx={{ color: "#435241", fontSize: 20 }} /> 9
                    </Typography>
                </Box>
            </Box>
            <Box marginX={1} sx={boxStyle}>
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
                <Box>
                    <Typography fontSize={12}>Show recommended Queries after one Queries that info come from history</Typography>
                    <Typography fontSize={11} fontWeight="bold" color="#0C099C">
                        requested by: Vishnu &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;requested on: 22/01/2024 &nbsp;&nbsp;&nbsp;
                        <RemoveRedEyeOutlinedIcon sx={{ color: "#435241", fontSize: 20 }} /> 9
                    </Typography>
                </Box>
            </Box>
            <Box marginX={1} sx={boxStyle}>
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
                <Box>
                    <Typography fontSize={12}>Show recommended Queries after one Queries that info come from history</Typography>
                    <Typography fontSize={11} fontWeight="bold" color="#0C099C">
                        requested by: Vishnu &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;requested on: 22/01/2024 &nbsp;&nbsp;&nbsp;
                        <RemoveRedEyeOutlinedIcon sx={{ color: "#435241", fontSize: 20 }} /> 9
                    </Typography>
                </Box>
            </Box>
        </>
    );
};

export default MostAskedQuestion;
