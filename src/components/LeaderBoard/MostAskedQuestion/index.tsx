import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import "react-tabs/style/react-tabs.css";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
//import style from "../../LeaderBoard/LeaderBoard.module.scss";
import { MostAskedQuestion as Questions } from "../../../utils/MockData";
import SortOutlinedIcon from "@mui/icons-material/SortOutlined";
import { Button, ButtonGroup } from "@mui/material";
import { getApi } from "../../../api";
import DOMPurify from "dompurify";

const MostAskedQuestion = (props: any) => {
    const [displayAnsId, setDisplayAnsId] = useState<number>(0);
    const [mostAskedData, setMostAskedData] = useState([]);
    const [showMore, setShowMore] = useState(false);
    const [showText, setShowText] = useState(false);
    const [isDisplayAnswer, setIsDisplayAnswer] = useState<string>();
    const [isDisplayAnswerToggle, setIsDisplayAnswerToggle] = useState<boolean>(false);

    useEffect(() => {
        async function getMostAskedQuestions() {
            const response = await getApi("get_most_asked_questions");
            setMostAskedData(response);
        }
        getMostAskedQuestions();
    }, []);

    const toggleAnswerDisplay = (id: any) => {
        console.log(id, isDisplayAnswer,isDisplayAnswerToggle,'id');
        if (isDisplayAnswer === id && isDisplayAnswerToggle === true) {
            setIsDisplayAnswerToggle(false);
        } else if (isDisplayAnswer === undefined && isDisplayAnswerToggle === false) {
            setIsDisplayAnswerToggle(true);
        } else if (isDisplayAnswer !== id && isDisplayAnswerToggle !== true) {
            setIsDisplayAnswerToggle(true);
        } else if (isDisplayAnswer === id && isDisplayAnswerToggle !== true) {
            setIsDisplayAnswerToggle(true);
        }
    };

    // const toggleAnswerDisplay = (id: any) => {
    //     if (isDisplayAnswer && id === displayAnsId) {
    //         setIsDisplayAnswer(false);
    //     } else {
    //         setIsDisplayAnswer(true);
    //     }
    //     setDisplayAnsId(id);
    // };

    const sanitizedAnswerHtml = (response: any) => {
        const responses: any = DOMPurify.sanitize(response).replace(/href/g, "target='_blank' href");
        return {
            __html: responses
        };
    };

    return (
        <>
            {/* <Box className="asked-question-top-box">
                <ButtonGroup className="mui-custom-toggle" variant="outlined" aria-label="Basic button group">
                    <Button className="mui-toggle-active">
                        <span className="iconText">
                            <RemoveRedEyeOutlinedIcon className="viewIcon IconElemt" />
                        </span>
                        <span>By Views</span>
                    </Button>
                    <Button>
                        <span className="iconText">
                            <SortOutlinedIcon className="ShortByIcon IconElemt" />
                        </span>
                        <span>By Date</span>
                    </Button>
                </ButtonGroup>
                <ButtonGroup className="mui-custom-toggle" variant="outlined" aria-label="Basic button group">
                    <Button className="mui-toggle-active">Top 10</Button>
                    <Button>ALL</Button>
                </ButtonGroup>
            </Box> */}
            <br></br>
            {mostAskedData?.slice(0, 10)?.map((item: any, index) => {
                return (
                    <React.Fragment key={index}>
                        <Box
                            className={`question-box ${isDisplayAnswer && isDisplayAnswer === item?.text ? "active-tab" : ""}`}
                            onClick={() => {
                                setIsDisplayAnswer(item?.text);
                                //setIsDisplayAnswerToggle(!isDisplayAnswerToggle);
                                toggleAnswerDisplay(item?.text);
                            }}
                        >
                            <Box
                                sx={{
                                    width: "23px",
                                    float: "left",
                                    paddingRight: "2px"
                                }}
                            >
                                {isDisplayAnswer && isDisplayAnswer === item?.text ? (
                                    <RemoveCircleOutlineOutlinedIcon
                                        sx={{
                                            fontSize: 20
                                        }}
                                    />
                                ) : (
                                    <ControlPointIcon
                                        sx={{
                                            fontSize: 20
                                        }}
                                    />
                                )}
                            </Box>
                            <Box className="question-text">
                                <Typography className="question">{item?.text}</Typography>
                                <Typography className="otherInfo">
                                    requested by: {item?.requested_by} requested on: {item?.requested_on}
                                    <span>
                                        <RemoveRedEyeOutlinedIcon className="viewIcon" />
                                    </span>{" "}
                                    {item?.asked_count}
                                </Typography>
                            </Box>
                        </Box>
                        {isDisplayAnswer && isDisplayAnswer === item?.text && (
                            <div className="answer-container">
                                <Box>
                                    <Typography>
                                        {showMore && showText === item?.text ? (
                                            <div dangerouslySetInnerHTML={sanitizedAnswerHtml(item?.response)} />
                                        ) : (
                                            <div dangerouslySetInnerHTML={sanitizedAnswerHtml(item?.response.substring(0, 200))} />
                                        )}

                                        {showText !== item?.text && item?.response?.length > 200 && (
                                            <div
                                                onClick={() => {
                                                    setShowMore(true);
                                                    setShowText(item?.text);
                                                }}
                                                className="showMore-spacer"
                                            >
                                                <a className="showMore-link">Show more.</a>
                                            </div>
                                        )}
                                    </Typography>
                                </Box>
                            </div>
                        )}
                    </React.Fragment>
                );
            })}
        </>
    );
};

export default MostAskedQuestion;
