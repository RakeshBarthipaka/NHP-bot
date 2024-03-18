import styles from "./UploadedDocument.module.css";
import * as React from 'react';
import { useState, useEffect } from "react";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { getApi, postApi } from "../../api";
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { useSelector } from "react-redux";

interface Props {
    onFileViewURLClicked: (value: string) => void;
}

export const UploadedDocumentView = ({ onFileViewURLClicked }: Props) => {
    const [expanded, setExpanded] = React.useState<string | false>(false);
    const [UploadFileList, setUploadFileList] = useState<any>([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [selectedFile, setSelectedFile] = useState('');
    const [loading, setLoading] = useState(false);
    const {colorCode} = useSelector((state:any)=>state.theme.color)

    const getUploadFileData = async () => {
        try {
            const response = await getApi("api/v1/document/document-list?sort=-id&page=1&size=4")
            setUploadFileList(response.items)
            setIsLoaded(true)
        } catch (error) {
            setUploadFileList([''])
        }
    }

    useEffect(() => {
        if (!isLoaded) {
            getUploadFileData();
        }
    }, [isLoaded]);

    const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    const handleFileChange = async (event: any) => {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append("files", file);
        setSelectedFile(file.name);
        setLoading(true)
        try {
            const resp = await postApi(formData, `api/v1/document/document-create`);
            if (resp.status === 200) {
                setLoading(false);
                setIsLoaded(false);
            } else {
                setLoading(false);
            }
        } catch (err) {
            setLoading(false);
        }
    }

    return (
        <Accordion className={`${styles.UploadedDocumentBlock} dcoumentUploadGuide`} sx={{ border: "1px solid var(--border-color)", boxShadow: "none" }} expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{color:colorCode}}/>}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
            >
                <div className={`${styles.UploadedDocumentTitle}`}>
                    <i className="material-icons" style={{color:colorCode}}>cloud_upload</i>
                    <p style={{color:colorCode}}>Upload File</p>
                </div>
            </AccordionSummary>
            <AccordionDetails>
                <div className={`${styles.UploadedDocumentList}`}  >
                    <div className={`${styles.UploadedDocumentFileBlock}`}>
                        <Button
                            style={{background:colorCode}}
                            variant="contained"
                            component="label"
                            disabled={loading}
                            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
                        >
                            {loading ? 'Uploading...' : 'Upload File'}
                            <input
                                id="file-upload"
                                type="file"
                                accept=".pdf"
                                style={{ display: 'none' }}
                                onChange={handleFileChange}
                                disabled={loading}
                            />
                        </Button>
                        {selectedFile && (
                            <div>
                                <p>Selected File: {selectedFile}</p>
                            </div>
                        )}
                    </div>

                    {UploadFileList && UploadFileList.map((item: any, i: any) => (
                        <div className={`${styles.UploadedDocumentItem}`} key={i} onClick={() => onFileViewURLClicked(item.files)}>
                            <p>{item.filename}</p>
                        </div>
                    ))}
                </div>
            </AccordionDetails>
        </Accordion>
    );
};
