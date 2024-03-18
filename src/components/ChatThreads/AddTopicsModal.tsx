import React from "react";
import CModal from "../Common/Modal";
import SearchBar from "../Common/SearchBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Threads } from "../../utils/MockData";

const AddTopicsModal = (props: any) => {
    return (
        <>
            <CModal show={props.modalShow} onHide={props.toggleModal} size="md">
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
                    <Box key={index} className="topicsBoxMain" onClick={() => props.handleAddTopics(item)}>
                        <Box className="topicsBox">
                            <Typography sx={{ fontSize: "14px" }}>{item.question}</Typography>
                        </Box>
                    </Box>
                ))}
                <footer className="modelFooter"></footer>
            </CModal>
        </>
    );
};

export default AddTopicsModal;
