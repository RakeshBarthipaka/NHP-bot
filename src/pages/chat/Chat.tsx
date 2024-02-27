import { useRef, useState, useEffect } from "react";
import { Checkbox, Panel, DefaultButton, TextField, SpinButton, Stack, Sticky } from "@fluentui/react";
import { chatApi, Approaches, AskResponse, ChatRequest, ChatTurn, ChartJSApi } from "../../api";
import { Answer, AnswerError, AnswerLoading } from "../../components/Answer";
import { QuestionInput } from "../../components/QuestionInput";
import { ExampleList } from "../../components/Example";
import { UserChatMessage } from "../../components/UserChatMessage";
import { AnalysisPanel, AnalysisPanelTabs } from "../../components/AnalysisPanel";
import styles from "./Chat.module.css";
import ChatBoxLeftPanel from './ChatBoxLeftPanel'
import {
    speakText, muteAudio,
    unmuteAudio,
} from "../../utils/azureCustomSpeechSynthesis"
import { speechToTextStart, speechToTextStop } from "../../utils/azureSpeechRecognizer"
import azureSpeakerVoiceList from "../../utils/azureSpeakerVoiceList";
import { getLocalStorageData, setLocalStorageData } from "../../utils/clientStorage"
import { NavLink } from "react-router-dom";
import { ChatHistory } from "../../components/ChatHistory";
import { SuggesedQuestion } from "../../components/Answer/SuggesedQuestion";
import FileViewer from "./FileViewer";
import { postApiWithJson } from "../../api";
import AnalysisPanelPopUp from "../../components/AnalysisPanel/AnalysisPanelPopUp";
import UserGuide from "./userGuide";
import MultiItemCarousel from "../../components/Common/MultiItemCarousel";
import { useDispatch, useSelector } from "react-redux";
import { set_history, set_answers, set_QnA, set_recommendedQnA, set_latestQuestion } from "./chatSlice";
import UserLocationSave from "./UserLocationSave";
import { Grid } from "@mui/material";
import KpiWidget from "../../components/KpiWidget/KpiWidget";
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';



