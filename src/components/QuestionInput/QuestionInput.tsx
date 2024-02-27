import { useState } from "react";
import { Stack, TextField } from "@fluentui/react";
import { Send28Filled, Mic28Filled, Speaker028Filled, SpeakerMute28Filled, ChevronDown20Regular } from "@fluentui/react-icons";
import styles from "./QuestionInput.module.css";
import azureSpeakerVoiceList from "../../utils/azureSpeakerVoiceList";
import { useSelector } from "react-redux";

import VolumeUpOutlinedIcon from '@mui/icons-material/VolumeUpOutlined';
import VolumeOffOutlinedIcon from '@mui/icons-material/VolumeOffOutlined';
import KeyboardVoiceOutlinedIcon from '@mui/icons-material/KeyboardVoiceOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';

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


export const QuestionInput = ({ onSend, disabled, placeholder, clearOnSend, onSelectChatBotTypes, handleMicClick, handleSpeakerClick, isSpeakerOn, isListen, chatBotVoice }: Props) => {
    const [question, setQuestion] = useState<string>("");
    const [dropDown, setDropDown] = useState<boolean>(false);
    const { colorCode, class:themeClass} = useSelector((state:any)=>state.theme.color)


    const sendQuestion = () => {
        if (disabled || !question.trim()) {
            return;
        }

        onSend(question);

        if (clearOnSend) {
            setQuestion("");
        }
    };

    const onEnterPress = (ev: React.KeyboardEvent<Element>) => {
        if (ev.key === "Enter" && !ev.shiftKey) {
            ev.preventDefault();
            sendQuestion();
        }
    };

    const onQuestionChange = (_ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
        if (!newValue) {
            setQuestion("");
        } else if (newValue.length <= 1000) {
            setQuestion(newValue);
        }
    };

    const sendQuestionDisabled = disabled || !question.trim();

    return (
        <Stack horizontal className={`${styles.questionInputContainer}`} style={{border:`1px solid ${colorCode}`}}>
          
            <TextField
                className={`${styles.questionInputTextArea} chatboxTourGuide`}
                placeholder={placeholder}
                resizable={false}
                borderless
                value={question}
                onChange={onQuestionChange}
                onKeyDown={onEnterPress}
            />

            <div className={`${styles.questionInputMicSpeakerBtn} speechServiceTourGuide`}>
                {isListen ? (
                    // <Mic28Filled className={`${styles.microphoneRecognize} ${themeClass}`} onClick={handleMicClick} />
                    <KeyboardVoiceOutlinedIcon className={`${styles.microphoneRecognize} ${themeClass}`} onClick={handleMicClick}  />
                ) : <Mic28Filled primaryFill={colorCode} onClick={handleMicClick} />
                }
                {isSpeakerOn ? (
                    // <Speaker028Filled className={`${styles.speakersoundAnimation} ${themeClass}`} onClick={handleSpeakerClick} />
                    <VolumeUpOutlinedIcon className={`${styles.speakersoundAnimation} ${themeClass}`} onClick={handleSpeakerClick}/>
                ) : 
                // <SpeakerMute28Filled primaryFill={colorCode} onClick={handleSpeakerClick} />
                <VolumeOffOutlinedIcon sx={{color: colorCode}} onClick={handleSpeakerClick}/>
                }
            </div>

            <div className={styles.questionInputButtonsContainer}>
                <div
                    className={`${styles.questionInputSendButton} ${sendQuestionDisabled ? styles.questionInputSendButtonDisabled : ""}`}
                    aria-label="Ask question button"
                    onClick={sendQuestion}
                >
                    {/* <Send28Filled primaryFill={colorCode} /> */}
                    <SendOutlinedIcon sx={{color: "#fff"}}/>
                </div>
            </div>
        </Stack>
    );
};
