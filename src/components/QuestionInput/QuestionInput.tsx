import React, { useEffect, useState } from "react";
import { Stack } from "@fluentui/react";
import { Send28Filled, Mic28Filled, Speaker028Filled, SpeakerMute28Filled, ChevronDown20Regular } from "@fluentui/react-icons";
import styles from "./QuestionInput.module.css";
import azureSpeakerVoiceList from "../../utils/azureSpeakerVoiceList";
import { useSelector } from "react-redux";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import VolumeUpOutlinedIcon from "@mui/icons-material/VolumeUpOutlined";
import VolumeOffOutlinedIcon from "@mui/icons-material/VolumeOffOutlined";
import KeyboardVoiceOutlinedIcon from "@mui/icons-material/KeyboardVoiceOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";

interface Props {
    onSend: (question: string) => void;
    disabled: boolean;
    placeholder?: string;
    clearOnSend?: boolean;
    onSelectChatBotTypes: (chatBotVoice: any) => void;
    handleMicClick: () => void;
    handleSpeakerClick: () => void;
    isSpeakerOn?: boolean;
    isListen?: boolean;
    chatBotVoice: any
}

export const QuestionInput = ({
    onSend,disabled,placeholder,
    clearOnSend,
    onSelectChatBotTypes,
    handleMicClick,
    handleSpeakerClick,isSpeakerOn,
    isListen,chatBotVoice
}: Props) => {
    const [question, setQuestion] = useState<string>("");
    const [options, setOptions] = useState<any[]>([]);
    const { colorCode, class: themeClass } = useSelector((state: any) => state.theme.color);

    const sendQuestion = () => {
        if (disabled || !question.trim()) {
            return;
        }
        onSend(question);
        if (clearOnSend) {
            setOptions([]);
            setQuestion("");
        }
    };

    const onEnterPress = (ev: React.KeyboardEvent<Element>) => {
        if (ev.key === "Enter" && !ev.shiftKey) {
            ev.preventDefault();
            sendQuestion();
            setQuestion("");
        }
    };

    const onQuestionChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = ev.target.value;
        if (!newValue) {
            setQuestion("");
        } else if (newValue.length <= 1000) {
            setQuestion(newValue);
        }
    };
    const sendQuestionDisabled = disabled || !question.trim();
    const makeApiCall = async () => {
        try {
             const response = await fetch(`${question}`);
            // const response = await fetch(`http://20.193.133.240:8544/autocomplete?question=${question}&closest_matches=5`);
            const data = await response.json();
            if (data.results) {
                setOptions(data.results.map((result: any) => ({ label: result })));
            }
        } catch (error) {
            console.log("Error", error);
        }
    };
    useEffect(() => {
        makeApiCall();
    }, [question]);

    return (
        <Stack horizontal className={`${styles.questionInputContainer}`} style={{ border: `1px solid ${colorCode}` }}>
            <Autocomplete
                className={`${styles.questionInputTextArea} chatboxTourGuide`}
                sx={{
                    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                        borderColor: "transparent" // Make the border transparent
                    },
                    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                        borderColor: "transparent" // Make the border transparent on hover
                    },
                    "&.Mui-focused .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                        borderColor: "transparent" // Make the border transparent when focused
                    }
                }}
                id="combo-box-demo"
                options={options}
                onChange={(event, newValue) => {
                    if (newValue) {
                        setQuestion(newValue.label);
                    }
                }}
                renderInput={params => (
                    <TextField {...params} placeholder={placeholder} onChange={onQuestionChange} onKeyDown={onEnterPress} value={question} />
                )}
            />

            <div className={`${styles.questionInputMicSpeakerBtn} speechServiceTourGuide`}>
                {isListen ? (
                    <KeyboardVoiceOutlinedIcon className={`${styles.microphoneRecognize}`} onClick={handleMicClick} />
                ) : (
                    <Mic28Filled primaryFill={colorCode} onClick={handleMicClick} />
                )}
                {isSpeakerOn ? (
                    <VolumeUpOutlinedIcon className={`${styles.speakersoundAnimation}`} onClick={handleSpeakerClick} />
                ) : (
                    <VolumeOffOutlinedIcon sx={{ color: colorCode }} onClick={handleSpeakerClick} />
                )}
            </div>

            <div className={styles.questionInputButtonsContainer}>
                <div
                    className={`${styles.questionInputSendButton} ${sendQuestionDisabled ? styles.questionInputSendButtonDisabled : ""}`}
                    aria-label="Ask question button"
                    onClick={() => {sendQuestion}}
                >
                    <SendOutlinedIcon sx={{ color: "#fff" }} />
                </div>
            </div>
        </Stack>
    );
};
