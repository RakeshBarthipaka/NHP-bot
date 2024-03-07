import "./FAQ.scss";
import * as React from 'react';
import { useState, useEffect } from "react";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { fecthApi } from "../../api";
import { useSelector } from "react-redux";


interface Props {
    onExampleClicked: (value: string) => void;
}

export const RecommendedFAQ = ({ onExampleClicked }: Props) => {
    const [expanded, setExpanded] = React.useState<string | false>(false);
    const [faqList, setFaqList] = useState<any>([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const {colorCode} = useSelector((state:any)=>state.theme.color)

    const getFaqData = async () => {
        try {
            const response =  await fecthApi("sample_queries")
            if (response.status==="PASS"){
                setFaqList(response.question)
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
            <Accordion className='recommendedFAQBlock' sx={{border: "1px solid var(--border-color)", boxShadow: "none" }} expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{color:colorCode}}/>}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                >
                    <div className='recommendedFAQTitle'>
                        <i className="material-icons" style={{color:colorCode}}>quiz</i>
                        <p style={{color:colorCode}}>Recommended Queries</p>
                    </div>
                </AccordionSummary>
                <AccordionDetails>
                    <div className='recommendedFAQList'  >
                        {
                            faqList.map((item: any, i: any) => (
                                <div className='styles.recommendedFAQItem' key={i} onClick={() => onExampleClicked(item)}>
                                    <p>{item}</p>
                                </div>
                            ))
                        }
                    </div>
                </AccordionDetails>
            </Accordion>

        </>
    );
};


