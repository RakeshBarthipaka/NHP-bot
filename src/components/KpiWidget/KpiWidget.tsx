import React, { useEffect, useState } from "react";

import styles from "./KpiWidget.module.css";

import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import { Box, Button, Drawer, TextField, Toolbar, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridToolbarColumnsButton, GridToolbarContainer, GridValueGetterParams } from '@mui/x-data-grid'; 
import { useSelector } from "react-redux";
import MultiItemCarousel from "../Common/MultiItemCarousel";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined'; 
import SearchBar from "../Common/SearchBar";

interface Props { 
    toggleChatRightContent: () => void; 
    toggleKpiAnalysis: () => void;
}

const KpiWidget = ({toggleChatRightContent, toggleKpiAnalysis}: Props) => {

    const result = [
        {
            id: 1,
            kpiname: "Gross Margin",
            kpivalue: "15k",
            comparisonvalue: "12k",
            change: "0.19%",
            growth: true,
            timeduration: "Last month to this month"
        },
        {
            id: 2,
            kpiname: "Sales Growth",
            kpivalue: "€ 6234",
            comparisonvalue: "12k",
            change: "0.19%",
            growth: true,
            timeduration: "Last month to this month"
        },
        {
            id: 3,
            kpiname: "Net Sales",
            kpivalue: "125452 units",
            comparisonvalue: "12k",
            change: "0.19%",
            growth: false,
            timeduration: "Last month to this month"
        },
        {
            id: 4,
            kpiname: "Revenue",
            kpivalue: "€ 8234",
            comparisonvalue: "12k",
            change: "0.19%",
            growth: true,
            timeduration: "Last month to this month"
        },
        {
            id: 5,
            kpiname: "Profit Margin",
            kpivalue: "15k",
            comparisonvalue: "12k",
            change: "0.19%",
            growth: false,
            timeduration: "Last month to this month"
        },
        {
            id: 6,
            kpiname: "Cash Inflow",
            kpivalue: "€ 5234",
            comparisonvalue: "12k",
            change: "0.19%",
            growth: true,
            timeduration: "Last month to this month"
        }
    ];

       
    const columns: GridColDef[] = [
        {
            field: 'kpiname',
            headerName: 'KPI',
            flex: 1,
            minWidth: 150,
            sortable: false,
            disableColumnMenu: true
        },
        {
            field: 'kpivalue',
            headerName: 'Value', 
            sortable: false,
            disableColumnMenu: true
        },
    ];


    const rows = [
        { id: 1, kpiname: 'Gross Margin', kpivalue: '15 k' },
        { id: 2, kpiname: 'Sales Growth ', kpivalue: '6234' },
        { id: 3, kpiname: 'Net Sales', kpivalue: '8234' },
        { id: 4, kpiname: 'Revenue', kpivalue: '5234' },
        { id: 5, kpiname: 'Profit Margin', kpivalue: '15 k' },
        { id: 6, kpiname: 'Revenue ', kpivalue: '6234' },
        { id: 7, kpiname: 'Working Capital', kpivalue: '8234' },
        { id: 8, kpiname: 'Cash Inflow', kpivalue: '5234' },
        { id: 9, kpiname: 'Interest earned', kpivalue: '15 k' },
        { id: 10, kpiname: 'Annual Return', kpivalue: '6234' },
        { id: 11, kpiname: 'Operating Profit Margin', kpivalue: '8234' },
        { id: 12, kpiname: 'Turnover', kpivalue: '5234' },
        { id: 13, kpiname: 'Budget Variance', kpivalue: '15 k' },
        { id: 14, kpiname: 'Current Ratio', kpivalue: '6234' },
        { id: 15, kpiname: 'Quick Ratio', kpivalue: '8234' },
    ];

    const initialKpis = [1, 2, 3, 4]
    const [openKpiModal, setOpenKpiModal] = useState(false);
    const [selectedKpis, setSelectedKpis] = useState<any[]>(initialKpis);

    const initialSlides = getKpiSlides(initialKpis, result);
    const [kpiSlides, setKpiSlides] = useState<any[]>(initialSlides);
    const { colorCode } = useSelector((state: any) => state.theme.color)
    const [searchText, setSearchText] = useState("");
    const [tableData, setTableData] = useState<any[]>(rows);
 
    const CustomToolbar = (props: JSX.IntrinsicAttributes) => (
        <div> 
          <SearchBar {...props} /> 
        </div>
      );
   



    function getKpiSlides(ids: any[], result: any[]) {
        return result.filter((e) => {
            return ids.some((e2) => {
                if (e.id === e2) {
                    // console.log(e);
                    return e;
                }
            });
        });
    }

    const onRowsSelectionHandler = (ids: any[]) => {
        // const selectedRowsData = ids.map((id) => rows.find((row) => row.id === id)); 
        setSelectedKpis(ids);
        // console.log(ids);
        setKpiSlides(getKpiSlides(ids, result));
        // setOpenKpiModal(false)
    };

    const requestSearch = (searchValue: string) => {
        const searchRegex = new RegExp(`.*${searchValue}.*`, "ig");
        const filteredRows = result.filter((o: any) => {
          return Object.keys(o).some((k: any) => {
            return searchRegex.test(o[k].toString());
          });
        });
        setTableData(filteredRows);
      };
    
      const cancelSearch = () => {
        setSearchText("");
        requestSearch(searchText);
      };

    return (
        <>
            <div className={styles.carouselContainer}>
                {(kpiSlides.length > 0) ?
                    <>
                        <MultiItemCarousel KpiSlides={kpiSlides}  toggleChatRightContent={toggleChatRightContent} toggleKpiAnalysis={toggleKpiAnalysis}/>
                        <AddCircleOutlineOutlinedIcon className={styles.addKpiBtn} onClick={() => setOpenKpiModal(true)} />
                    </>
                    :
                    <div  className={styles.emptykpiCard}>
                        <AddCircleOutlineOutlinedIcon className={styles.addKpiBtn} onClick={() => setOpenKpiModal(true)} />
                    </div>
                }
            </div>

            <Drawer
                anchor='right'
                className={styles.drawerContentDiv}
                open={openKpiModal}
                onClose={() => setOpenKpiModal(false)} 
                PaperProps={{
                    sx: { width: "500px", maxWidth: '90%' },
                }}
            >

                <div>
                    <Toolbar sx={{ background: colorCode, color: '#fff' }}>
                        <GridViewOutlinedIcon sx={{ marginRight: '10px' }} />
                        <Typography variant="h6" sx={{ fontSize: '18px' }} noWrap component="div">
                            KPIs
                        </Typography>
                    </Toolbar>

                    <div className={styles.drawerContent}>
                        <DataGrid
                            sx={{
                                border: 'none', 
                               
                                '& .MuiDataGrid-main': {
                                     background: '#F2F2F7',
                                     marginTop: '15px',
                                  },
                                '& .MuiDataGrid-virtualScroller': {
                                    maxHeight: '440px',
                                  },
                            }}
                            slots={{ toolbar: CustomToolbar }}
                            slotProps={{
                                toolbar: {
                                  value: searchText,
                                  onChange: (searchVal: any) => requestSearch(searchVal),
                                  onCancelSearch: () => cancelSearch()
                                }
                              }}
                            rows={tableData}
                            columns={columns}
                            checkboxSelection
                            rowSelectionModel={selectedKpis}  
                            disableRowSelectionOnClick 
                            disableColumnFilter
                            hideFooterSelectedRowCount
                            hideFooterPagination
                            hideFooter
                            onRowSelectionModelChange={(ids) => onRowsSelectionHandler(ids)} 
                             
                        />

                        <Box sx={{display: 'flex', justifyContent: 'flex-end', }}>
                            <Button variant="contained" sx={{marginTop: '10px', marginRight: '5px', borderRadius: '25px', background: 'var(--active-themes)'}}>CANCEL</Button>
                            <Button variant="contained" sx={{marginTop: '10px', marginRight: '5px', borderRadius: '25px', background: 'var(--active-themes)'}}>SAVE</Button> 
                        </Box>
                    </div>

                   
                </div>
            </Drawer>
        </>
    );
};

export default KpiWidget;
