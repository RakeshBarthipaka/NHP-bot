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
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const KeywordList = (props: any) => {
    const [isDisplayAnswer, setIsDisplayAnswer] = useState<number>();
    const [isDisplayAnswerToggle, setIsDisplayAnswerToggle] = useState<boolean>(false);

    const toggleAnswerDisplay = (id: any) => {

        if(isDisplayAnswer === id  && isDisplayAnswerToggle === true){
            setIsDisplayAnswerToggle(false);
        }
        else if(isDisplayAnswer === undefined && isDisplayAnswerToggle === false){
            setIsDisplayAnswerToggle(true);
        }
        else if (isDisplayAnswer !== id && isDisplayAnswerToggle !== true){
            setIsDisplayAnswerToggle(true);
        }
        
    };

    const tagsData = [
        {
            id: 1,
            query: "Show me the best sales region in European market",
            answer: "Financial growth is an aspect of improving your personal finances and becoming more financially stable. When you are in the process of improving your finances, there are a few other approaches to your lifestyle that you can implement that will improve your  financial position further. Financial growth is an aspect of improving your personal finances and becoming more financially stable. When you are in the process of improving your finances, there are a few other approaches to your lifestyle that you can implement that will improve your financial position further. These approaches are meant to advance your financial standing and be a boost to your financial improvements. Your plan for paying off your outstanding debts is similar to your plan for paying off your loans.Debts should be one of your top priorities now that you are attempting to jump start financial growth.",

            requestedBy: "Vishnu",
            requestedDate: "22/01/2024"
        },
        {
            id: 2,
            query: "What is the current trend in the Germany market",
            answer: "Financial growth is an aspect of improving your personal finances and becoming more financially stable. When you are in the process of improving your finances, there are a few other approaches to your lifestyle that you can implement that will improve your  financial position further. Financial growth is an aspect of improving your personal finances and becoming more financially stable. When you are in the process of improving your finances, there are a few other approaches to your lifestyle that you can implement that will improve your financial position further. These approaches are meant to advance your financial standing and be a boost to your financial improvements. Your plan for paying off your outstanding debts is similar to your plan for paying off your loans.Debts should be one of your top priorities now that you are attempting to jump start financial growth.",
            requestedBy: "Vishnu",
            requestedDate: "22/01/2024"
        },
        {
            id: 3,
            query: "When was the Budget is introduced in Indian Parliament and how was the stock market effected?",
            answer: "When you are in the process of improving your finances, there are a few other approaches to your lifestyle that you can implement that will improve your  financial position further. Financial growth is an aspect of improving your personal finances and becoming more financially stable. When you are in the process of improving your finances, there are a few other approaches to your lifestyle that you can implement that will improve your financial position further. These approaches are meant to advance your financial standing and be a boost to your financial improvements. Your plan for paying off your outstanding debts is similar to your plan for paying off your loans.Debts should be one of your top priorities now that you are attempting to jump start financial growth.Financial growth is an aspect of improving your personal finances and becoming more financially stable.",
            requestedBy: "Vishnu",
            requestedDate: "22/01/2024"
        },
        {
            id: 4,
            query: "What is the LATAM growth percentage in Europe market for the last 5 years",
            answer: "There are a few other approaches to your lifestyle that you can implement that will improve your  financial position further. Financial growth is an aspect of improving your personal finances and becoming more financially stable. When you are in the process of improving your finances, there are a few other approaches to your lifestyle that you can implement that will improve your financial position further. These approaches are meant to advance your financial standing and be a boost to your financial improvements. Your plan for paying off your outstanding debts is similar to your plan for paying off your loans.Debts should be one of your top priorities now that you are attempting to jump start financial growth.Financial growth is an aspect of improving your personal finances and becoming more financially stable. When you are in the process of improving your finances, ",
            requestedBy: "Vishnu",
            requestedDate: "22/01/2024"
        },
        {
            id: 5,
            query: "Can you help me, how can I manage my financial Budget? current market trends?",
            answer: "Financial growth is an aspect of improving your personal finances and becoming more financially stable. When you are in the process of improving your finances, there are a few other approaches to your lifestyle that you can implement that will improve your financial position further. These approaches are meant to advance your financial standing and be a boost to your financial improvements. Your plan for paying off your outstanding debts is similar to your plan for paying off your loans.Debts should be one of your top priorities now that you are attempting to jump start financial growth.Financial growth is an aspect of improving your personal finances and becoming more financially stable. When you are in the process of improving your finances, there are a few other approaches to your lifestyle that you can implement that will improve your  financial position further. ",
            requestedBy: "Vishnu",
            requestedDate: "22/01/2024"
        }
    ];

    function copyTableToClipboard() {
        window?.getSelection()?.removeAllRanges();
        let range = document.createRange();
        const gridContainer: any = document.querySelector(".tagAnswers");
        range.selectNode(gridContainer);
        window?.getSelection()?.addRange(range);
        document.execCommand("copy");
        window?.getSelection()?.removeAllRanges();
    }

    const downloadAsPdf = () => {
        const gridContainer: any = document.querySelector(".tagAnswers");

        html2canvas(gridContainer).then(canvas => {
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF();
            const imgWidth = 210; // A4 size
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
            pdf.save("datagrid.pdf");
        });
    };

    return (
        <>
            {tagsData?.map(tag => {
                return (
                    <>
                        <Box className="question-box" onClick={() => {setIsDisplayAnswer(tag.id);
                        //setIsDisplayAnswerToggle(!isDisplayAnswerToggle);
                        toggleAnswerDisplay(tag.id);
                        }}>
                            <Box
                                sx={{
                                    width: "23px",
                                    float: "left",
                                    paddingRight: "2px"
                                }}
                            >
                                {isDisplayAnswer === tag.id && isDisplayAnswerToggle ? (
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
                        {isDisplayAnswer === tag.id && isDisplayAnswerToggle && (
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
                                                    <RateReviewOutlinedIcon />
                                                </Avatar>
                                            </span>
                                            <span onClick={copyTableToClipboard}>
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

                                            <span onClick={downloadAsPdf}>
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
                                    <Typography className="tagAnswers">{tag.answer}</Typography>
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
