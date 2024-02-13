import styles from "./GenerateTables.module.css";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

interface Props {

}

function createData(
    company: string,
    fiscalyear: number,  
    revenue: string,  
    netincome: string,
    operatingcashflow: string,
    ebitda: number,
    totaldebt: string,   
    cash: string,
    stockholdersequity: number, 
    capex: number
) {
    return {
        company,
        fiscalyear,
        revenue,
        netincome,
        operatingcashflow,
        ebitda,
        totaldebt,
        cash,
        stockholdersequity,
        capex
    };
}

const rows = [
    createData('Microsoft', 2024, '$227.58B', '36.27%', '$13.75', 25.96, '$30.38B', '$80.98B', 4.0, 10), 
];


export const GenerateTable = () => {


    return (
        <div className={styles.generateTableDiv}>

            <TableContainer   sx={{ width: '100%' }}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ background: '#eee', fontSize: '12px', lineHeight: 1.5, whiteSpace: 'nowrap' }}  >Company</TableCell>
                            <TableCell sx={{  background: '#eee', fontSize: '12px', lineHeight: 1.5, whiteSpace: 'nowrap' }}  align="center">Fiscal Year</TableCell>
                            <TableCell sx={{  background: '#eee', fontSize: '12px', lineHeight: 1.5, whiteSpace: 'nowrap' }}  align="center">Revenue</TableCell>
                            <TableCell sx={{  background: '#eee', fontSize: '12px', lineHeight: 1.5, whiteSpace: 'nowrap' }}  align="center">Net Income</TableCell>
                            <TableCell sx={{  background: '#eee', fontSize: '12px', lineHeight: 1.5, whiteSpace: 'nowrap' }}  align="center">Operating Cash Flow</TableCell>
                            <TableCell sx={{  background: '#eee', fontSize: '12px', lineHeight: 1.5, whiteSpace: 'nowrap' }}  align="center">EBITDA</TableCell>
                            <TableCell sx={{  background: '#eee', fontSize: '12px', lineHeight: 1.5, whiteSpace: 'nowrap' }}  align="center">Total Debt</TableCell>
                            <TableCell sx={{  background: '#eee', fontSize: '12px', lineHeight: 1.5, whiteSpace: 'nowrap' }}  align="center">Cash</TableCell>
                            <TableCell sx={{  background: '#eee', fontSize: '12px', lineHeight: 1.5, whiteSpace: 'nowrap' }}  align="center">Stockholders Equity</TableCell>
                            <TableCell sx={{  background: '#eee', fontSize: '12px', lineHeight: 1.5, whiteSpace: 'nowrap' }}  align="center">CAPEX</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.company}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.company}
                                </TableCell>
                                <TableCell  align="center">{row.fiscalyear}</TableCell>
                                <TableCell  align="center">{row.revenue}</TableCell>
                                <TableCell  align="center">{row.netincome}</TableCell>
                                <TableCell  align="center">{row.operatingcashflow}</TableCell>
                                <TableCell  align="center">{row.ebitda}</TableCell>
                                <TableCell  align="center">{row.totaldebt}</TableCell>
                                <TableCell  align="center">{row.cash}</TableCell>
                                <TableCell  align="center">{row.stockholdersequity}</TableCell>
                                <TableCell  align="center">{row.capex}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            
        </div>

    );
};
