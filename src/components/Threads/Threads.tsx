import styles from "../Threads/Threads.module.css";
import * as React from 'react';
import { useState, useEffect } from "react";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { getApi, deleteApi, updateApi } from "../../api";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IosShareIcon from '@mui/icons-material/IosShare';
import TextField from '@mui/material/TextField';
import DownloadPDF from "../Answer/GeneratePDF";
import {useSelector} from 'react-redux';


interface Props {
    threadCallBack: (value: any) => void;
    activeThread: any;
    setActiveThread: any;
    chatData: any

}

const PreviousThreads: React.FC<Props> = ({ threadCallBack, activeThread, setActiveThread, chatData }: Props) => {
    const [allThreads, setThreads] = useState<any[]>([]);
    const [expanded, setExpanded] = React.useState<string | false>(false);
    const [isThreadDataLoaded, setIsThreadDataLoaded] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [anchorThreadID, setAnchorThreadID] = useState<string | null>(null);
    const [editingThreadId, setEditingThreadId] = useState<string | null>(null);
    let userID = localStorage.getItem("userID") ? localStorage.getItem("userID") : 0;
    const {colorCode} = useSelector((state : any)=>state.theme.color)

    const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    const onThreadClick = (data: any, thread_id: any) => {
        localStorage.setItem("currentThread", thread_id)
        threadCallBack(data);
        setIsThreadDataLoaded(false)
        setActiveThread(thread_id)
    };

    const getThreadData = async () => {
        try {
            const response = await getApi(`api/v1/chat-thread/chat-thread-list?user_id=${userID}&sort=-id`);
            if (response) {
                setThreads(response.items);
                setIsThreadDataLoaded(true);
            }
        } catch (error) {
            setThreads([]);
        }
    };

    useEffect(() => {
        if (!isThreadDataLoaded) {
            getThreadData();
        }
    }, [isThreadDataLoaded]);

    useEffect(() => {
        if (chatData.length === 1) {
            setIsThreadDataLoaded(false);
        }
    }, [chatData]);

    const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
        const threadID = event.currentTarget.getAttribute('data-id');
        setAnchorThreadID(threadID);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleDelete = async () => {
        const response = await deleteApi(`api/v1/chat-thread/chat-thread-delete/${anchorThreadID}`);
        handleMenuClose();
        setIsThreadDataLoaded(false);
    };

    const handleRename = () => {
        setEditingThreadId(anchorThreadID)
        handleMenuClose();
    };

    const handleThreadNameEdit = async (event: any, item: any) => {
        const updatedThreads = allThreads.map((thread) => {
            if (thread.id === item.id) {
                return {
                    ...thread,
                    thread_name: event.target.value,
                };
            }
            return thread;
        });
        const formData = new FormData()
        formData.append("thread_name", event.target.value);
        setThreads(updatedThreads);
        try {
            await updateApi(formData, `api/v1/chat-thread/chat-thread-update/${editingThreadId}`);
        } catch (error) {
            console.error('Error while renaming thread:', error);
        }
    };


    return (
        <Accordion
            className={`${styles.ThreadsBlock}`}
            sx={{ border: "1px solid var(--border-color)", boxShadow: "none" }}
            expanded={expanded === 'panel1'}
            onChange={handleChange('panel1')}
        >
            <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{color:colorCode}}/>}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
            >
                <div className={`${styles.ThreadsTitle}`}>
                    <i className="material-icons" style={{color:colorCode}}>list</i>
                    <p style={{color:colorCode}}>Threads</p>
                </div>
            </AccordionSummary>
            <AccordionDetails>
                <div className={`${styles.ThreadsList}`}>
                    {allThreads && allThreads.length > 0 && allThreads.map((item: any, i: any) => (
                        <div className={`${styles.ThreadsItem} ${activeThread === item.thread_id ? styles.ThreadsItemActive : ""}`} key={i}>
                            {editingThreadId === `${item.id}` ? (
                                <TextField
                                    label="Rename"
                                    value={item.thread_name}
                                    onChange={(event) => handleThreadNameEdit(event, item)}
                                    onBlur={() => setEditingThreadId(null)}
                                />
                            ) : (
                                <p onClick={() => onThreadClick(item.bot_response, item.thread_id)}>{`${item.thread_name}`}</p>
                            )}
                            <div key={i}>
                                <IconButton onClick={handleMenuClick} data-id={`${item.id}`}>
                                    <MoreVertIcon />
                                </IconButton>
                                <Menu
                                    anchorEl={anchorEl}
                                    open={Boolean(anchorEl)}
                                    onClose={handleMenuClose}
                                    sx={{ marginTop: '8px', }}
                                    className={`${styles.ThreadsItemOptions}`}
                                    
                                >
                                    <MenuItem onClick={() => handleRename()}>
                                        <EditIcon sx={{ marginRight: '8px' }} />
                                        Rename
                                    </MenuItem>
                                    <MenuItem onClick={() => handleDelete()}>
                                        <DeleteIcon sx={{ marginRight: '8px' }} />
                                        Delete
                                    </MenuItem>
                                    <MenuItem >
                                        <DownloadPDF  pdfData={allThreads.filter(item => `${item.id}` === anchorThreadID ).map(thread => thread.bot_response[0])}/>
                                    </MenuItem>
                                </Menu>
                            </div>
                        </div>
                    ))}
                </div>
            </AccordionDetails>
        </Accordion>
    );
};

export default PreviousThreads;
