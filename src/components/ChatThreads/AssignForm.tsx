import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import Divider from "@mui/material/Divider";
import AddTopicsModal from "./AddTopicsModal";

type addedTopics = {
    id: number;
    question: string;
};

const AssignForm = (props: any) => {
    const [modalShow, setModalShow] = useState<boolean>(false);
    const [addedTopics, setAddedTopics] = useState<addedTopics[]>([]);
    const [isPosted, setIsPosted] = useState<boolean>(false);

    const toggleModal = () => {
        setModalShow(!modalShow);
    };

    const handleTopicPopupModal = () => {
        toggleModal();
    };

    const handleAddTopics = (obj: any) => {
        toggleModal();
        setAddedTopics([...addedTopics, { id: obj.id, question: obj.question }]);
    };

    const handleRemoveTopic = (id: any) => {
        setAddedTopics(addedTopics.filter(item => item.id !== id));
    };

    const handlePost = () => {
        setIsPosted(true);
    };
    return (
        <>
            {modalShow && <AddTopicsModal {...{ modalShow, toggleModal, handleAddTopics }} />}
            {(!isPosted && (
                <>
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
                                <Box className="user-box">abc@gmail.com</Box>
                                <Box className="user-box">xyz@gmail.com</Box>
                            </Box>
                        </Typography>
                        <Divider sx={{ borderColor: "#898989" }} />
                        <Box className="addMoreTopicsBox">
                            <Box component="span" className="textSpan" onClick={handleTopicPopupModal}>
                                + Add More Topics
                            </Box>
                            <Box>
                                {addedTopics.length !== 0 && (
                                    <>
                                        {addedTopics.map((item, index) => (
                                            <Box key={index} className="addedTopicsBox">
                                                <Typography sx={{ fontSize: "14px", display: "inline" }}>{item.question}</Typography>
                                                <Box component="span" className="removeElmnt" onClick={() => handleRemoveTopic(item.id)}>
                                                    <CloseOutlinedIcon />
                                                </Box>
                                            </Box>
                                        ))}
                                    </>
                                )}
                            </Box>
                            <Box component="span" className="postSpan" onClick={handlePost}>
                                POST
                            </Box>
                        </Box>
                    </Box>
                </>
            )) || (
                <>
                    <Typography className="success-msg-container">Your post has been sent successfully</Typography>
                </>
            )}
        </>
    );
};

export default AssignForm;
