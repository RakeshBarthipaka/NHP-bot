import { useEffect, useMemo, useState } from "react";

import "./KpiWidget.scss";
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import { Box, Button, Drawer, Toolbar, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import MultiItemCarousel from "../Common/MultiItemCarousel";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
  type MRT_Row,
  MRT_GlobalFilterTextField,
  MRT_TableContainer,
  MRT_RowSelectionState,
  MRT_Icons,
} from 'material-react-table';
import { getApi } from "../../api";

interface Props {
  toggleChatRightContent: () => void;
  toggleKpiAnalysis: () => void;
}

type KpiRow = {
  id: number;
  sort_order: number;
  status: boolean;
  title: string;
  value : string;
  kpi: string;
};

// const initData = [
//   { id: 1, kpiname: 'Gross Margin', kpivalue: '15 k', select: true },
//   { id: 2, kpiname: 'Sales Growth ', kpivalue: '6234', select: true },
//   { id: 3, kpiname: 'Net Sales', kpivalue: '8234', select: true },
//   { id: 4, kpiname: 'Revenue', kpivalue: '5234', select: true },
//   { id: 5, kpiname: 'Profit Margin', kpivalue: '15 k', select: true },
//   { id: 6, kpiname: 'Revenue ', kpivalue: '6234', select: true },
//   { id: 7, kpiname: 'Working Capital', kpivalue: '8234', select: true },
//   { id: 8, kpiname: 'Cash Inflow', kpivalue: '5234', select: true },
//   { id: 9, kpiname: 'Interest earned', kpivalue: '15 k', select: true },
//   { id: 10, kpiname: 'Annual Return', kpivalue: '6234' },
//   { id: 11, kpiname: 'Operating Profit Margin', kpivalue: '8234', select: true },
//   { id: 12, kpiname: 'Turnover', kpivalue: '5234', select: true },
//   { id: 13, kpiname: 'Budget Variance', kpivalue: '15 k', select: true },
//   { id: 14, kpiname: 'Current Ratio', kpivalue: '6234', select: true },
//   { id: 15, kpiname: 'Quick Ratio', kpivalue: '8234', select: true },
// ];

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
  },
  {
    id: 7,
    kpiname: "Gross Margin",
    kpivalue: "15k",
    comparisonvalue: "12k",
    change: "0.19%",
    growth: true,
    timeduration: "Last month to this month"
  },
  {
    id: 8,
    kpiname: "Sales Growth",
    kpivalue: "€ 6234",
    comparisonvalue: "12k",
    change: "0.19%",
    growth: true,
    timeduration: "Last month to this month"
  },
  {
    id: 9,
    kpiname: "Net Sales",
    kpivalue: "125452 units",
    comparisonvalue: "12k",
    change: "0.19%",
    growth: false,
    timeduration: "Last month to this month"
  },
  {
    id: 10,
    kpiname: "Revenue",
    kpivalue: "€ 8234",
    comparisonvalue: "12k",
    change: "0.19%",
    growth: true,
    timeduration: "Last month to this month"
  },
  {
    id: 11,
    kpiname: "Profit Margin",
    kpivalue: "15k",
    comparisonvalue: "12k",
    change: "0.19%",
    growth: false,
    timeduration: "Last month to this month"
  },
  {
    id: 12,
    kpiname: "Cash Inflow",
    kpivalue: "€ 5234",
    comparisonvalue: "12k",
    change: "0.19%",
    growth: true,
    timeduration: "Last month to this month"
  }
];


