import React from "react";
import "./ChatThreads.scss";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import "bootstrap/dist/css/bootstrap.css";
import AssignForm from "./AssignForm";

const ChatThreadSession = (props: any) => {
    return (
        <>
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
            {props.isAssignClick && <AssignForm {...{ isAssignClick: props.isAssignClick }} />}
            <br></br>
        </>
    );
};

export default ChatThreadSession;
