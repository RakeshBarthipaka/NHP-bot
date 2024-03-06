import { useMemo, useState, useRef, useEffect, useContext } from "react";
import { Stack, IconButton, IStackProps, MessageBar, MessageBarType } from "@fluentui/react";
import DOMPurify from "dompurify";
import styles from "./Answer.module.css";

import { AskResponse, feedBackApi, feedbackRequest, exportChatbotApi } from "../../api";
import { parseAnswerToHtml } from "./AnswerParser";
import { Link } from "react-router-dom";
import LogoWhiteTransparent from "../../assets/CGLense_app_logo_v3.png";
import DislikeAnswerForm from "./DislikeForm";
import DownloadPDF from "./GeneratePDF";
import AppointmentsBookingList from "../Appointment/AppointmentsBookingList";
import ScheduleAppointment from "../Appointment/AppointmentBooking";
import { EmailConfirm } from "../Appointment/EmailConfirm";
import HospitalList from "../Appointment/HospitalList";
import { Avatar, Button, Divider } from "@mui/material";
import { useSelector } from "react-redux";
import { GenerateTable } from "../Tables/GenerateTable";
import { TagsList } from "../TagsList/TagsList";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbDownAltOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";

interface Props {
    answer: AskResponse;
    isSelected?: boolean;
    onCitationClicked: (filePath: string) => void;
    onThoughtProcessClicked: () => void;
    onSupportingContentClicked: () => void;
    onFollowupQuestionClicked?: (question: string) => void;
    onLogsContentClicked: () => void;
    showFollowupQuestions?: boolean;
    questionAnswersList: [];
    projectData: any;
    onExampleClicked: (value: string) => void;
}

const AlertBoxError = () => (
    <MessageBar messageBarType={MessageBarType.error} isMultiline={false}>
        API Request Error
    </MessageBar>
);

const AlertBoxSuccess = () => (
    <MessageBar messageBarType={MessageBarType.success} isMultiline={false}>
        Thank you for your feedback
    </MessageBar>
);

