import React, { useState } from 'react';
import {
  Tabs,
  Tab,
  Typography,
  Box,
  Dialog,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import {
  EmojiObjects as EmojiObjectsIcon,
  ContentPaste as ContentPasteIcon,
} from '@mui/icons-material';
import DOMPurify from 'dompurify';
import { SupportingContent } from '../SupportingContent';
import styles from '../AnalysisPanel/AnalysisPanel.module.css';
import { useSelector } from "react-redux";


interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;


  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`modal-tabpanel-${index}`}
      aria-labelledby={`modal-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default function AnalysisPanelPopUp(props: any) {
  let activePanel = props.activeTab === 'thoughtProcess' ? 0 : 1;
  const [openModal, setOpenModal] = useState(true);
  const [value, setValue] = useState(activePanel);
  const {colorCode} = useSelector((state:any)=>state.theme.color)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    props.onActiveTabChanged();
  };

  const sanitizedThoughts = DOMPurify.sanitize(props.answer.thoughts!);

  return (
    <div>
      <Dialog open={openModal} onClose={handleCloseModal} fullWidth maxWidth="md">
        <DialogContent  className={styles.AnalysisPanelModalScrollbar}>
          <Tabs
            sx={{
              '.Mui-selected': {
                color: 'white !important',
              },
              '.MuiTabs-scroller':{
                background:colorCode
              }
            }}
            centered
            value={value}
            TabIndicatorProps={{ style: { background: colorCode } }}
            onChange={handleChange}
            aria-label="tabs inside modal"
          >
            <Tab sx={{ color: 'white' }} icon={<EmojiObjectsIcon />} label="Thought Process" />
            <Tab sx={{ color: 'white' }} icon={<ContentPasteIcon />} label="Supporting Content" />
          </Tabs>

          <CustomTabPanel value={value} index={0}>
            <div dangerouslySetInnerHTML={{ __html: sanitizedThoughts }} />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <SupportingContent supportingContent={props.answer.data_points} />
          </CustomTabPanel>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center' }}>
          <Button sx={{ color: 'white', background:colorCode }}  onClick={handleCloseModal}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