const Chat = (props: any) => {
    const [isConfigPanelOpen, setIsConfigPanelOpen] = useState(false);
    const [promptTemplate, setPromptTemplate] = useState<string>("");
    const [retrieveCount, setRetrieveCount] = useState<number>(3);
    const [useSemanticRanker, setUseSemanticRanker] = useState<boolean>(true);
    const [useSemanticCaptions, setUseSemanticCaptions] = useState<boolean>(false);
    const [excludeCategory, setExcludeCategory] = useState<string>("");
    const [useSuggestFollowupQuestions, setUseSuggestFollowupQuestions] = useState<boolean>(false);
    const [threads, scrollThreads] = useState(false)
    const chatMessageStreamEnd = useRef<HTMLDivElement | null>(null);
    const [localChatData, setLocalChatData] = useState([]);

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<unknown>();

    const [activeCitation, setActiveCitation] = useState<string>();
    const [activeAnalysisPanelTab, setActiveAnalysisPanelTab] = useState<AnalysisPanelTabs | undefined>(undefined);

    const [selectedAnswer, setSelectedAnswer] = useState<number>(0);
    const [ischatRightContent, setchatRightContent] = useState<boolean>(false);


    let getDisclaimer = localStorage.getItem("Disclaimer") || false;
    const [showDisclaimer, setShowDisclaimer] = useState<any>(getDisclaimer);
    const [disclaimerstyle, setDisclaimerstyle] = useState<any>({ color: "gray", borderRadius: "8px", padding: "20px" });
    const [disabledButton, setDisabledButton] = useState<boolean>(true)
    const [isListen, setisListen] = useState<boolean>(false);
    const [transcriptValue, setTranscriptValue] = useState("");
    const [isSpeakerOn, setisSpeakerOn] = useState(true);
    let speakerData: any = getLocalStorageData("speakerData");
    const [chatBotVoice, setChatBotVoice] = useState<any>(speakerData ? JSON.parse(speakerData) : azureSpeakerVoiceList[0]);
    const [showLogsView, setShowLogsView] = useState(false);
    const projectHeadingText = props.projectData && props.projectData.chatbotInsideText || "Get started with CGLense"
    const projectInsideImage = props.projectData && props.projectData.chatbotInsideImage || "https://covalenseaccessibility.blob.core.windows.net/ai-portal/CGLENSE_AI_BOT_INSIDE_LOGO.png";
    const [FileViewerURL, setFileViewerURL] = useState("");
    const answers = useSelector((state: any) => state.chat.answers);
    const questionAnswersList = useSelector((state: any) => state.chat.qnA);
    const showHistory = useSelector((state: any) => state.chat.showHistory)
    const recommenededQuestionList = useSelector((state: any) => state.chat.recommendedQuestions)
    const latestQuestion = useSelector((state: any) => state.chat.latestQuestion)
    const lastQuestionRef = useRef<string>("")
    const dispatch = useDispatch();

    let handleMicClick = () => {
        if (!isListen) {
            speechToTextStart({ setTranscriptValue, setisListen });
            setisListen(true);
        } else {
            speechToTextStop();
            setisListen(false);
        }
    };

    let handleSpeakerClick = () => {
        if (!isSpeakerOn) {
            setisSpeakerOn(true);
            unmuteAudio();
        } else {
            setisSpeakerOn(false);
            muteAudio();
        }
    };

    let handleSelectedSpeakerData = (voiceData: any) => {
        setChatBotVoice(voiceData)
        setLocalStorageData("speakerData", voiceData)
    };

    useEffect(() => {
        if (transcriptValue) {
            setisListen(false);
            makeApiRequest(transcriptValue);
            setTranscriptValue("");
        }
    }, [transcriptValue]);


    useEffect(() => {
        const getLocal = localStorage.getItem("Disclaimer")
        getLocal ? setShowDisclaimer(true) : setShowDisclaimer(false)
        setTimeout(() => {
            setDisabledButton(false)
            setDisclaimerstyle({ color: "white", borderRadius: "8px", padding: "20px", backgroundColor: "#0344a8" })
        }, 4000);
    }, [])

    const buttonClick = () => {
        setShowDisclaimer(true)
        localStorage.setItem("Disclaimer", "ture");
    }

    const cleanChartData = (chart: any) => {
        let chartData = null;
        try {
            chartData = JSON.parse(chart);
            return chartData
        }
        catch (err) {
            chartData = null
        }
        return chartData
    }

    const updateQandA = (data: any) => {
        clearChat()
        let threadList = data.map((d: any) => [d.question, d.answer])
        dispatch(set_answers([...threadList] as any))
        lastQuestionRef.current = data[0].question;
        dispatch(set_latestQuestion(lastQuestionRef.current as any))
        dispatch(set_QnA(data as any))
        onShowHistoryClicked(false)
        scrollThreads(true)
        setLocalChatData(data)
    }

    const makeThreadAPICall = async (qAndA: any) => {
        const currentTimestamp = Date.now();
        if (qAndA.length === 1) {
            localStorage.removeItem("currentThread")
        }
        let userID = localStorage.getItem("userID")
        let currentThread = localStorage.getItem("currentThread")
        if (!userID) {
            userID = JSON.stringify(currentTimestamp);
            localStorage.setItem("userID", userID)
        }
        if (!currentThread) {
            currentThread = JSON.stringify(`${currentTimestamp}`)
            localStorage.setItem("currentThread", currentThread)
        }
        const payload = {
            "user_id": userID,
            "thread_id": `${JSON.parse(currentThread)}`,
            "thread_name": `${qAndA[0].question}`,
            "user_query": `${JSON.parse(currentThread)}`,
            "bot_response": qAndA
        }
        const res = await postApiWithJson(payload, "api/v1/chat-thread/chat-thread-create")
    }

    const makeApiRequest = async (question: string) => {
        lastQuestionRef.current = question;
        dispatch(set_latestQuestion(lastQuestionRef.current as any))
        let chatGPTToken = localStorage.getItem("chatGPTToken") ? localStorage.getItem("chatGPTToken") : 0;
        let chatTemperature = localStorage.getItem("chatTemperature") ? localStorage.getItem("chatTemperature") : 0;
        let selectedLanguage = localStorage.getItem("language") ? localStorage.getItem("language") : "English";
        let appointmentData = localStorage.getItem("appointmentData") ? localStorage.getItem("appointmentData") : "";
        let patientemail = localStorage.getItem("patientemail") ? localStorage.getItem("patientemail") : "";
        let patientemailconfirm = Boolean(localStorage.getItem("patientemailconfirm")) ? Boolean(localStorage.getItem("patientemailconfirm")) : false;
        let latitude = localStorage.getItem("latitude") ? localStorage.getItem("latitude") : 0;
        let longitude = localStorage.getItem("longitude") ? localStorage.getItem("longitude") : 0;
        let userLocation = localStorage.getItem("userLocation") ? localStorage.getItem("userLocation") : "Auckland";


        dispatch(set_recommendedQnA([] as any))
        error && setError(undefined);
        setIsLoading(true);
        setActiveCitation(undefined);
        setActiveAnalysisPanelTab(undefined);

        const currentTimestamp = Date.now();
        let userID = localStorage.getItem("userID")
        if (!userID) {
            userID = JSON.stringify(currentTimestamp);
            localStorage.setItem("userID", userID)
        }

        try {
            const history: ChatTurn[] = answers.map((a: any) => ({ user: a[0], bot: a[1].answer }));
            const request: ChatRequest = {
                history: [...history, { user: question, bot: undefined }],
                approach: Approaches.ReadRetrieveRead,
                overrides: {
                    promptTemplate: promptTemplate.length === 0 ? undefined : promptTemplate,
                    excludeCategory: excludeCategory.length === 0 ? undefined : excludeCategory,
                    top: retrieveCount,
                    semanticRanker: useSemanticRanker,
                    semanticCaptions: useSemanticCaptions,
                    suggestFollowupQuestions: useSuggestFollowupQuestions
                },
                temperature: `${chatTemperature}`,
                token: `${chatGPTToken}`,
                language: `${selectedLanguage}`,
                userID: `${userID}`,
                appointmentData: appointmentData,
                patientemail: patientemail,
                patientemailconfirm: patientemailconfirm,
                longitude: longitude,
                latitude: latitude,
                userLocation: userLocation
            };
            const result = await chatApi(request);
            if (result.exchange_id) {
                let answersList = [...answers, [question, result]]
                let qnAList = [...questionAnswersList, {
                    question: question,
                    answer: result
                }]
                dispatch(set_answers(answersList as any));
                dispatch(set_QnA(qnAList as any));
                if (isSpeakerOn) {
                    speakText([result.answer], chatBotVoice.value)
                }
                dispatch(set_recommendedQnA(result.recommended_question as any))
                let qAndA = [...localChatData];
                //@ts-ignore
                qAndA.push({ "question": question, "answer": result })
                setLocalChatData(qAndA)
                makeThreadAPICall(qAndA)
                localStorage.removeItem("appointmentData")
            }
            else {
                setError("No Data found");
            }
        } catch (e) {
            setError(e);
        } finally {
            setIsLoading(false);
        }
    };

    const clearChat = () => {
        lastQuestionRef.current = "";
        dispatch(set_latestQuestion(lastQuestionRef.current as any))
        error && setError(undefined);
        setActiveCitation(undefined);
        setActiveAnalysisPanelTab(undefined);
        dispatch(set_answers([] as any))
        dispatch(set_QnA([] as any))
        dispatch(set_recommendedQnA([] as any))
        setLocalChatData([]);
        scrollThreads(false)
    };

    useEffect(() => chatMessageStreamEnd.current?.scrollIntoView({ behavior: "smooth" }), [isLoading, threads]);

    const onPromptTemplateChange = (_ev?: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
        setPromptTemplate(newValue || "");
    };

    const onRetrieveCountChange = (_ev?: React.SyntheticEvent<HTMLElement, Event>, newValue?: string) => {
        setRetrieveCount(parseInt(newValue || "3"));
    };

    const onUseSemanticRankerChange = (_ev?: React.FormEvent<HTMLElement | HTMLInputElement>, checked?: boolean) => {
        setUseSemanticRanker(!!checked);
    };

    const onUseSemanticCaptionsChange = (_ev?: React.FormEvent<HTMLElement | HTMLInputElement>, checked?: boolean) => {
        setUseSemanticCaptions(!!checked);
    };

    const onExcludeCategoryChanged = (_ev?: React.FormEvent, newValue?: string) => {
        setExcludeCategory(newValue || "");
    };

    const onUseSuggestFollowupQuestionsChange = (_ev?: React.FormEvent<HTMLElement | HTMLInputElement>, checked?: boolean) => {
        setUseSuggestFollowupQuestions(!!checked);
    };

    const onExampleClicked = (example: string) => {
        makeApiRequest(example);
    };

    const onShowCitation = (citation: string, index: number) => {
        if (activeCitation === citation && activeAnalysisPanelTab === AnalysisPanelTabs.CitationTab && selectedAnswer === index) {
            setActiveAnalysisPanelTab(undefined);
        } else {
            setActiveCitation(citation);
            setActiveAnalysisPanelTab(AnalysisPanelTabs.CitationTab);
        }
        setSelectedAnswer(index);
    };

    const onToggleTab = (tab: AnalysisPanelTabs, index: number) => {
        if (activeAnalysisPanelTab === tab && selectedAnswer === index) {
            setActiveAnalysisPanelTab(undefined);
        } else {
            setActiveAnalysisPanelTab(tab);
        }
        setSelectedAnswer(index);
    };


    const onShowHistoryClicked = (isHistory: any) => {
        dispatch(set_history(isHistory))
    };

    const onLogsContentClicked = () => {
        if (!showLogsView) {
            setShowLogsView(true)
        }
        else {
            setShowLogsView(false)
        }
    };

    const dummyLogsData = [
        {
            "id": "0",
            "request_id": "1",
            "query": "show me some good italian restraunts",
            "stage": "optimize_layer",
            "tokens": "1697108146827",
            "time": "1697108146827"

        },

        {
            "id": "1",
            "request_id": "1",
            "query": "show me some good italian restraunts",
            "stage": "optimize_layer",
            "tokens": "1697108146827",
            "time": "1697108146827"

        }

    ]

    const onRecommendedQuestionClicked = (recommendedQuestion: string) => {
        makeApiRequest(recommendedQuestion);
        dispatch(set_recommendedQnA([] as any))
    };

    const onFileViewURLClicked = (fileURL: string) => {
        setFileViewerURL(fileURL)
    };

    const isUserTourGuide = localStorage.getItem("isUserTourGuide") ? localStorage.getItem("isUserTourGuide") : false;

    const toggleChatRightContent = () => {
        setchatRightContent(current => !current);
        console.log(ischatRightContent)
    };



    return (
        <>


            <UserGuide />
            {
                isUserTourGuide && (
                    <UserLocationSave />
                )
            }

            {
                FileViewerURL && (
                    <FileViewer fileURL={FileViewerURL} onFileViewURLClicked={onFileViewURLClicked} />
                )
            }

            {
                !showHistory && (
                    <Grid container item direction="row" justifyContent="center" alignItems="flex-start" sx={{ height: "100%" }}>

                        <Grid item xs={12} md={11} className={styles.chatInputBlock}>
                            <div className={styles.chatInput} >
                                {/* <h1 style={{ marginTop: "100px", marginBottom:"50px" }} className={styles.chatEmptyStateTitle}>Get started with CGLense</h1> */}
                                <QuestionInput onSelectChatBotTypes={chatBotVoice => handleSelectedSpeakerData(JSON.parse(chatBotVoice))} clearOnSend placeholder="Enter your prompt here" disabled={isLoading} onSend={question => makeApiRequest(question)}
                                    handleMicClick={handleMicClick}
                                    handleSpeakerClick={handleSpeakerClick}
                                    isListen={isListen}
                                    isSpeakerOn={isSpeakerOn}
                                    chatBotVoice={chatBotVoice}
                                />

                            </div>

                        </Grid>

                        <Grid container item justifyContent="center" xs={12} md={11} className="shiftingContainer">

                            


                                {!latestQuestion ? (
                                    <>
                                        <Grid container item xs={12} className={styles.chatEmptyState} spacing={2}>
                                            <Grid item xs={12} md={6}> 
                                                <h4 className="accessibility-plugin-ac">Get started with CGlense. A Powerful AI Assistant</h4>
                                                <img src="static\assets\cglense_icon_logo.png" alt="" />
                                                {/* <ExampleList onExampleClicked={onExampleClicked} chatBotTypes={chatBotVoice.VoiceName} projectData={props.projectData} /> */}
                                                <p className="accessibility-plugin-ac"> Hi, I am here. How may I help you today?.  </p>
                                                <p className="accessibility-plugin-ac">  Click on the Chat window you wish to ask a question  </p>
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <img src="static\assets\CGLense_app_logo_v3-btO_FX8F.png" alt=""  style={{ height: '42px', marginTop: '15px'}}/>
                                                <div className={styles.infoCard}>
                                                    <h3 className="accessibility-plugin-ac">COMPANY INFO </h3>
                                                    <p className="accessibility-plugin-ac">
                                                     CGLense AI, your advanced visual companion! Empowering businesses across sectors with cutting-edge image analysis, object recognition, and custom insights. Experience precise AI solutions for diverse industries. Uncover image enhancement tools, metadata extraction, and deep learning capabilities. Seamlessly integrate with workflows for heightened efficiency. From precise visual data interpretation to tailored solutions, CGLense AI bot streamlines operations. Explore the potential of images with unparalleled accuracy. Simplify complexities, elevate decision-making, and harness the true power of visual data. Your key to unlocking innovation, driving progress, and transforming how you perceive and utilize visual information - that`s CGLense AI.
                                                    </p> 
                                                </div>
                                                <div className={styles.infoCard}>
                                                    <h3 className="accessibility-plugin-ac">ABOUT CHATBOT</h3> 
                                                    <p className="accessibility-plugin-ac">
                                                    "As for the CGLense Navigation Tool with ChatGPT integration, it represents an innovative approach to enhancing the online visual experience for CGLense users. The tool harnesses ChatGPT, an advanced conversational AI model, enabling natural language interactions. It simplifies product searches, offers personalized recommendations, and aids in order tracking, returns, and real-time customer support. This integration aims to streamline visual exploration, elevate user satisfaction, and provide comprehensive assistance, redefining how users engage with visual data through CGLense."
                                                    </p>
                                                </div>
                                            </Grid>
                                        </Grid> 
                                    </> 

                                ) : (
                                    <>
                                        <Grid item xs={12} sm={12} md={6} >

                                            <KpiWidget />
                                            <div className={styles.chatContainer}>

                                                <div className={styles.chatMessageStream}>
                                                    {answers.map((answer: any, index: number) => (
                                                        <div key={index}>
                                                            <UserChatMessage message={answer[0]} />
                                                            <div className={styles.chatMessageGpt}>
                                                                <Answer
                                                                    key={index}
                                                                    answer={answer[1]}
                                                                    isSelected={selectedAnswer === index && activeAnalysisPanelTab !== undefined}
                                                                    onCitationClicked={c => onShowCitation(c, index)}
                                                                    onThoughtProcessClicked={() => onToggleTab(AnalysisPanelTabs.ThoughtProcessTab, index)}
                                                                    onSupportingContentClicked={() => onToggleTab(AnalysisPanelTabs.SupportingContentTab, index)}
                                                                    onFollowupQuestionClicked={q => makeApiRequest(q)}
                                                                    showFollowupQuestions={useSuggestFollowupQuestions && answers.length - 1 === index
                                                                    }
                                                                    questionAnswersList={questionAnswersList}
                                                                    onLogsContentClicked={() => onLogsContentClicked()}
                                                                    projectData={props.projectData}
                                                                    onExampleClicked={onExampleClicked}
                                                                />
                                                            </div>


                                                        </div>
                                                    ))}
                                                    {isLoading && (
                                                        <>
                                                            <UserChatMessage message={latestQuestion} />
                                                            <div className={styles.chatMessageGptMinWidth}>
                                                                <AnswerLoading projectData={props.projectData} />
                                                            </div>
                                                        </>
                                                    )}
                                                    {error ? (
                                                        <>
                                                            <UserChatMessage message={latestQuestion} />
                                                            <div className={styles.chatMessageGptMinWidth}>
                                                                <AnswerError error={error.toString()} onRetry={() => makeApiRequest(latestQuestion)} />
                                                            </div>
                                                        </>
                                                    ) : null}
                                                    <div ref={chatMessageStreamEnd} />
                                                </div>
                                                {recommenededQuestionList && recommenededQuestionList.length > 0 &&
                                                    <SuggesedQuestion onRecommendedQuestionClicked={onRecommendedQuestionClicked} recommenededQuestionList={recommenededQuestionList} />
                                                }
                                            </div>
                                        </Grid>
                                        {
                                            !ischatRightContent &&

                                            <Grid item xs={12} sm={12} md={6} className={styles.chatRightContent}>
                                                <div className="sidePanelBtn" onClick={toggleChatRightContent} >
                                                    <ArrowLeftIcon />
                                                </div>


                                            </Grid>
                                        }
                                    </>
                                )}

 



                            {answers.length > 0 && activeAnalysisPanelTab && (
                                <Grid item xs={12}>

                                    <>
                                        <AnalysisPanelPopUp onActiveTabChanged={(x: any) => onToggleTab(x, selectedAnswer)} answer={answers[selectedAnswer][1]} activeTab={activeAnalysisPanelTab} />
                                    </>
                                </Grid>
                            )}


                            <Panel
                                headerText="Configure answer generation"
                                isOpen={isConfigPanelOpen}
                                isBlocking={false}
                                onDismiss={() => setIsConfigPanelOpen(false)}
                                closeButtonAriaLabel="Close"
                                onRenderFooterContent={() => <DefaultButton onClick={() => setIsConfigPanelOpen(false)}>Close</DefaultButton>}
                                isFooterAtBottom={true}
                            >
                                <TextField
                                    className={styles.chatSettingsSeparator}
                                    defaultValue={promptTemplate}
                                    label="Override prompt template"
                                    multiline
                                    autoAdjustHeight
                                    onChange={onPromptTemplateChange}
                                />

                                <SpinButton
                                    className={styles.chatSettingsSeparator}
                                    label="Retrieve this many documents from search:"
                                    min={1}
                                    max={50}
                                    defaultValue={retrieveCount.toString()}
                                    onChange={onRetrieveCountChange}
                                />
                                <TextField className={styles.chatSettingsSeparator} label="Exclude category" onChange={onExcludeCategoryChanged} />
                                <Checkbox
                                    className={styles.chatSettingsSeparator}
                                    checked={useSemanticRanker}
                                    label="Use semantic ranker for retrieval"
                                    onChange={onUseSemanticRankerChange}
                                />
                                <Checkbox
                                    className={styles.chatSettingsSeparator}
                                    checked={useSemanticCaptions}
                                    label="Use query-contextual summaries instead of whole documents"
                                    onChange={onUseSemanticCaptionsChange}
                                    disabled={!useSemanticRanker}
                                />
                                <Checkbox
                                    className={styles.chatSettingsSeparator}
                                    checked={useSuggestFollowupQuestions}
                                    label="Suggest follow-up questions"
                                    onChange={onUseSuggestFollowupQuestionsChange}
                                />
                            </Panel>

                            {showLogsView &&
                                <Grid item xs={12}>
                                    <div className={styles.LogsDataBlock}>
                                        <h2>Logs data</h2>
                                        <div className={styles.LogsDataList}>
                                            {
                                                dummyLogsData.map((item, i) => (
                                                    <div className={styles.LogsDataItem}>
                                                        <div className={styles.LogsDataText}>
                                                            <p className={styles.LogsDataTextheading}>Query</p>
                                                            <p>{item.query}</p>
                                                        </div>
                                                        <div className={styles.LogsDataText}>
                                                            <p className={styles.LogsDataTextheading}>Stage</p>
                                                            <p>{item.stage}</p>
                                                        </div>
                                                        <div className={styles.LogsDataText}>
                                                            <p className={styles.LogsDataTextheading}>Tokens</p>
                                                            <p>{item.tokens}</p>
                                                        </div>
                                                        <div className={styles.LogsDataText}>
                                                            <p className={styles.LogsDataTextheading}>Timestamp</p>
                                                            <p>{item.time}</p>
                                                        </div>
                                                    </div>
                                                ))
                                            }

                                        </div>

                                    </div>
                                </Grid>
                            }


                        </Grid>
                    </Grid>
                )
            }

            {
                showHistory && (
                    <Grid container item direction="row" justifyContent="center" xs={12} sm={12}>
                        <Grid item xs={11} md={10}>
                            <ChatHistory />
                        </Grid>
                    </Grid>
                )
            }

            <ChatBoxLeftPanel onShowHistoryClicked={onShowHistoryClicked} onClearChatClicked={clearChat} onExampleClicked={onExampleClicked}
                chatData={localChatData} onFileViewURLClicked={onFileViewURLClicked} showThreads={updateQandA} />
        </>

    );
};

export default Chat;
