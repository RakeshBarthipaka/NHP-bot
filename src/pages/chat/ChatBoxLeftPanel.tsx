import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./ChatBoxLeftPanel.module.css";
import { RecommendedFAQ } from "../../components/FAQ";
import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";
import { UploadedDocumentView } from "../../components/UploadedDocument";
import PreviousThreads from "../../components/Threads/Threads";
import { TrendingQuestionAnswer } from "../../components/Trending";
import { useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import LeaderBoard from "../../assets/images/LeaderBoard.svg";
import DeepAnalysis from "../../assets/images/DeepAnalysis.svg";
import Analytics from "../../assets/images/Analytics.svg";
import ChatThreads from "../../assets/images/ChatThreads.svg";
import Uploads from "../../assets/images/Uploads.svg";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import LeaderboardOutlinedIcon from "@mui/icons-material/LeaderboardOutlined";
import TroubleshootOutlinedIcon from "@mui/icons-material/TroubleshootOutlined";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";

interface Props {
    onClearChatClicked: () => void;
    onExampleClicked: (value: string) => void;
    onShowHistoryClicked: (value: boolean) => void;
    onFileViewURLClicked: (value: string) => void;
    toggleChatRightContent: () => void;
    toggleLeaderBoard: () => void;
    toggleUploads: () => void;
    toggleDeepAnalysis: () => void;
    chatData: Array<Object>;
    showThreads: (value: any) => void;
    toggleChatThreads: () => void;
}

const ChatBoxLeftPanel = ({
    onClearChatClicked,
    onExampleClicked,
    onShowHistoryClicked,
    onFileViewURLClicked,
    chatData,
    showThreads,
    toggleChatRightContent,
    toggleLeaderBoard,
    toggleUploads,
    toggleDeepAnalysis,
    toggleChatThreads
}: Props) => {
    let chatGPTToken = localStorage.getItem("chatGPTToken") ? localStorage.getItem("chatGPTToken") : 0;
    let chatTemperature = localStorage.getItem("chatTemperature") ? localStorage.getItem("chatTemperature") : 0;
    const [activeThread, setActiveThread] = useState<string | null>(null);
    const [isRightPanelOpen, setIsRightPanelOpen] = useState(false);

    const { colorCode } = useSelector((state: any) => state.theme.color);
    const ThemedSlider = styled(Slider)`
        color: ${colorCode};
        & .MuiSlider-mark {
            color: ${colorCode};
            opacity: 0.4;
        }
        ,
        & .MuiSlider-markActive {
            background-color: ${colorCode};
        }
    `;

    const setChatTemperature = (value: number) => {
        localStorage.setItem("chatTemperature", `${value}`);
        return `${value}`;
    };
    const setChatGPTToken = (value: number) => {
        localStorage.setItem("chatGPTToken", `${value}`);
        return `${value}`;
    };

    const newThread = () => {
        //@ts-ignore
        let threads = JSON.parse(localStorage.getItem("threads")) || [];
        if (chatData.length) {
            let completeThread = { thread: chatData };
            threads?.push(completeThread);
            localStorage.setItem("threads", JSON.stringify(threads));
        }
        localStorage.removeItem("currentThread");
        setActiveThread("");
        onClearChatClicked();
    };

    const toggleisRightPanelOpen = () => {
        setIsRightPanelOpen(current => !current);
        console.log(isRightPanelOpen);
    };

    return (
        <>
            <div className={`${styles.leftSidePanel} ` + (isRightPanelOpen ? styles.show : "")}>
                <div className={styles.sidePanelBtn} onClick={toggleisRightPanelOpen}>
                    <ArrowLeftIcon />
                </div>
                <div className={styles.featuresIconList}>
                    <div
                        className={styles.iconContainer}
                        onClick={() => {
                            toggleisRightPanelOpen();
                            toggleLeaderBoard();
                        }}
                    >
                        {/* <img src={LeaderBoard} alt="Leader Board" /> */}
                        <LeaderboardOutlinedIcon />
                        <p className={styles.labelName}>Leader Board</p>
                    </div>
                    <div onClick={()=> {
                        toggleisRightPanelOpen();
                        toggleDeepAnalysis();
                    }} className={styles.iconContainer}>
                        <TroubleshootOutlinedIcon sx={{
                            color: '#0C099C',
                        }} />
                        {/* <img src={DeepAnalysis} alt="Deep Analysis" /> */}
                        <p className={styles.labelName}>Deep Analysis</p>
                    </div>
                    <div className={styles.iconContainer}>
                        {/* <img src={Analytics} alt="Analytics" /> */}
                        <TimelineOutlinedIcon />
                        <p className={styles.labelName}>Analytics</p>
                    </div>
                    <div
                        className={styles.iconContainer}
                        onClick={() => {
                            toggleisRightPanelOpen();
                            toggleChatThreads();
                        }}
                    >
                        <ForumOutlinedIcon />
                        <p className={styles.labelName}>Chat Threads</p>
                    </div>
                    <div
                        className={styles.iconContainer}
                        onClick={() => {
                            toggleisRightPanelOpen();
                            toggleUploads();
                        }}
                    >
                        {/* <img src={Uploads} alt="Uploads" /> */}
                        <CloudUploadOutlinedIcon />
                        <p className={styles.labelName}>Uploads</p>
                    </div>
                </div>

                {/* <div>
                        <OpenInNewIcon/>
                    </div> */}

                {/* <TrendingQuestionAnswer onExampleClicked={onExampleClicked} />
                    <PreviousThreads threadCallBack={showThreads} activeThread={activeThread} setActiveThread={setActiveThread} chatData={chatData} />

                    <RecommendedFAQ onExampleClicked={onExampleClicked} />
                    <UploadedDocumentView onFileViewURLClicked={onFileViewURLClicked} />
                    <Box
                        className={`${styles.temperatureTokenBlock} chatGPTConfigGuide`}
                        sx={{ maxWidth: 240, display: "flex", flexDirection: "column", margin: "10px auto 60px", padding: "1rem", gap: "12px" }}
                    >
                        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                            <p style={{ margin: 0, fontWeight: "bold",  color: 'var(--active-themes)' }}>Temperature</p>
                            <ThemedSlider
                                aria-label="Small"
                                defaultValue={Number(chatTemperature)}
                                getAriaValueText={setChatTemperature}
                                step={0.1}
                                valueLabelDisplay="auto"
                                max={2}
                                marks={[
                                    {
                                        value: 0,
                                        label: "0"
                                    },
                                    {
                                        value: 2,
                                        label: "2"
                                    }
                                ]}
                            />
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                            <p style={{ margin: 0, fontWeight: "bold", color: 'var(--active-themes)' }}>Token</p>
                            <ThemedSlider
                                aria-label="Token"
                                defaultValue={Number(chatGPTToken)}
                                getAriaValueText={setChatGPTToken}
                                step={1}
                                valueLabelDisplay="auto"
                                max={8000}
                                min={0}
                                marks={[
                                    {
                                        value: 0,
                                        label: "0"
                                    },
                                    {
                                        value: 8000,
                                        label: "8000"
                                    }
                                ]}
                            />
                        </div>
                    </Box> */}
            </div>
        </>
    );
};

export default ChatBoxLeftPanel;
