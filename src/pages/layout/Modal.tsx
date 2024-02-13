import React, { useState } from "react";
import styles from "./Modal.module.css";

import { RecommendedFAQ } from "../../components/FAQ/FAQ";
import { Stack } from "@fluentui/react";
import { ChevronDown20Regular } from "@fluentui/react-icons";
import azureSpeakerVoiceList from "../../utils/azureSpeakerVoiceList";
import {
  getLocalStorageData,
  setLocalStorageData,
} from "../../utils/clientStorage";
import { set_avatar,set_color } from "./layoutSlice";
import  { useDispatch,useSelector } from "react-redux";
import {ColorList} from '../../utils/colors';

//@ts-ignore
const Modal = ({shown}) => {
  const dispatch = useDispatch();
  const [dropDown, setDropDown] = useState(false);
  let speakerData = getLocalStorageData("speakerData");
  let chatBotVoice = useSelector((state:any)=> state.theme.avatar) || speakerData

  let voiceAvatarList = azureSpeakerVoiceList;

  let handleSelectedSpeakerData = (voiceData:any) => {
    dispatch(set_avatar(voiceData));
    setLocalStorageData("speakerData", voiceData);
  };

  let onSelectChatBotTypes = (chatBotVoice:any) => {
    handleSelectedSpeakerData(JSON.parse(chatBotVoice));
  };

  const changeTheme = (color:any) => {
    localStorage.setItem("color", JSON.stringify(color))
    dispatch(set_color(color))
  }

  return shown ? (
    <div
      className={styles.modalWrapper}
    >
      <div
        className={styles.modal}
        style={{ padding: "15px" }}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Stack>
          <div className={styles.container}>
            <div
              className={styles.avatarInputContainer}
              onClick={() => {
                setDropDown(!dropDown);
              }}
            >
              <p className={styles.selectAvatar}>
                Select Avatar <span>{<ChevronDown20Regular />} </span>
              </p>
            </div>
            <div>
              <img src={chatBotVoice.icon} width={30} height={30} />
            </div>
          </div>

          {dropDown && (
            <div className={styles.imageContainer}>
              {voiceAvatarList.map((element) => (
                <div
                  key={element.id}
                  onClick={(e) => {
                    onSelectChatBotTypes(JSON.stringify(element));
                    setDropDown(false);
                  }}
                >
                  <img className={styles.imageAvtar} src={element.icon} height={50} />
                </div>
              ))}
            </div>
          )}
        </Stack>
        <div className={styles.recommendation}>
          {/* <RecommendedFAQ /> */}
        </div>
        <div>
          <h4>Themes</h4>
          <div style={{display:"flex",flexWrap:"wrap",gap:"15px"}}>
                  {ColorList.map((color : any)=>{
                    console.log(color.colorCode,'././../')
                    return <span style={{borderRadius:"50%",height:"25px",width:"25px",backgroundColor:`${color.colorCode}`}} onClick={()=>changeTheme(color)}></span>
                  })}
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default Modal;
