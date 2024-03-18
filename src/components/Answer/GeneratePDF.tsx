import React from "react";
import { PDFDownloadLink, Page, Text, View, Document, StyleSheet, Font, Image, Link } from "@react-pdf/renderer";
import { IconButton } from "@fluentui/react";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { Avatar, Box } from "@mui/material";

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
    },
   
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

    const extractProductData = (htmlContent: string) => {
        const parser = new DOMParser();
        const parsedHtml = parser.parseFromString(htmlContent, "text/html");
        const productItems = parsedHtml.querySelectorAll(".productItem");
        return Array.from(productItems).map(productItem => {
            const img = productItem.querySelector("img");
            const link = productItem.querySelector("a");
            return {
                src: img?.getAttribute("src") || "",
                url: link?.getAttribute("href") || "",
                text: link?.textContent || ""
            };
        });
    };
    const extractTextFromHTML = (htmlContent: any) => {
        const doc = new DOMParser().parseFromString(htmlContent, "text/html");
        return doc.body.textContent || "";
    };

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <Header />
                {pdfData.map((item: any, i: any) => (
                    <View style={[styles.section, styles.textOverflow]} key={i}>
                        <Text style={styles.questionText} wrap={false}>{`Q${i + 1}: ${item.question}`}</Text>
                        <Text style={styles.answerText}>{extractTextFromHTML(item.answer.answer)}</Text>
                        {item.answer.product_list &&
                            item.answer.product_list.map((productItem: any, index: any) => {
                                const products = extractProductData(productItem.product);
                                return (
                                    <View key={index} style={styles.productList}>
                                        {products.map((product, idx) => (
                                            <View key={idx} style={styles.productListItem} wrap={false}>
                                                <Image src={product.src} style={styles.productImage} />
                                                {/* 
// @ts-ignore */}
                                                <Link href={`${product.url}`} target="_blank" style={styles.productLink}>
                                                    {product.text}
                                                </Link>
                                            </View>
                                        ))}
                                    </View>
                                );
                            })}
                    </View>
                ))}
            </Page>
        </Document>
    );
};

// Create a function to trigger the download
const DownloadPDF: React.FC<{ pdfData: MyDocumentProps[] }> = ({ pdfData }) => (
    <Box sx={{
        "& a:hover": {
            backgroundColor: "var(--active-themes)",
            color: "#fff !important"
        }
    }}>
    <PDFDownloadLink
        className="pdfDownload"
        document={<MyDocument pdfData={pdfData} />}
        fileName={`cglense_chat_${Date.now()}.pdf`}
    >
        {({ loading }) =>
            loading ? (
                "Loading"
            ) : (
                <>
                    <FileDownloadOutlinedIcon />

                    {/* <IconButton title="Export" iconProps={{ iconName: 'FileDownloadOutlinedIcon' }} />
           Export PDF */}
                </>
            )
        }
    </PDFDownloadLink>
    </Box>
);

export default DownloadPDF;
