import { DataGrid, GridColDef } from '@mui/x-data-grid';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID' },
  { field: 'product_information', headerName: 'Product Information', flex: 1 },
  { field: 'link', headerName: 'link', flex: 1 },

];


const rows = [
  {
    id: 1, 
    product_information: "For all her dressed-up days: this sparkly, embellished headband that doubles as a tiara!Steel frame, polyamide/polyurethane backing, acrylic beads, polyethylene sequins.This item has small parts and is not intended for use by children under three years of age.Spot clean.Made in China.Item AS600.",
    link: 'https://www.jcrew.com/in/p/girls/categories/accessories/hair-accessories/headbands/girls-embellished-wire-headband/AS600?display=standard&fit=Classic&color_name=fresh-orchid&colorProductCode=AS600',
  },
  {
    id: 2, 
    product_information: "This comfy cotton sweater is all about the sweet details - from the gentle ruffles at the neck to allover bobbles, she'll love throwing it on with everything from skirts and leggings to jeans and shorts too. By buying cotton products from J.Crew, you're supporting our investment in Better Cotton's mission to help cotton communities survive and thrive while protecting and restoring the environment. This product is sourced through a system of mass balance and therefore may not contain Better Cotton. Plus, it was crafted at a Fair Trade Certifiedâ„¢ factory that provides additional income and better conditions for the people who work there.100% cotton.Machine wash.Made in China.Item BT956.",
    link: 'https://www.jcrew.com/in/p/girls/categories/accessories/hair-accessories/headbands/girls-embellished-wire-headband/AS600?display=standard&fit=Classic&color_name=fresh-orchid&colorProductCode=AS600',
  },
  {
    id: 3, 
    product_information: "The name says it all: They're the leggings she'll wear every day, and they're specially designed to withstand lots of tumbling - in the wash and on the playground. Made from cotton and elastane, they're soft, stretchy and always comfy. (Bonus: The knees won't bag out.)100% cotton.Machine wash.Made in Vietnam.Item BS330.",
    link: 'https://www.jcrew.com/in/p/girls/categories/accessories/hair-accessories/headbands/girls-embellished-wire-headband/AS600?display=standard&fit=Classic&color_name=fresh-orchid&colorProductCode=AS600',
  },

];

export default function DataSetTable() {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        sx={{
          '.MuiDataGrid-columnHeaderTitle': {
            fontWeight: 'bold !important',
            overflow: 'visible !important'
          }
        }}
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
      />
    </div>
  );
}