export const Answer = ({
    answer,
    isSelected,
    onCitationClicked,
    onThoughtProcessClicked,
    onSupportingContentClicked,
    onFollowupQuestionClicked,
    onLogsContentClicked,
    showFollowupQuestions,
    questionAnswersList,
    projectData,
    onExampleClicked
}: Props) => {
    const parsedAnswer = useMemo(() => parseAnswerToHtml(answer.answer, onCitationClicked), [answer]);
    const sanitizedAnswerHtml = DOMPurify.sanitize(parsedAnswer.answerHtml).replace(/href/g, "target='_blank' href");
    const { colorCode } = useSelector((state: any) => state.theme.color);

    const [showAlertBox, setShowAlertBox] = useState(false);
    const [errorTypes, setErrorTypes] = useState("error");
    const [showLike, setShowLike] = useState(false);
    const [showDisLike, setShowDisLike] = useState(false);
    const [showCommentBox, setshowCommentBox] = useState(false);
    const messageRef = useRef<HTMLDivElement>(null);
    const [shareIconStyle, setShareIconStyle] = useState<any>({ display: "none" });

    useEffect(() => {
        if (messageRef.current) {
            messageRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
                inline: "nearest"
            });
        }
    });

    const shareDropDownToggle = () => {
        if (shareIconStyle.display === "block") {
            setShareIconStyle({ display: "none" });
        } else {
            setShareIconStyle({ display: "block" });
        }
    };

    const copyChatData = async () => {
        navigator.clipboard.writeText(answer.answer);
        setShareIconStyle({ display: "none" });
    };

    const likeDisLikeAnswerToggle = (user_reaction: string) => {
        if (user_reaction === "DISLIKE") {
            if (showDisLike) {
                setShowDisLike(false);
                setshowCommentBox(false);
            } else {
                setshowCommentBox(true);
                setShowLike(false);
            }
        }

        if (user_reaction === "LIKE") {
            if (showLike) {
                setShowDisLike(false);
                setShowLike(false);
                setshowCommentBox(false);
            } else {
                setShowDisLike(false);
                setShowLike(true);
                setshowCommentBox(false);
                likeDisLikeAnswer(user_reaction);
            }
        }
    };

    const likeDisLikeAnswer = async (user_reaction: string) => {
        const request: feedbackRequest = {
            exchange_id: answer.exchange_id,
            answer: answer.answer,
            reaction: user_reaction,
            additional_comments: "",
            comment_categories: []
        };

        try {
            const result = await feedBackApi(request);
            if (result.status === "PASS") {
                if (user_reaction === "LIKE") {
                    setShowAlertBox(true);
                    setErrorTypes("success");
                    setTimeout(() => {
                        setErrorTypes("error");
                        setShowAlertBox(false);
                    }, 4000);
                }
            } else {
                setShowAlertBox(true);
                setTimeout(() => {
                    setShowAlertBox(false);
                }, 4000);
            }
        } catch (e) {
            setShowAlertBox(true);
            setTimeout(() => {
                setShowAlertBox(false);
            }, 4000);
        }
    };

    const SpacingColumnProps: Partial<IStackProps> = {
        tokens: { childrenGap: 20 },
        styles: { root: { padding: 15 } }
    };

    const IconStyles = { color: "blue", borderRadius: "8px" };
    const IconActiveStyles = { backgroundColor: "lightgray", borderRadius: "8px" };

    return (
        <>
            <Stack verticalAlign="space-between" {...SpacingColumnProps} className={` ${styles.answerContainerDiv}`}>
                <Stack.Item>
                    <Stack horizontal horizontalAlign="space-between" className={styles.answerLogo}>
                        {/* <img src={projectData ? projectData.projectLogoPath : LogoWhiteTransparent} width="100%" height={projectData ? projectData.projectLogoHeight : "30px"} /> */}
                        <img src="static\assets\cglense_icon_logo.png" width="40px" />
                    </Stack>
                </Stack.Item>
                <Stack className={`${styles.answerContainer} ${isSelected && styles.selected}`} verticalAlign="space-between">
                    <Stack.Item grow>
                        <div className={styles.answerText} dangerouslySetInnerHTML={{ __html: sanitizedAnswerHtml }}></div>
                        {/* <GenerateTable></GenerateTable> */}

                        {/* { answer.patientemail && answer.patientemail.length > 0 &&  !answer.patientemailconfirm &&
                        <EmailConfirm onExampleClicked={onExampleClicked} patientemail={answer.patientemail}/>
                    }
                    { answer.appointmentlimit  &&
                       <Button size='small' variant="contained" style={{marginBottom:"1.5rem", background:colorCode}} onClick={()=>onExampleClicked("show my bookings")}>Show my bookings</Button>
                    }

                    { answer.hospitallist && answer.hospitallist.length > 0 &&  
                        <HospitalList onExampleClicked={onExampleClicked} hospitallist={answer.hospitallist}/>
                    }
                    {
                        answer.doctorlist && answer.doctorlist.length > 0 && (
                            <ScheduleAppointment events={answer.doctorlist} onExampleClicked={onExampleClicked} />
                        )
                    }

                    {
                        answer.appointmentlist && answer.appointmentlist.length > 0 && (
                            <AppointmentsBookingList events={answer.appointmentlist} onExampleClicked={onExampleClicked} />
                        )
                    } */}
                    </Stack.Item>

                    <Stack>
                        <div className={` ${styles.IconCustomColor}`}>
                            {/* <IconButton
                            style={showLike ? IconActiveStyles : IconStyles}
                            iconProps={{ iconName: "like" }}
                            title="Good response"
                            ariaLabel="Like Answer"
                            // disabled={true}
                            onClick={() => likeDisLikeAnswerToggle("LIKE")}
                        /> */}
                            {/* <span onClick={downloadAsPdf}></span> */}
                            <span onClick={() => likeDisLikeAnswerToggle("LIKE")}>
                                <Avatar sx={{ bgcolor: "rgba(42, 193, 65, 0.2)", color: "rgba(42, 193, 65, 1)" }}>
                                    {" "}
                                    <ThumbUpAltOutlinedIcon />
                                </Avatar>
                            </span>
                            <span onClick={() => likeDisLikeAnswerToggle("DISLIKE")}>
                                <Avatar sx={{ bgcolor: "rgba(255, 69, 58, 0.2)", color: "rgba(255, 69, 58, 1)" }}>
                                    {" "}
                                    <ThumbDownAltOutlinedIcon />
                                </Avatar>
                            </span>

                            {/* <IconButton
                            style={showDisLike ? IconActiveStyles : IconStyles}
                            iconProps={{ iconName: "dislike" }}
                            title="Bad Response"
                            ariaLabel="Dislike Answer"
                            // disabled={true}
                            onClick={() => likeDisLikeAnswerToggle("DISLIKE")}
                        /> */}
                            <Divider className={styles.iconDivider} orientation="vertical" />
                            <span title="Copy Data" onClick={() => copyChatData()}>
                                <Avatar
                                    sx={{
                                        bgcolor: "var(--bg-primary-light)",
                                        color: "var(--active-themes)",
                                        "&:hover": {
                                            backgroundColor: "var(--bg-secondary)",
                                            color: "#fff"
                                        }
                                    }}
                                >
                                    {" "}
                                    <ContentCopyOutlinedIcon />
                                </Avatar>
                            </span>

                            {/* <IconButton
                                iconProps={{ iconName: "Copy" }}
                                title="Copy Data"
                                ariaLabel="Copy Data"
                                // disabled={true}
                                onClick={() => copyChatData()}
                            /> */}
                            <span>
                                <DownloadPDF pdfData={questionAnswersList} />
                            </span>
                            <span onClick={() => copyChatData()}>
                                <Avatar
                                     sx={{
                                        bgcolor: "var(--bg-primary-light)",
                                        color: "var(--active-themes)",
                                        "&:hover": {
                                            backgroundColor: "var(--bg-secondary)",
                                            color: "#fff"
                                        }
                                    }}
                                >
                                    {" "}
                                    <MailOutlineOutlinedIcon />
                                </Avatar>
                            </span>

                            {/* <IconButton
                            //     iconProps={{ iconName: "Mail" }}
                            //     title="Export to PDF"
                            //     ariaLabel="Export to PDF"
                            //     // disabled={true}
                            //     onClick={() => copyChatData()}
                            // /> */}
                            <Divider className={styles.iconDivider} orientation="vertical" />

                            {/* <div className={styles.dropdown}>
                            <IconButton
                                style={shareIconStyle.display === "block" ? IconActiveStyles : IconStyles}
                                iconProps={{ iconName: "Share" }}
                                title="Share"
                                ariaLabel="Share"
                                // disabled={true}
                                onClick={() => shareDropDownToggle()}
                            />

                            <div style={shareIconStyle} className={styles.dropdownContent}>
                                <Link to="/" title="Copy Data" onClick={() => copyChatData()} >
                                    <IconButton
                                        iconProps={{ iconName: "Copy" }}
                                    />
                                    Copy
                                </Link >
                              
                                <DownloadPDF pdfData={questionAnswersList} />
                                <Link to="/" title="Export to PDF" onClick={() => copyChatData()} >
                                    <IconButton
                                        iconProps={{ iconName: "Mail" }}
                                    />
                                    Draft in Email
                                </Link>
                            </div>
                        </div> */}
                            <span onClick={() => onThoughtProcessClicked()}>
                                <Avatar
                                    sx={{
                                        bgcolor: "var(--bg-secondary)",
                                        color: "#fff",
                                        "&:hover": {
                                            backgroundColor: "var(--active-themes)",
                                            color: "#fff"
                                        }
                                    }}
                                    // sx={{
                                    //     bgcolor: "var(--bg-primary-light)",
                                    //     color: "var(--active-themes)",
                                    //     "&:hover": {
                                    //         backgroundColor: "var(--active-themes)",
                                    //         color: "#fff"
                                    //     }
                                    // }}
                                >
                                    {" "}
                                    <PsychologyOutlinedIcon />
                                </Avatar>
                            </span>
                            <span onClick={() => onSupportingContentClicked()}>
                                <Avatar
                                    // sx={{
                                    //     bgcolor: "rgba(83, 118, 240, 1)",
                                    //     color: "rgba(255, 255, 255, 1)",
                                    //     "&:hover": {
                                    //         backgroundColor: "#0027B0",
                                    //         color: " rgba(30, 255, 241, 0.8)"
                                    //     }
                                    // }}

                                    sx={{
                                        bgcolor: "var(--bg-secondary)",
                                        color: "#fff",
                                        "&:hover": {
                                            backgroundColor: "var(--active-themes)",
                                            color: "#fff"
                                        }
                                    }}

                                    // sx={{
                                    //     bgcolor: "var(--bg-primary-light)",
                                    //     color: "var(--active-themes)",
                                    //     "&:hover": {
                                    //         backgroundColor: "var(--active-themes)",
                                    //         color: "#fff"
                                    //     }
                                    // }}
                                >
                                    {" "}
                                    <AssignmentOutlinedIcon />
                                </Avatar>
                            </span>

                            <span onClick={() => onLogsContentClicked()}>
                                <Avatar
                                    // sx={{
                                    //     bgcolor: "rgba(83, 118, 240, 1)",
                                    //     color: "rgba(255, 255, 255, 1)",
                                    //     "&:hover": {
                                    //         backgroundColor: "#0027B0",
                                    //         color: " rgba(30, 255, 241, 0.8)"
                                    //     }
                                    // }}

                                    // sx={{
                                    //     bgcolor: "var(--bg-primary-light)",
                                    //     color: "var(--active-themes)",
                                    //     "&:hover": {
                                    //         backgroundColor: "var(--active-themes)",
                                    //         color: "#fff"
                                    //     }
                                    // }}
                                    sx={{
                                        bgcolor: "var(--bg-secondary)",
                                        color: "#fff",
                                        "&:hover": {
                                            backgroundColor: "var(--active-themes)",
                                            color: "#fff"
                                        }
                                    }}
                                >
                                    {" "}
                                    <HistoryOutlinedIcon />
                                </Avatar>
                            </span>

                            {/* <IconButton
                                style={IconStyles}
                                iconProps={{ iconName: "Lightbulb" }}
                                title="Show thought process"
                                ariaLabel="Show thought process"
                                onClick={() => onThoughtProcessClicked()}
                                // disabled={true}
                            />
                            <IconButton
                                style={IconStyles}
                                iconProps={{ iconName: "ClipboardList" }}
                                title="Show supporting content"
                                ariaLabel="Show supporting content"
                                onClick={() => onSupportingContentClicked()}
                                // disabled={true}
                            /> */}
                        </div>
                    </Stack>

                    {showAlertBox && <Stack style={{ marginTop: "15px" }}>{errorTypes === "success" ? <AlertBoxSuccess /> : <AlertBoxError />}</Stack>}

                    {!!parsedAnswer.followupQuestions.length && showFollowupQuestions && onFollowupQuestionClicked && (
                        <Stack.Item>
                            <Stack
                                horizontal
                                wrap
                                className={`${!!parsedAnswer.citations.length ? styles.followupQuestionsList : ""}`}
                                tokens={{ childrenGap: 6 }}
                            >
                                <span className={styles.followupQuestionLearnMore}>Follow-up questions:</span>
                                {parsedAnswer.followupQuestions.map((x, i) => {
                                    return (
                                        <a key={i} className={styles.followupQuestion} title={x} onClick={() => onFollowupQuestionClicked(x)}>
                                            {`${x}`}
                                        </a>
                                    );
                                })}
                            </Stack>
                        </Stack.Item>
                    )}
                </Stack>

                {showCommentBox && (
                    <>
                        <DislikeAnswerForm
                            setShowDisLike={setShowDisLike}
                            setErrorTypes={setErrorTypes}
                            setShowAlertBox={setShowAlertBox}
                            answer={answer}
                            showCommentBox={showCommentBox}
                            setshowCommentBox={setshowCommentBox}
                        />
                    </>
                )}
            </Stack>
        </>
    );
};
