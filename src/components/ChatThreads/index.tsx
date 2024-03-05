import React from "react";
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
import { Threads } from "../../utils/MockData";

const ChatThreads = (props: any) => {
    const ThreadElements = (item: any) => {
        return (
            <>
                <Box className="thread-box" onClick={() => props.runChatThread(item)}>
                    <Typography className="questionText">{item.question}</Typography>
                    <Box className="thread-icon-container">
                        <Typography className="otherOptions">{item.time} hour ago</Typography>
                        <span>
                            <span className="thumbUp">
                                <span>
                                    <ThumbUpOutlinedIcon />
                                </span>
                                <span>{item.likeCount}</span>
                            </span>
                            <span className="thumbDown">
                                <span>
                                    <ThumbDownAltOutlinedIcon />
                                </span>
                                <span>{item.dislikeCount}</span>
                            </span>
                            <span className="viewIcon">
                                <span>
                                    <ShareOutlinedIcon />
                                </span>
                            </span>
                            <span className="viewIcon">
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
    return (
        <>
            <Box className="chat-thread-container">
                <Box className="heading">
                    <ForumOutlinedIcon />
                    <h3 className="disply-page-title">CHAT THREADS & ARCHIVES</h3>
                </Box>
                <Box className="search-row">
                    <SearchBar />
                    <Box>
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
                <Divider sx={{ marginTop: "10px", marginBottom: "10px", borderColor: "#5376F0" }} />
                <Box className="grid-container">
                    {Threads.map((item, index) => {
                        return <React.Fragment key={index}>{ThreadElements(item)}</React.Fragment>;
                    })}
                </Box>
            </Box>
        </>
    );
};

export default ChatThreads;
