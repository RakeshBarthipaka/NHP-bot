import { Outlet, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./Layout.module.css";
import { userInfoApi } from "../../api";
import MobileNavBar from "./NavBarMobile";
import CGLenseLogo from "../../assets/CGLense_app_logo_v3.png";
import { ChevronDown20Regular, ChevronUp20Regular } from "@fluentui/react-icons";
import { useDispatch, useSelector } from 'react-redux';
import { set_color } from './layoutSlice';
import { set_history, set_answers, set_QnA, set_recommendedQnA, set_latestQuestion } from "../chat/chatSlice";
import { languageList } from '../../utils/languages';
import { ColorList } from '../../utils/colors'
import azureSpeakerVoiceList from "../../utils/azureSpeakerVoiceList";



const Layout = (props: any) => {
    const [isFullLeftPanelOpen, setIsFullLeftPanelOpen] = useState(false);
    const [isLoadingFirst, setIsLoadingFirst] = useState(true);
    const [userName, setUserName] = useState("CG-Chat");
    const [dropdwonLanguage, setDropdwonLanguage] = useState<boolean>(false);
    const [theme, toggleTheme] = useState<boolean>(false);
    const [settings, toggleSettings] = useState<boolean>(false);
    const [Language, setLanguage] = useState<string>(`${localStorage.getItem("language") || "English"}`);
    const dispatch = useDispatch();
    const { color: themesColor, class: themeClass } = useSelector((state: any) => state.theme.color)
    const [dropDown, setDropDown] = useState<boolean>(false);
    const { colorCode } = useSelector((state: any) => state.theme.color)


    useEffect(() => {
        if (isLoadingFirst) {
            userInfoHandle()
        }
    });


    const userInfoHandle = async () => {
        try {
            const result = await userInfoApi();
            if (result.status === "PASS") {
                setIsLoadingFirst(false)
                setUserName(result.user_id)
                localStorage.setItem("userName", result.user_id)
            }
            else {
                setIsLoadingFirst(false)
            }
        }
        catch (e) {
            setIsLoadingFirst(false)
        }
    };

    const onLanguageChange = (value: string) => {
        localStorage.setItem("language", value)
        setLanguage(value)
    }

    const onColorChange = (color: any) => {
        localStorage.setItem("color", JSON.stringify(color))
        dispatch(set_color(color))
        document.documentElement.style.setProperty('--active-themes', `${color.colorCode}`);
    }

    const showHistory = () => {
        dispatch(set_history(true as any))
    }

    const resetChat = () => {
        dispatch(set_history(false as any)),
            dispatch(set_answers([] as any))
        dispatch(set_QnA([] as any))
        dispatch(set_recommendedQnA([] as any))
        dispatch(set_latestQuestion("" as any))
    }

    const handleSelectedSpeakerData = (voiceData: any) => {
        localStorage.setItem("speakerData", voiceData)
    };

    let LanguageIcon = languageList.find(language => language.lang === Language);
    let voiceAvatarList = props.chatBotUIData && props.chatBotUIData.ChatbotAvatarList ? props.chatBotUIData.ChatbotAvatarList : azureSpeakerVoiceList;
    let speakerData = localStorage.getItem("speakerData");
    let selectedAvatars = speakerData && speakerData ? JSON.parse(speakerData) : voiceAvatarList[0]

    useEffect(() => {
        document.documentElement.style.setProperty('--active-themes', `${colorCode}`);
    }, []);


    return (
        <div className={styles.layout}>
            <header className={`${styles.header} ${themeClass}`} role={"banner"} >
                <div className={styles.headerContainer}>
                    <div className={styles.brandLogo}>
                        <NavLink to="" onClick={() => dispatch(set_history(false as any))} className={styles.headerNavPageLink}>
                            <img src={props.projectData && props.projectData.projectLogoPath ? props.projectData.projectLogoPath : CGLenseLogo} height={40} />
                        </NavLink>
                    </div>
                    <nav>
                        <ul className={styles.headerNavList}>

                            <li>
                               
                            </li>
                            <li>
                                <NavLink to="" onClick={resetChat} >
                                    <i className="material-icons-outlined">add_comment</i>
                                    NEW CHAT
                                </NavLink>
                            </li>

                            <li className='resetChatTourGuide'>
                                <NavLink to="" onClick={resetChat}>
                                    <i className="material-icons">rotate_left</i>
                                    RESET CHAT
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="" onClick={showHistory} >
                                    <i className="material-icons">history</i>
                                    CHAT HISTORY
                                </NavLink>
                            </li>

                            <li>
                                <div
                                    className={`${styles.avatarSelect}`}
                                    onClick={() => {
                                        setDropDown(!dropDown);
                                    }}
                                >
                                    <span>
                                        <img src={selectedAvatars.icon} width={24} height={24} />
                                    {dropDown ? <ChevronUp20Regular style={{ color: "white" }} /> : <ChevronDown20Regular style={{ color: "white" }} />}
                                    </span>
                                        AVATAR

                                </div>
                                {dropDown && (
                                    <div className={styles.imageContainer}>
                                        {azureSpeakerVoiceList.map((element) => (
                                            <div key={element.id}
                                                style={{ marginBottom: "5px" }}
                                                onClick={(e) => {
                                                    handleSelectedSpeakerData(JSON.stringify(element))
                                                    setDropDown(false);
                                                }}
                                            >
                                                <img className={styles.imageAvtar} src={element.icon} height={50} />
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </li>

                        </ul>
                    </nav>
                    <div className={styles.profileMenu}>
                        <ul className={styles.headerNavList}>
                            
                            <li>
                                <div className={styles.lanuageDropdown}>
                                    <div className={styles.lanuageChoose} onClick={() => {
                                        setDropdwonLanguage(!dropdwonLanguage);
                                    }}>
                                        {/* <img src={LanguageIcon && LanguageIcon.icon} width={20} height={20} /> */}
                                        <p>{Language} <span>{dropdwonLanguage ? <ChevronUp20Regular style={{ color: "white" }} /> : <ChevronDown20Regular style={{ color: "white" }} />} </span></p>
                                    </div>

                                    <div className={styles.lanuageDropdownList} >
                                        {
                                            dropdwonLanguage && (
                                                languageList.map((langItem, i) => (
                                                    <div className={styles.lanuageDropdownItemList} key={i}
                                                        onClick={(e) => {
                                                            onLanguageChange(langItem.lang)
                                                            setDropdwonLanguage(false);
                                                        }}>
                                                        <img src={langItem.icon} width={20} height={20} />
                                                        <p style={{ color: themesColor }}>{langItem.lang}</p>
                                                    </div>
                                                ))
                                            )
                                        }
                                    </div>
                                </div>
                            </li>
                            <li>
                                <NavLink to="/" className={styles.headerNavPageLink} onClick={() => {
                                        toggleSettings(!settings);
                                    }}>
                                    <i className="material-icons-outlined">settings</i> 
                                </NavLink>
                                        {
                                            settings && (
                                                <div className={styles.settingsDropdown} >
                                                    <div className={styles.colorsList}>
                                                        <h6>Themes</h6>
                                                        {
                                                            ColorList.map((color, i) => (
                                                                <p
                                                                    onClick={(e) => {
                                                                        onColorChange(color)
                                                                        toggleSettings(false);
                                                                    }}>
                                                                    <span style={{ background: color.colorCode }}></span>
                                                                </p>
                                                            ))
                                                        }
                                                    </div>

                                                    <div className={styles.layoutStyle}>
                                                        <h6>Layout</h6>
                                                        <div className={styles.layoutBox}>
                                                            <span></span>
                                                            <span></span>
                                                        </div>
                                                        <div className={styles.layoutBox}>
                                                            <span></span>
                                                            <span></span>
                                                        </div>
                                                    </div>
                                                    
                                                </div>
                                             )
                                        }
                            </li>
                            <li>
                                <NavLink to="/" className={styles.headerNavPageLink}>
                                    <i className="material-icons-outlined">help</i> 
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
                <MobileNavBar ></MobileNavBar>
            </header>
            <Outlet context={{ isFullLeftPanelOpen: isFullLeftPanelOpen }} />
        </div>
    );
};

export default Layout;
