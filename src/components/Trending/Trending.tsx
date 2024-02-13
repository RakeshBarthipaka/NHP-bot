import styles from "./Trending.module.css";
import * as React from 'react';
import { useState, useEffect } from "react";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { fecthApi } from "../../api";
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { useSelector } from "react-redux";
interface Props {
    onExampleClicked: (value: string) => void;
}

export const TrendingQuestionAnswer = ({ onExampleClicked }: Props) => {
    const [expanded, setExpanded] = React.useState<string | false>(false);
    const [faqList, setFaqList] = useState<any>([
        {
            answer:"Hello! How can I assist you today?"
        }
    ]);
    const {colorCode} = useSelector((state:any)=>state.theme.color)
    const [isLoaded, setIsLoaded] = useState(false);

    const getFaqData = async () => {
        try {
            const response =  await fecthApi("sample_queries")
            if (response.status==="PASS"){
                // setFaqList(response.question)
                setIsLoaded(true)    
            }
        }
        catch(error){
            setFaqList(['hi , can you help me?'])
        }
    }

    useEffect(() => {
        if (!isLoaded) {
            getFaqData();
        }
    }, [isLoaded]);


    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };


    return (
        <>
            <Accordion className={`${styles.recommendedFAQBlock}`} sx={{border: "1px solid var(--border-color)", boxShadow: "none" }} expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{color:colorCode}} />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                >
                    <div className={`${styles.recommendedFAQTitle}`}>
                        <i className="material-icons" style={{color:colorCode}}>trending_up</i>
                        <p style={{color:colorCode}}>Trending Answers</p>
                    </div>
                </AccordionSummary>
                <AccordionDetails>
                    <div className={`${styles.recommendedFAQList}`}  >
                        {
                            faqList.map((item: any, i: any) => (
                                <div className={`${styles.recommendedFAQItem}`} key={i} style={{cursor:"not-allowed"}}>
                                    <p>{item.answer}</p>
                                </div>
                            ))
                        }
                    </div>
                </AccordionDetails>
            </Accordion>

        </>
    );
};


