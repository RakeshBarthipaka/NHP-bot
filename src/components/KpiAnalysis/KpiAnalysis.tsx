import { Box } from "@mui/material";
import styles from "./KpiAnalysis.module.css";

import TroubleshootOutlinedIcon from '@mui/icons-material/TroubleshootOutlined';

const KpiAnalysis = () => {

    return (
        <>
            <Box sx={{ width: "100%", padding: "5px 15px" }}>
                <Box className="leader-board-heading"> 
                    <TroubleshootOutlinedIcon />
                    <h3 className="disply-page-title">KPI Analysis</h3>
                </Box>
                <Box>
                    <h4>Gross Margin</h4>
                </Box>
            </Box>
        </>
    );
};

export default KpiAnalysis;