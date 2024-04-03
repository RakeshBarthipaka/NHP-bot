import React, { useState, useEffect } from "react";
//import _ from "lodash";
import { Avatar, Box, Button, ButtonGroup, Grid, Stack } from "@mui/material";

// import Box from "@mui/material/Box";
import "./ChatThreads.scss";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import SearchBar from "../Common/SearchBar";
import SortOutlinedIcon from "@mui/icons-material/SortOutlined";
//import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import HeightIcon from "@mui/icons-material/Height";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownAltOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
//import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import ReplyAllIcon from "@mui/icons-material/ReplyAll";
import { Threads } from "../../utils/MockData";
// import SortOutlinedIcon from "@mui/icons-material/SortOutlined";
//import KeywordList from "./KeywordList";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import StarIcon from "@mui/icons-material/Star";
import { getApi, postApiQuery } from "../../api";
import jsPDF from "jspdf";
import DownloadPDFThreads from "../Answer/GeneratePDFThreads";
import moment from "moment";
import GradeIcon from "@mui/icons-material/Grade";

const ChatThreads = (props: any) => {
    let userID = localStorage.getItem("userID") ? localStorage.getItem("userID") : 0; //needs to be change
    const [allThreads, setThreads] = useState<any[]>([]);
    const [isStarred, setIsStarred] = useState(false);

    const getThreadData = async () => {
        try {
            const response = await getApi(`chat_sessions/?user=${"user"}`); //need to pass `userID` here
            if (response) {
                setThreads(response);
            }
        } catch (error) {
            setThreads([]);
        }
    };

    const sendStarredThread = async (chatID: any) => {
        try {
            const response = await postApiQuery(`star`, "chat_id", chatID); //need to pass `userID` here
            setIsStarred(!isStarred);
        } catch (error) {
            console.log(error);
        }
    };

    const handleEdit = (event: any, chatID: any) => {
        event.stopPropagation();
        console.log("chatID:", chatID);
    };

    const ThreadElements = ({ item }: any) => {
        return (
            <>
                <Box
                    className={`thread-box ${props.activeChatThreadDetails?.id === item.id ? "active-thread-box" : ""}`}
                    onClick={() => props.runChatThread(item)}
                >
                    {/* <Typography className="questionText">{item.question}</Typography> */}
                    <Typography className="questionText">
                        {item.session_data[0].question}
                        <Box component="span" className="edit-icon" onClick={event => handleEdit(event, item?.chatID)}>
                            <BorderColorOutlinedIcon />
                        </Box>
                        <span onClick={() => sendStarredThread(item?.chatID)}>
                            {" "}
                            {item.session_data[0].is_stared ? <GradeIcon className="grade" /> : <StarOutlineIcon color="success" />}
                        </span>
                    </Typography>
                    <Box className="thread-icon-container">
                        <Typography className="otherOptions">{moment(item.session_data[0].time).format("DD/MM/YYYY LT")}</Typography>
                        <div className="d-flex justify-content-end">
                            <div className="p-2 bd-highlight">
                                {/* <span className="replyIcon" onClick={props.handleReplyClick}>
                                    <span>
                                        <ReplyAllIcon />
                                    </span>
                                    <span>{item.likeCount}</span>
                                </span> */}
                                {/* <span className="viewIcon" onClick={event => event.stopPropagation()}>
                                    <span>
                                        <ShareOutlinedIcon />
                                    </span>
                                </span> */}
                                <span className="viewIcon">
                                    <span>
                                        <DownloadPDFThreads pdfData={item.session_data} />
                                        {/* <FileDownloadOutlinedIcon /> */}
                                    </span>
                                    {/* <DownloadThread threads={item.session_data} /> */}
                                </span>
                            </div>
                            <div className="p-2 bd-highlight">
                                <span className="thumbUp" onClick={event => event.stopPropagation()}>
                                    <span>
                                        <ThumbUpOutlinedIcon />
                                    </span>
                                    <span>{item.like_counts}</span>
                                </span>
                                <span className="thumbDown" onClick={event => event.stopPropagation()}>
                                    <span>
                                        <ThumbDownAltOutlinedIcon />
                                    </span>
                                    <span>{item.dislike_counts}</span>
                                </span>
                            </div>
                        </div>
                    </Box>
                </Box>
            </>
        );
    };

    const ReplyComp = () => {
        const CommentData = [
            {
                name: "NaveenKolli",
                nameIcon: "N",
                commentDate: "25 Feb 2024, 10:30 AM",
                commentText:
                    "Yes, Last year also we had same numbers on this season. I have observed values based on sales progress and which is very low in Europe region. We need to focus on improving sales. I suggest we will provide discounts and best offers to get what we expected for the next quarter."
            },
            {
                name: "BharatBellamkonda",
                nameIcon: "B",
                commentDate: "25 Feb 2024, 11:30 AM",
                commentText:
                    "Yes, Last year also we had same numbers on this season. I have observed values based on sales progress and which is very low in Europe region. We need to focus on improving sales. I suggest we will provide discounts and best offers to get what we expected for the next quarter."
            }
        ];
        return (
            <>
                <Box className="reply-box">
                    <Box className="reply-box-top">
                        <Box component="span">Financial planing and Investment proposal discussion</Box>
                        <Box component="span">23 Feb 2024, 6:30 PM</Box>
                    </Box>
                    {CommentData.map((item, index) => (
                        <Box key={index} className="comment-box">
                            <Box className="comment-box-top">
                                <Box className="name-circle">{item.nameIcon}</Box>
                                <Box component="span">{item.name}</Box>
                                <Box component="span">{item.commentDate}</Box>
                            </Box>
                            <Typography className="comment-text">{item.commentText}</Typography>
                        </Box>
                    ))}
                </Box>
            </>
        );
    };

    useEffect(() => {
        getThreadData();
    }, [isStarred]);

    return (
        <>
            <Box className="chat-thread-container">
                <Box className="heading">
                    <ForumOutlinedIcon />
                    <h3 className="disply-page-title">CHAT THREADS & ARCHIVES</h3>
                </Box>
                <Box className="search-row">
                    <SearchBar
                        searchKey={""}
                        setSearchKey={function (value: any): void {
                            throw new Error("Function not implemented.");
                        }}
                    />
                    {/* <Box className="file-count">
                        <span>
                        Total no.of topics &nbsp;
                        </span>
                        <Box>8</Box>
                    </Box> */}
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            marginTop: "10px"
                        }}
                    >
                        <ButtonGroup className="mui-custom-toggle" variant="outlined" aria-label="Basic button group">
                            <Button className="mui-toggle-active">
                                <span className="iconText">
                                    <RemoveRedEyeOutlinedIcon className="viewIcon IconElemt" />
                                </span>
                                <span>By Views</span>
                            </Button>
                            <Button>
                                <span className="iconText">
                                    <SortOutlinedIcon className="ShortByIcon IconElemt" />
                                </span>
                                <span>By Date</span>
                            </Button>
                            <Button>
                                <span className="iconText">
                                    <GradeIcon className="grade ShortByIcon IconElemt" />
                                </span>
                                <span>By Star</span>
                            </Button>
                        </ButtonGroup>
                    </Box>
                </Box>
                <Divider sx={{ marginTop: "10px", marginBottom: "10px", borderColor: "var(--active-themes)" }} />
                <Box className="grid-container">
                    {(!props.isReplyDisplay && (
                        <>
                            {/* {Threads.map((item, index) => {
                                return <React.Fragment key={index}>{ThreadElements(item)}</React.Fragment>;
                            })} */}

                            {allThreads &&
                                allThreads.length > 0 &&
                                allThreads.map((item, index) => {
                                    return <React.Fragment key={index}>{<ThreadElements key={index} {...{ item }} />}</React.Fragment>;
                                })}
                        </>
                    )) || <ReplyComp />}
                </Box>
            </Box>
        </>
    );
};

export default ChatThreads;
