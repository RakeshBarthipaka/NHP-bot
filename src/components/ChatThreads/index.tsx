import React, { useState, useEffect } from "react";
//import _ from "lodash";
import { Avatar, Box, Button, ButtonGroup, Grid, Stack, TextField } from "@mui/material";

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
import { getApi, postApiQuery, postApiQueryText } from "../../api";
import jsPDF from "jspdf";
import DownloadPDFThreads from "../Answer/GeneratePDFThreads";
import moment from "moment";
import GradeIcon from "@mui/icons-material/Grade";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const ThreadElements = ({ item, props, makeStar, isStarred }: any) => {
    const [isEdit, setIsEdit] = useState(false);
    const [isText, setIsText] = useState("");
    const [isChatID, setChatID] = useState("");
    const [activeThread, setActiveThread] = useState("");
    

    const sendStarredThread = async (chatID: any) => {
        try {
            const response = await postApiQuery(`star`, "chat_id", chatID); //need to pass `userID` here
            makeStar();
        } catch (error) {
            console.log(error);
        }
    };

    const handleEdit = (text: any, chatId: any) => {
        setChatID(chatId);
        setIsText(text);
        setIsEdit(!isEdit);
    };

    const saveText = (id: any) => {
        const response = postApiQueryText("edit_session_title", "exchange_id", id, "title", isText);
        makeStar();
        setIsEdit(!isEdit);
    };

    const handleEnterKey = (event: any, id: any) => {
        if (event.key === "Enter") {
            const response = postApiQueryText("edit_session_title", "exchange_id", id, "title", isText);
            makeStar();
            setIsEdit(!isEdit);
        }
    };
    return (
        <>
            <Box
                //key={item?.chatID}
                className={`thread-box ${activeThread === item.chatID ? "active-thread-box" : ""}`}
                onClick={e => {
                    props.runChatThread(item);
                    setActiveThread(item?.chatID);
                }}
            
            >
                {/* <Typography className="questionText">{item.question}</Typography> */}
                <Typography className="questionText">
                    {!isEdit && item.session_data[0].question}
                    {isEdit && item?.chatID === isChatID && (
                        <TextField
                            value={isText}
                            onChange={(e: any) => {
                                setIsText(e.target.value);
                            }}
                            onKeyDown={e => handleEnterKey(e, item.session_data[0].id)}
                            onBlur={() => saveText(item.session_data[0].id)}
                        />
                    )}
                </Typography>
                {!isEdit ? (
                    <Box
                        component="span"
                        className="edit-icon"
                        onClick={e => {
                            handleEdit(item.session_data[0].question, item?.chatID);
                        }}
                    >
                        <BorderColorOutlinedIcon />
                    </Box>
                ) : (
                    <Box
                        component="span"
                        className="edit-icon"
                        // onClick={(e) => {
                        //     handleEdit(item.session_data[0].question, item?.chatID);
                        //     }}
                    >
                        <CheckCircleOutlineIcon color="success" />
                    </Box>
                )}

                <span
                    onClick={(e: any) => {
                        sendStarredThread(item?.chatID);
                    }}
                >
                    {item.session_data[0]?.is_stared ? <GradeIcon className="grade" /> : <StarOutlineIcon color="success" />}
                </span>

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
                            
                             <span onClick={event => event.stopPropagation()}>
                            <DownloadPDFThreads pdfData={item?.session_data} /> 
                            {/* <FileDownloadOutlinedIcon /> */}
                            </span> 
                            {/* <DownloadThread threads={item.session_data} /> */}
                            {/* </span> */}
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

const ChatThreads = (props: any) => {
    //let userID = localStorage.getItem("userID") ? localStorage.getItem("userID") : 0; //needs to be change
    const [allThreads, setThreads] = useState<any[]>([]);
    const [isStarred, setIsStarred] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [isText, setIsText] = useState("");
    const [isChatID, setChatID] = useState("");
    const [isSort, setSort] = useState("star");

    const makeStar = () => {
        setIsStarred(!isStarred);
    };

    const getThreadData = async () => {
        try {
            const response = await getApi(`chat_sessions/?user=${"user"}&&order_by=${isSort}`); //need to pass `userID` here
            if (response) {
                setThreads(response);
            }
        } catch (error) {
            setThreads([]);
        }
    };

    // const sendStarredThread = async (chatID: any) => {
    //     try {
    //         const response = await postApiQuery(`star`, "chat_id", chatID); //need to pass `userID` here
    //         setIsStarred(!isStarred);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    // const handleEdit = (text: any, chatId: any) => {
    //     setChatID(chatId);
    //     setIsText(text);
    //     setIsEdit(true);
    // };

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
    }, [isStarred, isSort]);

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
                            <Button className={isSort ==="like" ? "mui-toggle-active" : ""} onClick={()=> setSort("like")}>
                                <span className="iconText">
                                    
                                    <ThumbUpOutlinedIcon className="viewIcon IconElemt"/>
                                </span>
                                <span>By Likes</span>
                            </Button>
                            <Button className={isSort ==="time" ? "mui-toggle-active" : ""} onClick={()=> setSort("time")}>
                                <span className="iconText">
                                    <SortOutlinedIcon className="ShortByIcon IconElemt" />
                                </span>
                                <span>By Date</span>
                            </Button>
                            <Button className={isSort ==="star" ? "mui-toggle-active" : ""} onClick={()=> setSort("star")}>
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
                                allThreads?.length > 0 &&
                                allThreads?.map(item => {
                                    return <Box>{<ThreadElements {...{ item, props, setIsStarred, makeStar }} />}</Box>;
                                })}
                        </>
                    )) || <ReplyComp />}
                </Box>
            </Box>
        </>
    );
};

export default ChatThreads;
