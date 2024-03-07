import React from "react";
import "./ChatThreads.scss";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
//import Button from "@mui/material/Button";
//import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import Divider from "@mui/material/Divider";

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
                    <Divider />
                    <Box className="addMoreTopicsBox">
                        <Box component="span" className="textSpan">
                            + Add More Topics
                        </Box>
                        <Box component="span" className="postSpan">
                            POST
                        </Box>
                    </Box>
                </Box>
            )}
            <br></br>
        </>
    );
};

export default ChatThreadSession;
