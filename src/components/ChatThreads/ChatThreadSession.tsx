import React, { useState } from "react";
import "./ChatThreads.scss";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
//import Button from "@mui/material/Button";
//import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import Divider from "@mui/material/Divider";
import CModal from "../Common/Modal/index";
import "bootstrap/dist/css/bootstrap.css";
import SearchBar from "../Common/SearchBar";
import { Threads } from "../../utils/MockData";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

const ChatThreadSession = (props: any) => {
    const [modalShow, setModalShow] = useState<boolean>(false);
    const [isRemoveTopic, setIsRemoveTopic] = useState<boolean>(false);
    const toggleModal = () => {
        setModalShow(!modalShow);
    };
    const handleTopicPopupModal = () => {
        toggleModal();
    };

    const handleAddTopics = (obj: any) => {
        toggleModal();
        setIsRemoveTopic(false);
        console.log("obj======:", obj);
    };

    const handleRemoveTopic = () => {
        setIsRemoveTopic(true);
    };

    return (
        <>
            {modalShow && (
                <CModal show={modalShow} onHide={toggleModal} size="md">
                    <Typography variant="h5" sx={{ textAlign: "center" }}>
                        Saved Topics
                    </Typography>
                    <Typography sx={{ fontSize: "12px", textAlign: "center" }}>
                        All Saved chat threads will be listed here, displaying with the names you saved.
                    </Typography>
                    <Typography sx={{ fontSize: "12px", textAlign: "center" }}>Choose any topic and tag to conversation</Typography>
                    <Box className="add-topic-search-container">
                        <SearchBar />
                    </Box>
                    {Threads.map((item, index) => (
                        <Box key={index} className="topicsBoxMain" onClick={() => handleAddTopics(item)}>
                            <Box className="topicsBox">
                                <Typography sx={{ fontSize: "14px" }}>{item.question}</Typography>
                            </Box>
                        </Box>
                    ))}
                    <footer className="modelFooter"></footer>
                </CModal>
            )}
            <Box className="chatThreadBox">
                <Typography>
                    <Box component="span" fontWeight="bold">
                        Topic Name:&nbsp;
                    </Box>
                    {props.activeChatThreadDetails.question}
                </Typography>
                <Box className="assignBtn" onClick={props.handleAssign}>
                    Assign
                </Box>
            </Box>
            {props.isAssignClick && (
                <Box className="chatThreadAssignedBox">
                    <Typography>
                        <Box component="span" fontWeight="bold">
                            Comments:
                        </Box>{" "}
                        Let us discuss on this point
                    </Typography>
                    <Typography>
                        <Box component="span" fontWeight="bold">
                            Tag to:
                        </Box>
                    </Typography>
                    <Divider sx={{ borderColor: "#898989" }} />
                    <Box className="addMoreTopicsBox">
                        <Box component="span" className="textSpan" onClick={handleTopicPopupModal}>
                            + Add More Topics
                        </Box>
                        <Box>
                            {!isRemoveTopic && (
                                <Box className="addedTopicsBox">
                                    <Typography sx={{ fontSize: "14px", display: "inline" }}>Monthly Report</Typography>
                                    <Box component="span" className="removeElmnt" onClick={handleRemoveTopic}>
                                        <CloseOutlinedIcon />
                                    </Box>
                                </Box>
                            )}
                        </Box>
                        <Box component="span" className="postSpan">
                            POST
                        </Box>
                    </Box>
                </Box>
            )}
        </>
    );
};

export default ChatThreadSession;
