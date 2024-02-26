import React from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';

const boxStyle = {
    width: 'auto',
    p: 1,
    bgcolor: '#F2F2F7',
    color: "#333333",
    borderRadius: 2,
    fontSize: '0.8rem',
    marginBottom: '0.5rem',
    cursor: 'pointer'
}

const MostLikedAnswer = () => {
  return (
    <Box marginX={1}
    sx={boxStyle}>
        <Box>
            <Box sx={{
                backgroundColor: "#FFFFFF",
                padding: '13px',
                borderRadius: '10px',
                marginBottom: '5px',
            }}>
                <Typography fontSize={11} fontWeight="bold" color="#0C099C">Show recommended Queries after one Queries that info come from history</Typography>

                <Box>
                    <Typography fontSize={10} fontWeight="bold" color="#5376F0">requested by: Vishnu  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;requested on: 22/01/2024
                    </Typography>
                    
                </Box>
                
            </Box>
            <Typography fontSize='0.7rem' padding='10px'>
                <span>
                    <ThumbUpOutlinedIcon />
                </span>
                Financial growth is an aspect of improving your personal finances and becoming more financially stable. When you are in the process of improving your finances, there are a few other approaches to your lifestyle that you can implement that will improve your financial position further.
                These approaches are meant to advance your financial standing and be a boost to your financial improvements. Your plan for paying off your outstanding debts is similar to your plan for paying off your loans. Debts should be one of your top priorities now that you are attempting to jump start financial growth.
                Make an initial assessment of all of your outstanding debts and then make a plan to tackle each one. Starting with the lowest balance is best because that debt can be paid off quick and easy. Attempt to pay off a couple at a time, depending on your debt load so that you can get out of your debts much faster.
            </Typography>
        </Box>
    </Box>
  )
}

export default MostLikedAnswer