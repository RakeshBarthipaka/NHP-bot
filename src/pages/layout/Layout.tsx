import { Outlet, NavLink } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import "./Layout.scss";
import { userInfoApi } from "../../api";
import MobileNavBar from "./NavBarMobile";
import CGLenseLogo from "../../assets/CGLense_app_logo_v3.png";
import { ChevronDown20Regular, ChevronUp20Regular } from "@fluentui/react-icons";
import { useDispatch, useSelector } from "react-redux";
import { set_color } from "./layoutSlice";
import { set_history, set_answers, set_QnA, set_recommendedQnA, set_latestQuestion, resetChatList } from "../chat/chatSlice";
import { languageList } from "../../utils/languages";
import { ColorList } from "../../utils/colors";
import azureSpeakerVoiceList from "../../utils/azureSpeakerVoiceList";
import { Box, Grid, Slider, Tooltip, styled } from "@mui/material";

import AddCommentOutlinedIcon from "@mui/icons-material/AddCommentOutlined";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import QuestionAnswerOutlinedIcon from "@mui/icons-material/QuestionAnswerOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import InfoIcon from "@mui/icons-material/Info";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import ThermostatIcon from "@mui/icons-material/Thermostat";

const Layout = (props: any) => {
    const [isFullLeftPanelOpen, setIsFullLeftPanelOpen] = useState(false);
    const [layoutStyle, setLayoutStyles] = useState<string>("row");
    const [isLoadingFirst, setIsLoadingFirst] = useState(true);
    const [userName, setUserName] = useState("CG-Chat");
    const [dropdwonLanguage, setDropdwonLanguage] = useState<boolean>(false);
    const [theme, toggleTheme] = useState<boolean>(false);
    const [settings, toggleSettings] = useState<boolean>(false);
    const [Language, setLanguage] = useState<string>(`${localStorage.getItem("language") || "English"}`);
    const dispatch = useDispatch();

    const { color: themesColor, class: themeClass } = useSelector((state: any) => state.theme.color);
    const [dropDown, setDropDown] = useState<boolean>(false);
    const { colorCode } = useSelector((state: any) => state.theme.color);
    let chatTemperature = localStorage.getItem("chatTemperature") ? localStorage.getItem("chatTemperature") : 0;
    let chatGPTToken = localStorage.getItem("chatGPTToken") ? localStorage.getItem("chatGPTToken") : 0;

    const ThemedSlider = styled(Slider)`
        color: ${colorCode};
        margin: 0 10px 15px;
        & .MuiSlider-mark {
            color: ${colorCode};
            opacity: 0.7;
            width: 6px;
            height: 6px;
            border-radius: 50%;
            padding: 0;
        }
        ,
        & .MuiSlider-markActive {
            background-color: rgba(217, 217, 217, 1);
        }
        ,
        & .MuiSlider-markLabel {
            top: 15px;
        }
        &.fontSizeSlider .MuiSlider-markLabel {
            font-size: 12px;

            &[data-index="0"] {
                font-size: 10px;
            }

            &[data-index="2"] {
                font-size: 14px;
            }
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

    useEffect(() => {
        if (isLoadingFirst) {
            userInfoHandle();
        }
    });

    const userInfoHandle = async () => {
        try {
            const result = await userInfoApi();
            if (result.status === "PASS") {
                setIsLoadingFirst(false);
                setUserName(result.user_id);
                localStorage.setItem("userName", result.user_id);
            } else {
                setIsLoadingFirst(false);
            }
        } catch (e) {
            setIsLoadingFirst(false);
        }
    };

    const onLanguageChange = (value: string) => {
        localStorage.setItem("language", value);
        setLanguage(value);
    };

    const onColorChange = (color: any) => {
        localStorage.setItem("color", JSON.stringify(color));
        dispatch(set_color(color));
        document.documentElement.style.setProperty("--active-themes", `${color.colorCode}`);
    };

    const showHistory = () => {
        dispatch(set_history(true as any));
    };

    const resetChat = () => {
        dispatch(set_history(false as any)), dispatch(set_answers([] as any));
        dispatch(set_QnA([] as any));
        dispatch(set_recommendedQnA([] as any));
        dispatch(set_latestQuestion("" as any));
        dispatch(resetChatList(true as any));
    };

    const handleSelectedSpeakerData = (voiceData: any) => {
        localStorage.setItem("speakerData", voiceData);
    };

    let LanguageIcon = languageList.find(language => language.lang === Language);
    let voiceAvatarList = props.chatBotUIData && props.chatBotUIData.ChatbotAvatarList ? props.chatBotUIData.ChatbotAvatarList : azureSpeakerVoiceList;
    let speakerData = localStorage.getItem("speakerData");
    let selectedAvatars = speakerData && speakerData ? JSON.parse(speakerData) : voiceAvatarList[0];

    useEffect(() => {
        document.documentElement.style.setProperty("--active-themes", `${colorCode}`);
    }, []);

    function valuetext(value: number) {
        return `${value}°C`;
    }

    //   function valueLabelFormat(value: number) {
    //     return marks.findIndex((mark) => mark.value === value) + 1;
    //   }

    const fontChange = (event: any, value: any) => {
        const textElements: any = document.querySelectorAll(".accessibility-plugin-ac");

        for (let i = 0; i < textElements.length; i++) {
            const fontsizevalue: any = window.getComputedStyle(textElements[i], null).getPropertyValue("font-size");
            let currentFontSize: any;

            currentFontSize = parseInt(fontsizevalue.replace("px", ""));

            if (textElements[i].getAttribute("default-font-size") === null) {
                const att = document.createAttribute("default-font-size");

                att.value = currentFontSize.toString();

                textElements[i].setAttributeNode(att);
            }

            // currentFontSize = value;

            if (value === 2) {
                currentFontSize = currentFontSize + 1;
            } else if (value === 1) {
                currentFontSize = textElements[i].getAttribute("default-font-size");
            } else {
                currentFontSize = currentFontSize - 1;
            }

            textElements[i].style.fontSize = currentFontSize + "px";
        }
    };

    return (
        <div className={`layout  ${themeClass}`}>
            <header className="header" role={"banner"}>
                <div className="headerContainer">
                    <div className="brandLogo">
                        <NavLink to="" onClick={() => dispatch(set_history(false as any))} className="headerNavPageLink">
                            <img src={props.projectData && props.projectData.projectLogoPath ? props.projectData.projectLogoPath : CGLenseLogo} height={40} />
                        </NavLink>
                    </div>
                    <nav>
                        <ul className="headerNavList">
                            <li></li>
                            <li>
                                <NavLink to="" onClick={resetChat}>
                                    {/* <i className="material-icons-outlined">add_comment</i> */}
                                    <AddCommentOutlinedIcon />
                                    NEW CHAT
                                </NavLink>
                            </li>

                            <li className="resetChatTourGuide">
                                <NavLink to="" onClick={resetChat}>
                                    {/* <i className="material-icons">rotate_left</i> */}
                                    <ModeCommentOutlinedIcon />
                                    RESET CHAT
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="" onClick={showHistory}>
                                    {/* <i className="material-icons">history</i> */}
                                    <QuestionAnswerOutlinedIcon />
                                    CHAT HISTORY
                                </NavLink>
                            </li>

                            <li>
                                <div
                                    className={`avatarSelect`}
                                    onClick={() => {
                                        setDropDown(!dropDown);
                                    }}
                                >
                                    <span>
                                        <img src={selectedAvatars.icon} width={24} height={24} />
                                        {dropDown ? (
                                            <ChevronUp20Regular className="navIconsLayoutColor" />
                                        ) : (
                                            <ChevronDown20Regular className="navIconsLayoutColor" />
                                        )}
                                    </span>
                                    AVATAR
                                </div>
                                {dropDown && (
                                    <div className="imageContainer">
                                        {azureSpeakerVoiceList.map(element => (
                                            <div
                                                key={element.id}
                                                className="imageAvatarMB"
                                                onClick={e => {
                                                    handleSelectedSpeakerData(JSON.stringify(element));
                                                    setDropDown(false);
                                                }}
                                            >
                                                <img className="imageAvtar" src={element.icon} height={50} />
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </li>
                        </ul>
                    </nav>
                    <div className="profileMenu">
                        <ul className="headerNavList">
                            <li>
                                <div className="lanuageDropdown">
                                    <div
                                        className="lanuageChoose"
                                        onClick={() => {
                                            setDropdwonLanguage(!dropdwonLanguage);
                                        }}
                                    >
                                        {/* <img src={LanguageIcon && LanguageIcon.icon} width={20} height={20} /> */}
                                        <p>
                                            {Language}{" "}
                                            <span>
                                                {dropdwonLanguage ? (
                                                    <ChevronUp20Regular className="navIconsLayoutColor" />
                                                ) : (
                                                    <ChevronDown20Regular className="navIconsLayoutColor" />
                                                )}{" "}
                                            </span>
                                        </p>
                                    </div>

                                    <div className="lanuageDropdownList">
                                        {dropdwonLanguage &&
                                            languageList.map((langItem, i) => (
                                                <div
                                                    className="lanuageDropdownItemList"
                                                    key={i}
                                                    onClick={e => {
                                                        onLanguageChange(langItem.lang);
                                                        setDropdwonLanguage(false);
                                                    }}
                                                >
                                                    <img src={langItem.icon} width={20} height={20} />
                                                    <p style={{ color: themesColor }}>{langItem.lang}</p>
                                                </div>
                                            ))}
                                    </div>
                                </div>
                            </li>
                            <li>
                                <NavLink
                                    to="/"
                                    className="headerNavPageLink"
                                    onClick={() => {
                                        toggleSettings(!settings);
                                    }}
                                >
                                    {/* <i className="material-icons-outlined">settings</i>  */}
                                    <SettingsOutlinedIcon />
                                </NavLink>
                                {settings && (
                                    <div className="settingsDropdown">
                                        <div className="colorsList">
                                            <h6>Themes</h6>
                                            {ColorList.map((color, i) => (
                                                <p
                                                    onClick={e => {
                                                        onColorChange(color);
                                                        toggleSettings(false);
                                                    }}
                                                >
                                                    <span style={{ background: color.colorCode }}></span>
                                                </p>
                                            ))}
                                        </div>

                                        <div className="layoutStyle">
                                            <h6>Layout</h6>
                                            <div
                                                className={`layoutBox ` + (layoutStyle == "row" ? "active" : "")}
                                                onClick={e => {
                                                    setLayoutStyles("row");
                                                    toggleSettings(false);
                                                }}
                                            >
                                                <span></span>
                                                <span></span>
                                            </div>
                                            <div
                                                className={`layoutBox` + (layoutStyle == "row" ? " " : "active")}
                                                onClick={e => {
                                                    setLayoutStyles("row-reverse");
                                                    toggleSettings(false);
                                                }}
                                            >
                                                <span></span>
                                                <span></span>
                                            </div>
                                        </div>

                                        <div className="accessibilitySlider">
                                            <h6>Accessibility</h6>
                                            <Box width="225px">
                                                <ThemedSlider
                                                    className="fontSizeSlider"
                                                    aria-label="Accessibility values"
                                                    track={false}
                                                    defaultValue={1}
                                                    getAriaValueText={valuetext}
                                                    onChange={fontChange}
                                                    step={null}
                                                    valueLabelDisplay="off"
                                                    min={0}
                                                    max={2}
                                                    size="small"
                                                    marks={[
                                                        {
                                                            value: 0,
                                                            label: "AZ"
                                                        },
                                                        {
                                                            value: 1,
                                                            label: "AZ"
                                                        },
                                                        {
                                                            value: 2,
                                                            label: "AZ"
                                                        }
                                                    ]}
                                                />
                                            </Box>
                                        </div>

                                        <div className="advancedChatSugges">
                                            <h6>Advanced Chat Suggessions</h6>
                                            <Box maxWidth="240px" display="flex" flexDirection="column" gap="12px" marginBottom="15px">
                                                <p>
                                                    <ThermostatIcon />
                                                    Temperature
                                                    <Tooltip title="Temperature">
                                                        <InfoIcon />
                                                    </Tooltip>
                                                </p>
                                                <ThemedSlider
                                                    aria-label="Small"
                                                    defaultValue={Number(chatTemperature)}
                                                    getAriaValueText={setChatTemperature}
                                                    step={0.1}
                                                    size="small"
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
                                            </Box>
                                            <Box maxWidth="240px" display="flex" flexDirection="column" gap="12px">
                                                <p>
                                                    <GridViewOutlinedIcon />
                                                    Token
                                                    <Tooltip title="Token">
                                                        <InfoIcon />
                                                    </Tooltip>
                                                </p>
                                                <ThemedSlider
                                                    aria-label="Token"
                                                    defaultValue={Number(chatGPTToken)}
                                                    getAriaValueText={setChatGPTToken}
                                                    step={1}
                                                    size="small"
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
                                            </Box>
                                        </div>
                                    </div>
                                )}
                            </li>
                            <li>
                                <NavLink to="/" className="headerNavPageLink">
                                    {/* <i className="material-icons-outlined">help</i>  */}
                                    <HelpOutlineOutlinedIcon />
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
                <MobileNavBar></MobileNavBar>
            </header>
            <Grid container className={`mainContent` + (layoutStyle == "row" ? " " : "rowReverse")}>
                <Outlet context={{ isFullLeftPanelOpen: isFullLeftPanelOpen }} />
            </Grid>
        </div>
    );
};

export default Layout;
