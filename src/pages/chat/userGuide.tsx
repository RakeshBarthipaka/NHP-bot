import React, { useState, useRef } from 'react';
import Joyride from 'react-joyride';
import { Button, Typography } from '@mui/material';
import styles from "./Chat.module.css";
import { useSelector } from "react-redux";



const UserGuide = () => {
    const [runTour, setRunTour] = useState(false);
    const isUserTourGuide = localStorage.getItem("isUserTourGuide") ? localStorage.getItem("isUserTourGuide") : false;
    const { color } = useSelector((state: any) => state.theme.color);

    const steps = [
        {
            target: '.chatboxTourGuide',
            content: 'The chat box is where you can initiate conversations by typing your messages. Start engaging with the chatbot here!',
            disableBeacon: true,
        },
        {
            target: '.resetChatTourGuide',
            content: 'Click this button to reset the chat conversation and start anew if needed.',
        },
        {
            target: '.speechServiceTourGuide',
            content: 'Click the 🎙️ microphone icon to initiate speech recognition for hands-free interaction. Use the 🔊 sound icon to enable or disable text synthesis.',
        },
        {
            target: '.selectVoiceTourGuide',
            content: 'Customize the chatbot voice by selecting from available male/female avatars for a personalized interaction.',
        },
        {
            target: '.chatGPTConfigGuide',
            content: 'Fine-tune advanced settings like ChatGPT temperature and token configurations to enhance chatbot responses.',
        },
        {
            target: '.dcoumentUploadGuide',
            content: 'Upload PDF files here for the chatbot to read and analyze, expanding its knowledge and responses.',
        },
        {
            target: '.StartYourConversationGuide',
            content: 'Click & Start the conversation with a suggested question.',
        }
    ];

    const handleStartTour = () => {
        setRunTour(true);
    };

    const handleTourEnd = () => {
        localStorage.setItem("isUserTourGuide", JSON.stringify(true))
        setRunTour(false);
    };


    return (
        <>
            {!isUserTourGuide && (
                <div className={!runTour ? styles.userGuideBlock : ""}>
                    {!runTour && (
                        <div style={{ textAlign: 'center' }}>
                            <Typography variant='h5' color="white" style={{ margin: '20px 0', marginTop: "15%" }}>
                                Welcome to the guide! This will walk you through the application's features. 👍
                            </Typography>
                            <Button style={{background:color}}  variant='contained' onClick={handleStartTour}>Start Guide</Button>
                        </div>
                    )}
                    <Joyride
                        steps={steps}
                        run={runTour}
                        showSkipButton
                        continuous
                        spotlightClicks={false}
                        disableOverlayClose
                        callback={(data: any) => {
                            if (data.action === 'reset' || data.action==='close') {
                                handleTourEnd();
                            }
                        }}
                    />
                </div>
            )}
        </>
    );
};

export default UserGuide;
