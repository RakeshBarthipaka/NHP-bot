import React, { useState, useEffect } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { fecthApi } from '../../api';


interface Row {
    id: number;
    time: string;
    text: string;
    response: string;
}



interface ActionsCellProps {
    row: Row;
    onClick?: (row: Row) => void;
}

const ActionsCell: React.FC<ActionsCellProps> = ({ row, onClick }) => {
    return (
        <IconButton onClick={() => onClick && onClick(row)}>
            <VisibilityIcon />
        </IconButton>
    );
};

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID' },
    { field: 'time', headerName: 'Date', flex: 1 },
    { field: 'text', headerName: 'Query', flex: 1 },
    { field: 'response', headerName: 'Response', flex: 1 },
];

export const ChatHistory: React.FC = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedRow, setSelectedRow] = useState<Row | null>(null);
    const userEmail = localStorage.getItem('patientemail') || '';
    const [originalRows, setOriginalRows] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const resp = await fecthApi(`chathistory?patientemail=${userEmail}`);
            if (resp.data) {
                setOriginalRows(resp.data);
            }
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
        fetchData();
      }, []);

    const rows = [
        {
            id: 1,
            date: '06/02/2024 16:38:45',
            query: 'hi , can you help me?',
            response: "Of course! I'm here to help. What can I assist you with today?"
        },
        {
            id: 2,
            date: '06/02/2024 16:22:40',
            query: 'find me doctors in auckland?',
            response: "Krish Khanna, a doctor specializing in Interventional Cardiology and Cardiac Electrophysiology, is available at Auckland City vel laudantium Hospital. He has 9 years of experience and a rating of 4.97. His fee is 235.0. (Doctor ID: 51)- Mehul Sibal, a doctor specializing in Family Medicine and Internal Medicine, is available at Auckland City corporis alias Hospital. He has 5 years of experience and a rating of 4.69. His fee is 141.0. (Doctor ID: 132)- Romil Baral, a doctor specializing in Hepatology and Gastrointestinal Surgery, is available at Auckland City blanditiis modi Hospital. He has 4 years of experience and a rating of 4.61. His fee is 244.0. (Doctor ID: 3)- Manikya Dayal, a doctor specializing in Cosmetic Dermatology and Medical Dermatology, is available at Auckland City nisi expedita Hospital. He has 10 years of experience and a rating of 4.46. His fee is 166.0. (Doctor ID: 78)- Aniruddh Bail, a doctor specializing in Neonatology and Pediatric Oncology, is available at Auckland City magni occaecati Hospital. He has 8 years of experience and a rating of 4.43. His fee is 222.0. (Doctor ID: 25)"
        },
        {
            id: 3,
            date: '06/02/2024 16:15:11',
            query: 'Show me clinics with available doctor appointments on weekends',
            response: "Damini Kothari, a doctor specializing in Medical Oncology and Radiation Oncology, is available at Auckland City officiis nam Hospital. She has 27 years of experience and a rating of 1.76. Her fee is 170.0. (Doctor ID: 15)- Aniruddh Bail, a doctor specializing in Neonatology and Pediatric Oncology, is available at Auckland City magni occaecati Hospital. He has 8 years of experience and a rating of 4.43. His fee is 222.0. (Doctor ID: 25)- Kavya Tiwari, a doctor specializing in Pediatric Neurology and Neuro-oncology, is available at Auckland City blanditiis modi Hospital. She has 2 years of experience and a rating of 2.02. Her fee is 166.0. (Doctor ID: 34)- Vedika Soman, a doctor specializing in Medical Oncology and Radiation Oncology, is available at Auckland City sunt officia Hospital. She has 26 years of experience and a rating of 2.73. Her fee is 72.0. (Doctor ID: 41)- Aaina Sibal, a doctor specializing in Neonatology and Pediatric Oncology, is available at Auckland City quis sunt Hospital. She has 14 years of experience and a rating of 1.63. Her fee is 272.0. (Doctor ID: 42)"
        },
    ];

    const handleViewClick = (row: Row) => {
        setSelectedRow(row);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    return (
        <div style={{ height: 400, backgroundColor: 'white', marginTop: '3rem' }}>
            <DataGrid
                columns={[
                    ...columns,
                    {
                        field: 'actions',
                        headerName: 'Actions',
                        renderCell: (params) => <ActionsCell {...params} onClick={handleViewClick} />,
                    },
                ]}
                rows={originalRows}
                pageSizeOptions={[5, 10]}
                disableColumnSelector
                disableColumnMenu
            />

            <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
                <DialogTitle>Details View</DialogTitle>
                <DialogContent>
                    {selectedRow && (
                        <div>
                            <p>ID: {selectedRow.id}</p>
                            <p>Date: {selectedRow.time}</p>
                            <p>Query: {selectedRow.text}</p>
                            <p>Response: {selectedRow.response}</p>
                        </div>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};