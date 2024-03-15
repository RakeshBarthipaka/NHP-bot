
import React from 'react';
import { PDFDownloadLink, Page, Text, View, Document, StyleSheet, Image, Link } from '@react-pdf/renderer';
import { IconButton,Typography, Stack, Button, Dialog, DialogContent } from "@mui/material";
import ArrowDown from "@mui/icons-material/ArrowDownward";
import Html from 'react-pdf-html';
 import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
 import { Avatar   } from "@mui/material";
 import style1 from "./GeneratePDF.module.css";
 import { useSelector } from "react-redux";
 
 
// Define styles with types
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: 'white',
    padding: 30,
  },
  header: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 20,
    fontSize: 10,
    gap: 5,
    backgroundColor:"#f7f7f7",
    padding:10
  },
  headerLogo: {
    width: 150
  },
  link: {
    color: 'blue',
    textDecoration: 'underline',
  },
  section: {
    padding: 10,
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
  },
  textOverflow: {
    width: '100%',
    fontSize: 10,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  },
  questionText: {
    marginBottom: 5,
    fontWeight: 700,
    width: "100%",
    backgroundColor: "#e8ebfa",
    borderRadius: "8px",
    padding: "20px",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.14), 0px 0px 2px rgba(0, 0, 0, 0.12)",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: "10px",
    outline: "transparent solid 1px"
},
answerText: {
    fontSize: 12,
   

},
productList: {
    display: "flex",
    gap: 35,
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center"
},
 
  productListItem: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column"
  },
  productImage: {
    maxWidth: 200,
    width: 200,
    marginBottom: 10,
    alignSelf: 'center',
  },
  productLink: {
    textDecoration: "none",
    fontWeight: "bold"
  },
  ".responsive-table": {
    borderCollapse: 'collapse',
    margin: 15,
    overflow: 'hidden',
    fontSize: 10,
    width: "100%",
  },
  ".responsive-table-header": {
    padding: 10,
    textAlign: 'left',
    backgroundColor: "#005c8a",
    color: "#fff",
  },
  ".responsive-table-cell": {
    padding: 10,
    textAlign: 'left',
    border: '1px solid #ded7d7',
  },
});
 
// Define props type for MyDocument component
interface MyDocumentProps {
  pdfData: any
}
 
const todayDate = new Date();
 
 
const MyDocument: React.FC<MyDocumentProps> = ({ pdfData }) => {
  const Header: React.FC = () => (
    <View style={styles.header}>
        <Image src="https://covalenseaccessibility.blob.core.windows.net/ai-portal/ai_portal_21b60868_test.png" style={styles.headerLogo} />
     
      <Text>Date: {todayDate.toLocaleString()}</Text>
    </View>
  );
 
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Header />
        {pdfData.map((item: any, i: any) => (
          <View style={[styles.section, styles.textOverflow]} key={i} >
            <Text style={styles.questionText} wrap={false}>{`Q${i + 1}: ${item.question}`}</Text>
            <Html  style={{ fontSize: 10, whiteSpace: 'pre-line',paddingRight:10, lineHeight:1.5 }} stylesheet={styles}>{item.answer.answer}</Html>
             {item.chart && (
              <View>
                <Image src={item.chart} />
              </View>
            )} 
          </View>
        ))}
      </Page>
    </Document>
  );
};
 
 
 
 
const DownloadPDF: React.FC<{ pdfData: MyDocumentProps[] }> = ({ pdfData }) => {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
 
  return (
    <>
    
<Avatar  onClick={handleClickOpen} sx={{ bgcolor: "rgba(83, 118, 240, 0.2)", color: "rgba(83, 118, 240, 1)", "&:hover": {
                                            backgroundColor: "#0027B0",
                                                color: ' rgba(30, 255, 241, 0.8)'                                           
                                        } }}>
                                    <FileDownloadOutlinedIcon   />
 </Avatar>
      <Dialog open={open} onClose={handleClose} maxWidth="xs">
        <DialogContent>
          <Stack gap={1} alignItems="center">
            <Typography variant='h6'>Confirm Download</Typography>
            <Typography variant='body2' marginBottom={1}>Are you sure you want to download the PDF?</Typography>
            <Stack direction="row" gap={2}>
             <Button variant="contained" color="primary" onClick={handleClose}>Cancel</Button>
              <PDFDownloadLink document={<MyDocument pdfData={open ? pdfData : []} />} fileName={`cglense_chat_${Date.now()}.pdf`}>
                <div className={`${style1.yes}`}>
                <Button  onClick={handleClose} sx={{color: "#fff"}}> Yes</Button>
                </div>
              </PDFDownloadLink>
            </Stack>
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
};
 
 
export default DownloadPDF;
