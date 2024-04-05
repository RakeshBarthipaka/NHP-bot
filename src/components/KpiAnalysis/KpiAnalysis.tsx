import { useEffect, useState } from "react";
import { Avatar, Box, Button, ButtonGroup, FormControl, InputLabel, MenuItem, Select, Stack } from "@mui/material";
import "./KpiAnalysis.scss";
import { getApi, postApi } from "../../api";
import TroubleshootOutlinedIcon from '@mui/icons-material/TroubleshootOutlined';

import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import StackedBarChart from "../BarChart/BarChart";
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { GridColDef, DataGrid, GridCellParams, GridRenderCellParams } from "@mui/x-data-grid";
import clsx from "clsx";

import React from 'react';
import { Line } from 'react-chartjs-2';
import { Any } from "@react-spring/web";

const getColor = (value: any) => {

  if (Number(value.replace("%", "")) > 20) {
    return " rgba(50, 215, 75, 1)";

  }
  if (Number(value.replace("%", "")) > 0 && Number(value.replace("%", "")) < 20) {
    return "inherit";
  }

  if (Number(value.replace("%", "")) < 0) {
    return "rgba(255, 69, 58, 1)";
  }

};

const FilterComponent = ({ data, label, value, handleChange }:any) => {
  return (
    <FormControl fullWidth>
      {/* <InputLabel>{label}</InputLabel> */}
      <Select
        value={value}
        className="kpiSelectFilter"
        onChange={handleChange}
        displayEmpty
        renderValue={(selected) => {
          if (selected.length === 0) {
            return <em>{label}</em>;
          }

          return selected;
        }}
      >
        <MenuItem disabled value="">
          <em>{label}</em>
        </MenuItem>
        {data?.map((item:any, index:any) => (
          <MenuItem key={index} value={item}>{item}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

const KpiAnalysis = (kpiName:any) => {
  const kpiAnalysisName = kpiName.kpiName; 
  const [isValue, setIsValue] = useState<boolean>(false);

  const [kpiAnalysisData, setKpiAnalysisData] = useState({});
  const [filtersData, setFiltersData] = useState({country: [], productcategory: [], bg: [], last_5_years: [], months: []});
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedProductCategory, setSelectedProductCategory] = useState('');
  const [selectedBusinessGroup, setSelectedBusinessGroup] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('');


  const handleCountryChange = (event:any) => {
    setSelectedCountry(event.target.value);
  };

  const handleProductCategoryChange = (event:any) => {
    setSelectedProductCategory(event.target.value);
  };
  const handleBusinessGroupChange = (event:any) => {
    setSelectedBusinessGroup(event.target.value);
  };
  const handleYearChange = (event:any) => {
    setSelectedYear(event.target.value);
  };
  const handlePeriodChange = (event:any) => {
    setSelectedPeriod(event.target.value);
  };

  const handleFiltersChange = () => {
  // console.log(selectedCountry, selectedProductCategory, selectedBusinessGroup, selectedYear, selectedPeriod);
  const payLoad = {
    "kpi": "uom",
    "country": selectedCountry ? [selectedCountry] : [],
    "bg": selectedBusinessGroup ? [selectedBusinessGroup] : [],
    "productcategory": selectedProductCategory ? [ selectedProductCategory ] : [],
    "year": selectedYear ? [ selectedYear ] : [],
    "period": selectedPeriod ? [ selectedPeriod ] : []
  }

  async function getKpiAnalysis () {
    const resp = await postApi(payLoad, 'kpi/kpi_analysis/');
    setKpiAnalysisData(resp);  
  }
  getKpiAnalysis();

  };
  

  const columns: GridColDef[] = [
    {
      field: "rowheader",
      headerName: "$ in Millions",
      sortable: false,
      flex: 1,
      minWidth: 150,
      disableColumnMenu: true,
      cellClassName: (params: GridCellParams<any, number>) => {
        if (params.value == null) {
          return "";
        }

        return clsx("first-column", {
          cell: true
        });
      }
    },
    {
      field: "2019",
      headerName: "2019",
      sortable: false,

      disableColumnMenu: true,
      renderCell: (params: GridRenderCellParams) => {
        const color: any = getColor(params.value);

        return (
          <Box
            sx={{
              color: color,
            }}
          >
            {params.value}
          </Box>
        );
      },
    },
    {
      field: "2020",
      headerName: "2020",
      sortable: false,

      disableColumnMenu: true,
      renderCell: (params: GridRenderCellParams) => {
        const color: any = getColor(params.value);

        return (
          <Box
            sx={{
              color: color,
            }}
          >
            {params.value}
          </Box>
        );
      },
    },
    {
      field: "2021",
      headerName: "2021",
      sortable: false,

      disableColumnMenu: true,
      renderCell: (params: GridRenderCellParams) => {
        const color: any = getColor(params.value);

        return (
          <Box
            sx={{
              color: color,
            }}
          >
            {params.value}
          </Box>
        );
      },
    },
    {
      field: "2022",
      headerName: "2022",
      sortable: false,

      disableColumnMenu: true,
      renderCell: (params: GridRenderCellParams) => {
        const color: any = getColor(params.value);

        return (
          <Box
            sx={{
              color: color,
            }}
          >
            {params.value}
          </Box>
        );
      },
    },
    {
      field: "2023",
      headerName: "2023",
      sortable: false,

      disableColumnMenu: true,
      renderCell: (params: GridRenderCellParams) => {
        const color: any = getColor(params.value);

        return (
          <Box
            sx={{
              color: color,
            }}
          >
            {params.value}
          </Box>
        );
      },
    }
  ];


  const rows = [
    { id: 1, rowheader: "Products", 2019: "$213,883", 2020: "$213,883", 2021: "$213,883", 2022: "$213,883", 2023: "$213,883" },
    { id: 2, rowheader: "Services", 2019: "46,291", 2020: "46,291", 2021: "46,291", 2022: "46,291", 2023: "46,291" },
    { id: 3, rowheader: "Total Net Sales", 2019: "$260,174", 2020: "$260,174", 2021: "$260,174", 2022: "$260,174", 2023: "$260,174" },
    { id: 4, rowheader: "Total Cost of Sales", 2019: "$161,782", 2020: "$161,782", 2021: "$161,782", 2022: "$161,782", 2023: "$161,782" },
    { id: 5, rowheader: "Total Gross Profit", 2019: "$98,392", 2020: "$104,392", 2021: "$152,392", 2022: "$152,392", 2023: "$152,392" },
    { id: 6, rowheader: "% Gross Margin", 2019: "37.8%", 2020: "38.2%", 2021: "41.8%", 2022: "44.8%", 2023: "48.12%" },

  ];

  const rowsPercentage = [
    { id: 1, rowheader: "Products", 2019: "$213,883", 2020: "$213,883", 2021: "$213,883", 2022: "$213,883", 2023: "$213,883" },
    { id: 2, rowheader: "Services", 2019: "46,291", 2020: "46,291", 2021: "46,291", 2022: "46,291", 2023: "46,291" },
    { id: 3, rowheader: "Total Net Sales", 2019: "$260,174", 2020: "$260,174", 2021: "$260,174", 2022: "$260,174", 2023: "$260,174" },
    { id: 4, rowheader: "Total Cost of Sales", 2019: "$161,782", 2020: "$161,782", 2021: "$161,782", 2022: "$161,782", 2023: "$161,782" },
    { id: 5, rowheader: "Total Gross Profit", 2019: "$98,392", 2020: "$104,392", 2021: "$152,392", 2022: "$152,392", 2023: "$152,392" },
    { id: 6, rowheader: "% Gross Margin", 2019: "37.8%", 2020: "38.2%", 2021: "41.8%", 2022: "44.8%", 2023: "48.12%" },
  ];


  function copyTableToClipboard() {
    window?.getSelection()?.removeAllRanges();
    let range = document.createRange();
    const gridContainer: any = document.querySelector('.forMakingPdf');
    range.selectNode(gridContainer);
    window?.getSelection()?.addRange(range);
    document.execCommand('copy');
    window?.getSelection()?.removeAllRanges();
  }


  const downloadAsPdf = () => {

    const gridContainer: any = document.querySelector('.forMakingPdf');

    html2canvas(gridContainer).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgWidth = 210; // A4 size
      const imgHeight = canvas.height * imgWidth / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save('datagrid.pdf');
    });
  };


  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Gross Margin Trend for the last 5 years',
      },
    },
  };

  const labels = ['2019', '2020', '2021', '2022', '2023', '2024', '2025'];

  const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: [5, 12, 9, 25, 35, 22, 40],
      },
      {
        label: 'Dataset 2',
        data: [7, 11, 10, 28, 36, 32, 45],
      },
      {
        label: 'Dataset ',
        data: [9, 11, 15, 29, 34, 39, 44],
      },
    ],
  };

  useEffect(()=>{
    async function getKpiFilters () {
      const response = await getApi('kpi/get_filter_params/');
      setFiltersData(response); 
    }
    getKpiFilters();
  }, [])

  

  return (
    <>
      <Box className="kpiAnalysis">
        <Box className="kpi-analysis-heading">
          <TroubleshootOutlinedIcon />
          <h3 className="disply-page-title">KPI Analysis</h3>
        </Box>
        <Box>
          <h4 className="">{kpiAnalysisName}</h4>

          <Box display={"flex"} gap={1} sx={{ marginBottom: '15px', marginTop: '10px'}}>
           
            <FilterComponent
              data={filtersData?.country}
              label="Country"
              value={selectedCountry}
              handleChange={handleCountryChange}
            />
 
            <FilterComponent
              data={filtersData.productcategory}
              label="Product Category"
              value={selectedProductCategory}
              handleChange={handleProductCategoryChange}
            />

            <FilterComponent
              data={filtersData.bg}
              label="Business Group"
              value={selectedBusinessGroup}
              handleChange={handleBusinessGroupChange}
            />
             <FilterComponent
              data={filtersData.last_5_years}
              label="Year"
              value={selectedYear}
              handleChange={handleYearChange}
            />
            <FilterComponent
              data={filtersData.months}
              label="Period"
              value={selectedPeriod}
              handleChange={handlePeriodChange}
            />
            <Button variant="contained" color="primary" onClick={handleFiltersChange}>Go</Button>
          </Box>

          <Stack className="stackDataOptions">
            <Box  display={"flex"} gap={1}>
            <ButtonGroup className="mui-custom-toggle" variant="outlined" aria-label="Basic button group"                   
                disableElevation
                size="small"               
              >
                <Button onClick={() => setIsValue(false)} className={isValue ? "secondButton" : "mui-toggle-active"}>%</Button>
                <Button onClick={() => setIsValue(true)} className={isValue ? "mui-toggle-active" : "secondButton"}>Value</Button>
              </ButtonGroup>
              {/* <ButtonGroup
                disableElevation
                size="small"
                variant="contained"
                aria-label="Disabled button group"
                className="disabledButtonStyle"
                disabled
              >
                <Button>USD</Button>
                <Button variant="outlined">Local</Button>
              </ButtonGroup> */}
            </Box>
            <Box display={"flex"} >
              <span onClick={copyTableToClipboard}>
                <Avatar className="iconsBtns">
                  <ContentCopyOutlinedIcon />
                </Avatar>
              </span>

              <span onClick={downloadAsPdf}>
                <Avatar  className="iconsBtns"> 
                  <FileDownloadOutlinedIcon />
                </Avatar>
              </span>
            </Box> 
          </Stack>
          <Stack>
            <DataGrid
              hideFooter 
              rows={isValue ? rows : rowsPercentage}
              columns={columns}
              disableRowSelectionOnClick
              disableColumnFilter
              hideFooterSelectedRowCount
              hideFooterPagination

            />
          </Stack>
          {/* <Stack className="kpiAnalysisText">
            <h4>Summary of Gross Margin</h4>
            <ul>
              <li>
                India has shown fluctuation with significant declines in 2020 and subsequent improvement in the following years.
              </li>
              <li>Mexico has shown a consistant increase in UOM over the years. </li>
              <li>China’s UOM has shown some variability, with an overall decrease in 2022. </li>
              <li>Thailand has shown some generally increasing trend in UOM with slight decline in 2022.</li>

            </ul>
          </Stack> */}
        </Box>

        {/* <Box className="chartsBox">
          <Line options={options} data={data} />
        </Box> */}
      </Box>
    </>
  );
};

export default KpiAnalysis;