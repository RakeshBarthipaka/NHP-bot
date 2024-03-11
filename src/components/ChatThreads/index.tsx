import React, { useState } from "react";
//import _ from "lodash";
import Box from "@mui/material/Box";
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
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import ReplyAllIcon from "@mui/icons-material/ReplyAll";
import { Threads } from "../../utils/MockData";

const ChatThreads = (props: any) => {
    const ThreadElements = (item: any) => {
        return (
            <>
                <Box
                    className={`thread-box ${props.activeChatThreadDetails?.id === item.id ? "active-thread-box" : ""}`}
                    onClick={() => props.runChatThread(item)}
                >
                    <Typography className="questionText">{item.question}</Typography>
                    <Box className="thread-icon-container">
                        <Typography className="otherOptions">{item.time} hour ago</Typography>
                        <span>
                            <span className="replyIcon" onClick={props.handleReplyClick}>
                                <span>
                                    <ReplyAllIcon />
                                </span>
                                <span>{item.likeCount}</span>
                            </span>
                            <span className="thumbUp" onClick={event => event.stopPropagation()}>
                                <span>
                                    <ThumbUpOutlinedIcon />
                                </span>
                                <span>{item.likeCount}</span>
                            </span>
                            <span className="thumbDown" onClick={event => event.stopPropagation()}>
                                <span>
                                    <ThumbDownAltOutlinedIcon />
                                </span>
                                <span>{item.dislikeCount}</span>
                            </span>
                            <span className="viewIcon" onClick={event => event.stopPropagation()}>
                                <span>
                                    <ShareOutlinedIcon />
                                </span>
                            </span>
                            <span className="viewIcon" onClick={event => event.stopPropagation()}>
                                <span>
                                    <FileDownloadOutlinedIcon />
                                </span>
                            </span>
                        </span>
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
                commentDate: "25 Feb 2024, 10:30 AM",
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

    return (
        <>
            <Box className="chat-thread-container">
                <Box className="heading">
                    <ForumOutlinedIcon />
                    <h3 className="disply-page-title">CHAT THREADS & ARCHIVES</h3>
                </Box>
                <Box className="search-row">
                    <SearchBar />
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center"
                        }}
                    >
                        <span className="iconText">
                            <HeightIcon className="IconElemt" />
                        </span>
                        <span className="iconText">By Name</span>
                        <span className="iconText">
                            <SortOutlinedIcon className="ShortByIcon IconElemt" />
                        </span>
                        <span className="iconText">By Date</span>
                    </Box>
                    <Box className="file-count">
                        Total no.of topics &nbsp;<Box>8</Box>
                    </Box>
                </Box>
                <Divider sx={{ marginTop: "10px", marginBottom: "10px", borderColor: "var(--active-themes)" }} />
                <Box className="grid-container">
                    {(!props.isReplyDisplay && (
                        <>
                            {Threads.map((item, index) => {
                                return <React.Fragment key={index}>{ThreadElements(item)}</React.Fragment>;
                            })}
                        </>
                    )) || <ReplyComp />}
                </Box>
            </Box>
        </>
    );
};

export default ChatThreads;
