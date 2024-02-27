import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import "react-tabs/style/react-tabs.css";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
import styles from "./KeywordList.module.css";
import { Avatar, Stack } from "@mui/material";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownAltOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined";

const KeywordList = (props: any) => {
    const [isDisplayAnswer, setIsDisplayAnswer] = useState<boolean>(false);

    const toggleAnswerDisplay = () => {
        setIsDisplayAnswer(!isDisplayAnswer);
    };

    const tagsData = [
        {
            query: "Show me the best sales region in European market",
            answer: "Financial growth is an aspect of improving your personal finances and becoming more financially stable. When you are in the process of improving your finances, there are a few other approaches to your lifestyle that you can implement that will improve your  financial position further. Financial growth is an aspect of improving your personal finances and becoming more financially stable. When you are in the process of improving your finances, there are a few other approaches to your lifestyle that you can implement that will improve your financial position further. These approaches are meant to advance your financial standing and be a boost to your financial improvements. Your plan for paying off your outstanding debts is similar to your plan for paying off your loans.Debts should be one of your top priorities now that you are attempting to jump start financial growth.",

            requestedBy: "Vishnu",
            requestedDate: "22/01/2024"
        },
        {
            query: "What is the current trend in the Germany market",
            answer: "Financial growth is an aspect of improving your personal finances and becoming more financially stable. When you are in the process of improving your finances, there are a few other approaches to your lifestyle that you can implement that will improve your  financial position further. Financial growth is an aspect of improving your personal finances and becoming more financially stable. When you are in the process of improving your finances, there are a few other approaches to your lifestyle that you can implement that will improve your financial position further. These approaches are meant to advance your financial standing and be a boost to your financial improvements. Your plan for paying off your outstanding debts is similar to your plan for paying off your loans.Debts should be one of your top priorities now that you are attempting to jump start financial growth.",
            requestedBy: "Vishnu",
            requestedDate: "22/01/2024"
        },
        {
            query: "When was the Budget is introduced in Indian Parliament and how was the stock market effected?",
            answer: "Financial growth is an aspect of improving your personal finances and becoming more financially stable. When you are in the process of improving your finances, there are a few other approaches to your lifestyle that you can implement that will improve your  financial position further. Financial growth is an aspect of improving your personal finances and becoming more financially stable. When you are in the process of improving your finances, there are a few other approaches to your lifestyle that you can implement that will improve your financial position further. These approaches are meant to advance your financial standing and be a boost to your financial improvements. Your plan for paying off your outstanding debts is similar to your plan for paying off your loans.Debts should be one of your top priorities now that you are attempting to jump start financial growth.",
            requestedBy: "Vishnu",
            requestedDate: "22/01/2024"
        },
        {
            query: "What is the LATAM growth percentage in Europe market for the last 5 years",
            answer: "Financial growth is an aspect of improving your personal finances and becoming more financially stable. When you are in the process of improving your finances, there are a few other approaches to your lifestyle that you can implement that will improve your  financial position further. Financial growth is an aspect of improving your personal finances and becoming more financially stable. When you are in the process of improving your finances, there are a few other approaches to your lifestyle that you can implement that will improve your financial position further. These approaches are meant to advance your financial standing and be a boost to your financial improvements. Your plan for paying off your outstanding debts is similar to your plan for paying off your loans.Debts should be one of your top priorities now that you are attempting to jump start financial growth.",
            requestedBy: "Vishnu",
            requestedDate: "22/01/2024"
        },
        {
            query: "Can you help me, how can I manage my financial Budget? current market trends?",
            answer: "Financial growth is an aspect of improving your personal finances and becoming more financially stable. When you are in the process of improving your finances, there are a few other approaches to your lifestyle that you can implement that will improve your  financial position further. Financial growth is an aspect of improving your personal finances and becoming more financially stable. When you are in the process of improving your finances, there are a few other approaches to your lifestyle that you can implement that will improve your financial position further. These approaches are meant to advance your financial standing and be a boost to your financial improvements. Your plan for paying off your outstanding debts is similar to your plan for paying off your loans.Debts should be one of your top priorities now that you are attempting to jump start financial growth.",
            requestedBy: "Vishnu",
            requestedDate: "22/01/2024"
        }
    ];

    return (
        <>
            {tagsData?.map(tag => {
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
                                <Typography className="question">{tag.query}</Typography>
                                <Typography className="otherInfo">
                                    requested by: {tag.requestedBy} requested on: {tag.requestedDate}
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
                                    <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
                                        <Box
                                            sx={{
                                                display: "flex"
                                            }}
                                        >
                                            <span onClick={() => {}}>
                                                <Avatar
                                                    sx={{
                                                        bgcolor: "#E1E5F2",
                                                        color: "rgba(12, 9, 156, 1)",
                                                        "&:hover": {
                                                            backgroundColor: "#0027B0",
                                                            color: " rgba(30, 255, 241, 0.8)"
                                                        }
                                                    }}
                                                >
                                                    <ContentCopyOutlinedIcon />
                                                </Avatar>
                                            </span>

                                            <span onClick={() => {}}>
                                                <Avatar
                                                    sx={{
                                                        bgcolor: "#E1E5F2",
                                                        color: "rgba(12, 9, 156, 1)",
                                                        "&:hover": {
                                                            backgroundColor: "#0027B0",
                                                            color: " rgba(30, 255, 241, 0.8)"
                                                        }
                                                    }}
                                                >
                                                    {" "}
                                                    <FileDownloadOutlinedIcon />
                                                </Avatar>
                                            </span>
                                            <span onClick={() => {}}>
                                                <Avatar
                                                    sx={{
                                                        bgcolor: "#E1E5F2",
                                                        color: "rgba(12, 9, 156, 1)",
                                                        "&:hover": {
                                                            backgroundColor: "#0027B0",
                                                            color: " rgba(30, 255, 241, 0.8)"
                                                        }
                                                    }}
                                                >
                                                    <ShareOutlinedIcon />
                                                </Avatar>
                                            </span>
                                        </Box>
                                        <Box display={"flex"}>
                                            <div className={styles.viewIcon}>
                                                <span>
                                                    <RemoveRedEyeOutlinedIcon />
                                                </span>
                                                <span>9</span>
                                            </div>
                                            <div className={styles.thumbUp}>
                                                <span>
                                                    <ThumbUpOutlinedIcon />
                                                </span>
                                                <span>2</span>
                                            </div>
                                            <div className={styles.thumbDown}>
                                                <span>
                                                    <ThumbDownAltOutlinedIcon />
                                                </span>
                                                <span>2</span>
                                            </div>
                                        </Box>
                                    </Stack>
                                    <Typography>{tag.answer}</Typography>
                                </Box>
                            </div>
                        )}
                    </>
                );
            })}
        </>
    );
};

export default KeywordList;
