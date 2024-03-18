import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Stack, IStackProps } from "@fluentui/react";
import { DefaultButton } from "@fluentui/react/lib/Button";
import { useState } from "react";
//import styles from "./Answer.module.css";
import { AskResponse, feedBackApi, feedbackRequest } from "../../api";
import "./Answer.scss";

export default function FormDialog(props: any) {
    const [offensiveStyle, setOffensiveStyle] = useState<any>({
        color: "rgba(12, 9, 156, 1)",
        borderRadius: "18px",
        padding: "20px",
        border: "2px solid rgba(12, 9, 156, 1)"
    });
    const [irrelevantStyle, setIrrelevantStyle] = useState<any>({
        color: "rgba(12, 9, 156, 1)",
        borderRadius: "18px",
        padding: "20px",
        border: "2px solid rgba(12, 9, 156, 1)"
    });
    const [notFunctionalStyle, setNotFunctionalStyle] = useState<any>({
        color: "rgba(12, 9, 156, 1)",
        borderRadius: "18px",
        padding: "20px",
        border: "2px solid rgba(12, 9, 156, 1)"
    });
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
                    setCommentSelect([]);
                    setAdditionalComments("");
                    setNotFunctionalStyle({ color: "gray", borderRadius: "18px", padding: "20px", border: "2px solid rgba(12, 9, 156, 1)" });
                    setOffensiveStyle({ color: "gray", borderRadius: "18px", padding: "20px", border: "2px solid rgba(12, 9, 156, 1)" });
                    setIrrelevantStyle({ color: "gray", borderRadius: "18px", padding: "20px", border: "2px solid rgba(12, 9, 156, 1)" });
                    props.setShowDisLike(true);
                    props.setShowAlertBox(true);
                    props.setErrorTypes("success");
                    handleClose();
                    setTimeout(() => {
                        props.setErrorTypes("error");
                        props.setShowAlertBox(false);
                    }, 4000);
                }
            } else {
                props.setShowAlertBox(true);
                handleClose();
                setTimeout(() => {
                    props.setShowAlertBox(false);
                }, 4000);
            }
        } catch (e) {
            props.setShowAlertBox(true);
            handleClose();
            setTimeout(() => {
                props.setShowAlertBox(false);
            }, 4000);
        }
    };

    const handleClose = () => {
        props.setshowCommentBox(false);
    };

    const offensiveClick = () => {
        let comentTemp: Array<string> = [...commentSelect];
        if (offensiveStyle?.color === "gray") {
            comentTemp.push("Offensive / Unsafe");
            setOffensiveStyle({ color: "white", backgroundColor: "var(--link-color)", borderRadius: "8px", padding: "20px" });
        } else {
            let temp = comentTemp?.filter((each: any) => each !== "Offensive / Unsafe");
            setOffensiveStyle({ color: "gray", borderRadius: "8px", padding: "20px" });
            comentTemp = temp;
        }
        setCommentSelect([...comentTemp]);
    };
    const irrelevantClick = () => {
        let comentTemp: Array<string> = [...commentSelect];
        if (irrelevantStyle?.color === "gray") {
            comentTemp.push("Irrelevant");
            setIrrelevantStyle({ color: "white", backgroundColor: "var(--link-color)", borderRadius: "8px", padding: "20px" });
        } else {
            let temp = comentTemp?.filter((each: any) => each !== "Irrelevant");
            setIrrelevantStyle({ color: "gray", borderRadius: "8px", padding: "20px" });
            comentTemp = temp;
        }
        setCommentSelect([...comentTemp]);
    };
    const notFunctionalClick = () => {
        let comentTemp: Array<string> = [...commentSelect];
        if (notFunctionalStyle?.color === "gray") {
            comentTemp.push("Not factually correct");
            setNotFunctionalStyle({ color: "white", backgroundColor: "var(--link-color)", borderRadius: "8px", padding: "20px" });
        } else {
            let temp = comentTemp?.filter((each: any) => each !== "Not factually correct");
            setNotFunctionalStyle({ color: "gray", borderRadius: "8px", padding: "20px" });
            comentTemp = temp;
        }
        setCommentSelect([...comentTemp]);
    };

    const additional = (value: any) => {
        setAdditionalComments(value);
    };

    const CommentSpacingColumnProps: Partial<IStackProps> = {
        tokens: { childrenGap: 25 },
        styles: { root: { paddingTop: 10 } }
    };

    return (
        <div>
            <Dialog open={props.showCommentBox} onClose={handleClose}>
                <DialogContent className="dialog-content-container">
                    <h2 className="feedback-text-heading">Feedback</h2>
                    <p className="un-link-p">Please provide your feedback for UN-liking as option</p>
                    <p className="opt-question-p">Why did you choose this rating? (optional)</p>
                    <div className="feedbackButtonList">
                        <DefaultButton text="Offensive / Unsafe" style={offensiveStyle} onClick={() => offensiveClick()} allowDisabledFocus />
                        <DefaultButton text="Irrelevant" style={irrelevantStyle} onClick={() => irrelevantClick()} allowDisabledFocus />
                        <DefaultButton text="Not factually correct" style={notFunctionalStyle} onClick={() => notFunctionalClick()} allowDisabledFocus />
                    </div>
                    <input
                        className="feedbackTextInput"
                        type="text"
                        value={additionalComments}
                        onChange={(e: any) => additional(e.target.value)}
                        placeholder="Provide additional feedback"
                    ></input>
                </DialogContent>
                <DialogActions className="feedbackTextAction">
                    <Button className="feedback-cancel-btn" variant="contained" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button className="feedback-submit-btn" variant="contained" onClick={() => likeDisLikeAnswer("DISLIKE")}>
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
