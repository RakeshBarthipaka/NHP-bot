import React from "react";
import { PDFDownloadLink, Page, Text, View, Document, StyleSheet, Font, Image, Link } from "@react-pdf/renderer";
// import { IconButton } from "@fluentui/react";
import { Avatar, Box } from "@mui/material";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import {Typography, Stack, Button, Dialog, DialogContent,IconButton } from "@mui/material";
import Html from 'react-pdf-html';
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";

// Define styles with types
const styles = StyleSheet.create({
    page: {
        flexDirection: "column",
        backgroundColor: "white",
        padding: 30
    },
    header: {
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        marginBottom: 20,
        fontSize: 10,
        gap: 15
    },
    headerLogo: {
        width: 150
    },
    link: {
        color: "blue",
        textDecoration: "underline"
    },
    section: {
        padding: 10,
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        gap: 25
    },
    textOverflow: {
        width: "100%",
        fontSize: 12,
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap"
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
        fontSize: 12
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
        alignSelf: "center"
    },
    productLink: {
        textDecoration: "none",
        fontWeight: "bold"
    }
});

// Define props type for MyDocument component
interface MyDocumentProps {
    pdfData: any;
}

const todayDate = new Date();

const MyDocument: React.FC<MyDocumentProps> = ({ pdfData }) => {
    const Header: React.FC = () => (
        <View style={styles.header}>
            <Image src="https://covalenseaccessibility.blob.core.windows.net/ai-portal/ai_portal_21b60868_test.png" style={styles.headerLogo} />
            <Text>Date: {todayDate.toLocaleString()}</Text>
        </View>
    );

    const extractTextFromHTML = (htmlContent: any) => {
        const doc = new DOMParser()?.parseFromString(htmlContent, "text/html");
        return doc.body.textContent || "";
    };

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <Header />
                {pdfData?.map((item: any, i: any) => (
                    <View style={[styles.section, styles.textOverflow]} key={i}>
                        <Text style={styles.questionText} wrap={false}>{`Q${i + 1}: ${item?.question}`}</Text>
                        <Text style={styles.answerText}>{extractTextFromHTML(item?.answer?.answer)}</Text>
                    </View>
                ))}
            </Page>
        </Document>
    );
};

// Create a function to trigger the download
const DownloadPDFThreads: React.FC<{ pdfData: MyDocumentProps[] }> = ({ pdfData }) => {
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  
    return (
      <>
        <IconButton aria-label="duplicate" color="inherit" onClick={handleClickOpen}>
      <FileDownloadOutlinedIcon color="primary" />
        </IconButton>
        <Dialog open={open} onClose={handleClose} maxWidth="md">
          <DialogContent>
            <Stack gap={3} alignItems="center">
              <Typography variant='h4'>Confirm Download</Typography>
              <Typography variant='body2' marginBottom={1}>Are you sure you want to download the PDF?</Typography>
              <Stack direction="row" gap={2}>
                <Button variant="contained" color='error' onClick={handleClose}>Cancel</Button>
                <PDFDownloadLink document={<MyDocument pdfData={open ? pdfData : []} />} fileName={`finLense_${Date.now()}.pdf`}>
                  <Button variant="contained" color='primary' onClick={handleClose}>Yes</Button>
                </PDFDownloadLink>
              </Stack>
            </Stack>
          </DialogContent>
        </Dialog>
      </>
    );
  };

export default DownloadPDFThreads;
