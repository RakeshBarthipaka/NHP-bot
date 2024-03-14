import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import "./Layout.scss";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { NavLink } from "react-router-dom";
import CGLenseLogo from "../../assets/CGLense_app_logo_v3.png";
import { useSelector, useDispatch } from "react-redux";
import { set_history, set_answers, set_QnA, set_recommendedQnA, set_latestQuestion } from "../chat/chatSlice";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Modal from './Modal';

import AddCommentOutlinedIcon from '@mui/icons-material/AddCommentOutlined';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined'; 
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
 
import { getLocalStorageData, setLocalStorageData } from "../../utils/clientStorage";
import azureSpeakerVoiceList from "../../utils/azureSpeakerVoiceList";
import { set_avatar } from "./layoutSlice";
import { ChevronDown20Regular, ChevronUp20Regular } from "@fluentui/react-icons";

const drawerWidth = "70%";

export default function MobileNavBar() {
    const [isKebabMenu, setKebabMenu] = React.useState(false);
    const [dropDown, setDropDown] = React.useState<boolean>(false);
    const { color: themesColor, colorCode } = useSelector((state: any) => state.theme.color);
    const dispatch = useDispatch();

    // let speakerData = getLocalStorageData("speakerData");
    
    let voiceAvatarList = azureSpeakerVoiceList;
    let speakerData = localStorage.getItem("speakerData");
    let chatBotVoice = useSelector((state:any)=> state.theme.avatar) || speakerData
  
    let selectedAvatars = speakerData && speakerData ? JSON.parse(speakerData) : voiceAvatarList[0]

    let handleSelectedSpeakerData = (voiceData:any) => {
      dispatch(set_avatar(voiceData));
      setLocalStorageData("speakerData", voiceData);
    };
  
    let onSelectChatBotTypes = (chatBotVoice:any) => {
      handleSelectedSpeakerData(JSON.parse(chatBotVoice));
    };
    

    const showHistory = () => {
        dispatch(set_history(true as any));
    };

    const resetChat = () => {
        dispatch(set_history(false as any)), dispatch(set_answers([] as any));
        dispatch(set_QnA([] as any));
        dispatch(set_recommendedQnA([] as any));
        dispatch(set_latestQuestion("" as any));
    };

   

    const showKebabMenu = () => {
      //@ts-ignore
        setKebabMenu((prevState: any) => !prevState);
    };

    return (
        <AppBar className='headerContainerMobile' position="static" style={{ backgroundColor: `${colorCode}`, height: "62px" }}>
            <Toolbar>
                <div className='headerContainerMobileLogo'>
                    {/* <NavLink to="/home">
                        <IconButton>
                            <img src={CGLenseLogo} height={20} />
                        </IconButton>
                    </NavLink>  */}
                    <NavLink to="" onClick={resetChat}>
                        <AddCommentOutlinedIcon />
                        <div>New Chat</div>
                    </NavLink>
                    <NavLink to="" onClick={resetChat}>
                         <ModeCommentOutlinedIcon />
                        <div>Reset Chat</div>
                    </NavLink>
                    <NavLink to="" onClick={showHistory}>
                        <QuestionAnswerOutlinedIcon />
                        <div>Chat History</div>
                    </NavLink>
                    <div>
                    <div
                                    className="avatarSelect"
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
                                    <div className="imageContainer">
                                        {azureSpeakerVoiceList.map((element) => (
                                            <div key={element.id}
                                                style={{ marginBottom: "5px" }}
                                                onClick={(e) => {
                                                    handleSelectedSpeakerData(JSON.stringify(element))
                                                    setDropDown(false);
                                                }}
                                            >
                                                <img className="imageAvtar" src={element.icon} height={50} />
                                            </div>
                                        ))}
                                    </div>
                                )}
                    </div>

                    <OpenInFullIcon  className="fullViewBtn"/> 

                    {/* <MoreVertIcon onClick={showKebabMenu} />
                    <Modal
                        shown={isKebabMenu}
                    /> */}
                </div>
            </Toolbar>
        </AppBar>
    );
}