const KpiWidget = ({ toggleChatRightContent, toggleKpiAnalysis }: Props) => {

  const columns = useMemo(
    () => [
      {
        accessorKey: 'title',
        header: 'kpi',
        grow: false,
        size: 150,
      },
      {
        accessorKey: 'value',
        header: 'Value',
        grow: false,
        size: 150,
      },
    ],
    [],
  );

  const initialKpis = [ 2, 3, 4, 5]
  const [data, setData] = useState([]);
  const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({}); 
  const [disableSelection, setDisableSelection] = useState(false);
  const [openKpiModal, setOpenKpiModal] = useState(false);
  // const [selectedKpis, setSelectedKpis] = useState<any[]>(initialKpis);

  const initialSlides = getKpiSlides(initialKpis, result);
  const [kpiSlides, setKpiSlides] = useState<any[]>(initialSlides);
  const { colorCode } = useSelector((state: any) => state.theme.color)
  


  const customTableIcons: Partial<MRT_Icons> = {
    DragHandleIcon: () => <DragIndicatorIcon />,
  };

  useEffect(() => {
    setRowSelection({
      2: true,
      3: true,
      4: true,
      5: true,
      6: true
    });
  }, []);

  useEffect(() => {
    if(table.getSelectedRowModel().rows.length <= 4) {
      setDisableSelection(true);
    } else {
      setDisableSelection(false);
    } 
 
  }, [rowSelection]);

  // useEffect(()=>{
  //   async function getKpiList () {
  //     const response = await getApi('kpi/get_kpi_list/');
  //     setData(response);
  //   }
  //   getKpiList();
  // }, [])

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch KPI list
        const kpiListResponse = await getApi('kpi/get_kpi_list/');
        const kpiList = kpiListResponse;
  
        // Fetch KPI values
        const kpiValuesResponse = await getApi('kpi/get_kpi/');
        const kpiValues = kpiValuesResponse;
  
        // Combine KPI values with KPI list
        const updatedKpiArray = kpiList.map((kpiObject:any) => {
          const kpiKey = kpiObject.kpi;
          if (kpiValues.hasOwnProperty(kpiKey)) {
            kpiObject.value = kpiValues[kpiKey];
          }
          return kpiObject;
        });
  
        setData(updatedKpiArray);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  
    fetchData();
  }, []);


  const table = useMaterialReactTable({
    autoResetPageIndex: false,
    columns,
    data,
    enableSorting: false,
    enableHiding: false,
    globalFilterFn: 'contains',
    icons: customTableIcons,

    muiSearchTextFieldProps: {
      placeholder: 'Search by KPI Name',
      sx: { minWidth: '100%' },
      variant: 'outlined',
    },

    enableRowSelection: true,
    enableSelectAll: false,
    getRowId: (row: any) => row?.id,
    onRowSelectionChange: setRowSelection,
    state: { rowSelection, showGlobalFilter: true },

    enableRowOrdering: true,
    muiRowDragHandleProps: ({ table }) => ({
      onDragEnd: () => {
        const { draggingRow, hoveredRow } = table.getState();
        if (hoveredRow && draggingRow) {
          data.splice(
            (hoveredRow as unknown as MRT_Row<KpiRow>).index,
            0,
            data.splice(draggingRow.index, 1)[0],
          );
          data?.forEach((row: any , index)=> {
            row.sort_order = index + 1
          })
          setData([...data]); 
        }
      },
    }),

  });

  function getKpiSlides(ids: any[], result: any[]) {
    return result.filter((e) => {
      return ids.some((e2) => {
        if (e.id === e2) {
          return e;
        }
      });
    });
  }

  const saveSelectedKpis = () => {
    const selectedRowsData = table.getSelectedRowModel().rows.map((row: any) => row.original.id)
    setKpiSlides(getKpiSlides(selectedRowsData, result));
    setOpenKpiModal(false)
  }

  return (
    <>
      <div className="carouselContainer">
        {(kpiSlides.length > 0) ?
          <>
            <MultiItemCarousel KpiSlides={kpiSlides} toggleChatRightContent={toggleChatRightContent} toggleKpiAnalysis={toggleKpiAnalysis} />
            <AddCircleOutlineOutlinedIcon className="addKpiBtn" onClick={() => setOpenKpiModal(true)} />
          </>
          :
          <div className="emptykpiCard">
            <AddCircleOutlineOutlinedIcon className="addKpiBtn" onClick={() => setOpenKpiModal(true)} />
          </div>
        }
      </div>

      <Drawer
        anchor='right'
        open={openKpiModal}
        onClose={() => setOpenKpiModal(false)}  >

        <div>
          <Toolbar className="drawerHeader">
            <GridViewOutlinedIcon />
            <Typography variant="h6" noWrap component="div"> KPIs </Typography>
          </Toolbar>

          <div className="KpisDrawer">
            <MRT_GlobalFilterTextField table={table} />
            <MRT_TableContainer table={table} className={`${disableSelection ? 'disableSelection' : ' '} kpisTable`} />

            <Box className="drawerBtns">
              <Button variant="contained" onClick={() => setOpenKpiModal(false)} >CANCEL</Button>
              <Button variant="contained" onClick={saveSelectedKpis} >SAVE</Button>
            </Box>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default KpiWidget;
