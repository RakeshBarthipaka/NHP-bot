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
  Toolbar,
} from '@mui/material';
import {
  EmojiObjects as EmojiObjectsIcon,
  ContentPaste as ContentPasteIcon,
} from '@mui/icons-material';
import DOMPurify from 'dompurify';
import { SupportingContent } from '../SupportingContent';
import '../AnalysisPanel/AnalysisPanel.scss';
import { useSelector } from "react-redux";

import { Drawer } from '@mui/material';
// import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import PsychologyAltOutlinedIcon from '@mui/icons-material/PsychologyAltOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import { LogsData } from '../LogsData/LogsData';
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";


interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

// function CustomTabPanel(props: TabPanelProps) {
//   const { children, value, index, ...other } = props;


//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`modal-tabpanel-${index}`}
//       aria-labelledby={`modal-tab-${index}`}
//       {...other}
//     >
//       {value === index && (
//         <Box sx={{ p: 3 }}>
//           <Typography>{children}</Typography>
//         </Box>
//       )}
//     </div>
//   );
// }

export default function AnalysisPanelPopUp(props: any) {
  // let activePanel = props.activeTab === 'thoughtProcess' ? 0 : 1;
  let activePanel = props.activeTab;
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
      <Drawer
        anchor='right'
        open={openModal}
        onClose={handleCloseModal}
        className='drawerContentDiv'

        PaperProps={{
          sx: { width: "600px", maxWidth: '90%' },
        }}
      >
        {value == 'thoughtProcess' ? (
          <div>
            <Toolbar sx={{ background: colorCode, color: '#fff' }}> 
              <PsychologyAltOutlinedIcon className='iconAnalysis'/>
              <Typography variant="h6"  fontSize={"18px"} noWrap component="div">
                Thought Process
              </Typography>
            </Toolbar>

            <div className='drawerContent'>

              <div dangerouslySetInnerHTML={{ __html: sanitizedThoughts }} />
            </div>
          </div>
        ) : value == 'supportingContent'  ?  (
          <div>
            <Toolbar sx={{ background: colorCode, color: '#fff' }}>
              <DescriptionOutlinedIcon className='iconAnalysis'/>
              <Typography variant="h6" fontSize={"18px"}  noWrap component="div">
                Suggested Content
              </Typography>
            </Toolbar>

            <div className='drawerContent'>

              <SupportingContent supportingContent={props.answer.data_points} />
            </div>
          </div>

        ) : (
          <div>
            <Toolbar sx={{ background: colorCode, color: '#fff' }}>
              <HistoryOutlinedIcon className='iconAnalysis'  />
              <Typography variant="h6" fontSize={"18px"} noWrap component="div">
                Logs Data
              </Typography>
            </Toolbar>

            <div className='drawerContent'>

              <LogsData />
            </div>
          </div>
        )

        }
      </Drawer>

    </div>
  );
}
