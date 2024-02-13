import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Stack, IStackProps } from "@fluentui/react";
import { DefaultButton } from '@fluentui/react/lib/Button';
import { useState } from "react";
import styles from "./Answer.module.css";
import {
  AskResponse,
  feedBackApi,
  feedbackRequest,
} from "../../api";


export default function FormDialog(props: any) {
  const [offensiveStyle, setOffensiveStyle] = useState<any>({ color: "gray", borderRadius: "8px", padding: "20px" });
  const [irrelevantStyle, setIrrelevantStyle] = useState<any>({ color: "gray", borderRadius: "8px", padding: "20px" });
  const [notFunctionalStyle, setNotFunctionalStyle] = useState<any>({ color: "gray", borderRadius: "8px", padding: "20px" });
  const [commentSelect, setCommentSelect] = useState<any>([]);
  const [additionalComments, setAdditionalComments] = useState("");

  const likeDisLikeAnswer = async (user_reaction: string) => {
    const request: feedbackRequest = {
      exchange_id: props.answer.exchange_id,
      answer: props.answer.answer,
      reaction: user_reaction,
      additional_comments: additionalComments,
      comment_categories: commentSelect
    };

    try {
      const result = await feedBackApi(request);
      if (result.status === "PASS") {
        if (user_reaction === "DISLIKE") {
          setCommentSelect([])
          setAdditionalComments("");
          setNotFunctionalStyle({ color: "gray", borderRadius: "8px", padding: "20px" })
          setOffensiveStyle({ color: "gray", borderRadius: "8px", padding: "20px" })
          setIrrelevantStyle({ color: "gray", borderRadius: "8px", padding: "20px" })
          props.setShowDisLike(true)
          props.setShowAlertBox(true)
          props.setErrorTypes("success")
          handleClose()
          setTimeout(() => {
            props.setErrorTypes("error")
            props.setShowAlertBox(false)
          }, 4000)
        }
      }
      else {
        props.setShowAlertBox(true)
        handleClose()
        setTimeout(() => {
          props.setShowAlertBox(false)
        }, 4000)
      }
    }
    catch (e) {
      props.setShowAlertBox(true)
      handleClose()
      setTimeout(() => {
        props.setShowAlertBox(false)
      }, 4000)
    }

  };

  const handleClose = () => {
    props.setshowCommentBox(false);
  };

  const offensiveClick = () => {
    let comentTemp: Array<string> = [...commentSelect]
    if (offensiveStyle?.color === "gray") {
      comentTemp.push("Offensive / Unsafe")
      setOffensiveStyle({ color: "white", backgroundColor: "var(--link-color)", borderRadius: "8px", padding: "20px" })
    } else {
      let temp = comentTemp?.filter((each: any) => each !== "Offensive / Unsafe")
      setOffensiveStyle({ color: "gray", borderRadius: "8px", padding: "20px" })
      comentTemp = temp;
    }
    setCommentSelect([...comentTemp])
  }
  const irrelevantClick = () => {
    let comentTemp: Array<string> = [...commentSelect]
    if (irrelevantStyle?.color === "gray") {
      comentTemp.push("Irrelevant")
      setIrrelevantStyle({ color: "white", backgroundColor: "var(--link-color)", borderRadius: "8px", padding: "20px" })
    } else {
      let temp = comentTemp?.filter((each: any) => each !== "Irrelevant")
      setIrrelevantStyle({ color: "gray", borderRadius: "8px", padding: "20px" })
      comentTemp = temp;
    }
    setCommentSelect([...comentTemp])
  }
  const notFunctionalClick = () => {
    let comentTemp: Array<string> = [...commentSelect]
    if (notFunctionalStyle?.color === "gray") {
      comentTemp.push("Not factually correct")
      setNotFunctionalStyle({ color: "white", backgroundColor: "var(--link-color)", borderRadius: "8px", padding: "20px" })
    } else {
      let temp = comentTemp?.filter((each: any) => each !== "Not factually correct")
      setNotFunctionalStyle({ color: "gray", borderRadius: "8px", padding: "20px" })
      comentTemp = temp;
    }
    setCommentSelect([...comentTemp])
  }

  const additional = (value: any) => {
    setAdditionalComments(value)
  }

  const CommentSpacingColumnProps: Partial<IStackProps> = {
    tokens: { childrenGap: 25 },
    styles: { root: { paddingTop: 10 } },
  };


  return (
    <div>
      <Dialog open={props.showCommentBox} onClose={handleClose}>
        <DialogContent>
          <h2 style={{ textAlign: "center" }}>Feedback</h2>
          <p style={{ color: "black", margin: "1rem 0" }}>Why did you choose this rating? (optional)</p>
          <div className={styles.feedbackButtonList} >
            <DefaultButton text="Offensive / Unsafe" style={offensiveStyle} onClick={() => offensiveClick()} allowDisabledFocus />
            <DefaultButton text="Irrelevant" style={irrelevantStyle} onClick={() => irrelevantClick()} allowDisabledFocus />
            <DefaultButton text="Not factually correct" style={notFunctionalStyle} onClick={() => notFunctionalClick()} allowDisabledFocus />
          </div>
          <input className={styles.feedbackTextInput} type="text" value={additionalComments} onChange={(e: any) => additional(e.target.value)} placeholder="Provide additional feedback"></input>
        </DialogContent>
        <DialogActions className={styles.feedbackTextAction}>
          <Button variant='outlined' onClick={handleClose}>Cancel</Button>
          <Button variant='outlined' onClick={() => likeDisLikeAnswer("DISLIKE")}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}