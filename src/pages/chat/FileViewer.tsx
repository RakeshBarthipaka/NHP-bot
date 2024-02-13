import styles from "./FileViewer.module.css";
import React, { useState, useEffect, useRef } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CloseIcon from '@mui/icons-material/Close';
import { Typography, IconButton, Stack } from '@mui/material';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

interface Props {
    fileURL: string;
    onFileViewURLClicked: (value: string) => void;
}

const FileViewer: React.FC<Props> = ({ fileURL, onFileViewURLClicked }: Props) => {
    const pdfUrl = fileURL;
    const [numPages, setNumPages] = useState<number | null>(null);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [scale, setScale] = useState<number>(1.0);
    const [containerWidth, setContainerWidth] = useState<number>(250);
    const [zoomPercentage, setZoomPercentage] = useState<number>(100);
    const pdfContainerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const updateDimensions = () => {
            const width = pdfContainerRef.current?.clientWidth || 250;
            setContainerWidth(width);
        };

        window.addEventListener('resize', updateDimensions);
        updateDimensions();

        return () => {
            window.removeEventListener('resize', updateDimensions);
        };
    }, []);

    useEffect(() => {
        setZoomPercentage(Math.round(scale * 100));
    }, [scale]);

    function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
        setNumPages(numPages);
    }

    function handleScroll(event: React.UIEvent<HTMLDivElement>) {
        const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;
        const totalHeight = scrollHeight - clientHeight;
        const scrolledPercentage = (scrollTop / totalHeight) * 100;
        const page = Math.ceil((scrolledPercentage * (numPages || 1)) / 100);
        setPageNumber(page || 1);
    }

    function handlePageVisibilityChange() {
        const pdfContainer = pdfContainerRef.current;
        const currentPage = pdfContainer?.querySelector(`div[data-page-number="${pageNumber}"]`);
        const nextPage = pdfContainer?.querySelector(`div[data-page-number="${pageNumber + 1}"]`);
    
        if (nextPage && currentPage?.getBoundingClientRect().bottom! <= pdfContainer?.getBoundingClientRect().bottom!) {
            setPageNumber(prevPageNumber => (prevPageNumber !== null ? prevPageNumber + 1 : 1));
        }
    }
    
    function handleZoomIn() {
        const maxZoom = 2.6; // Maximum zoom percentage (250%)
        setScale(prevScale => {
            const newScale = Math.min(prevScale + 0.2, maxZoom);
            setZoomPercentage(Math.round(newScale * 100));
            return newScale;
        });
    }

    function handleZoomOut() {
        const minZoom = 0.2; // Minimum zoom percentage (20%)
        setScale(prevScale => {
            const newScale = Math.max(prevScale - 0.2, minZoom);
            setZoomPercentage(Math.round(newScale * 100));
            return newScale;
        });
    }

    function calculatePageWidth() {
        // Default width of each page
        const defaultPageWidth = 220; // You can adjust this value as needed
        // Calculate the width for the PDF pages based on the container width and scale
        const pageWidth = containerWidth * (scale || 1);
        // If the calculated width is less than the default width, use the default width
        return Math.max(pageWidth, defaultPageWidth);
    }


    return (
        <div className={styles.fileViewContainer}>
            <div className={styles.fileViewRead}>
                <div className={styles.CloseFileView}>
                    <CloseIcon onClick={() => onFileViewURLClicked("")} />
                </div>
                <div style={{ maxWidth: '250px' }}>
                    <Stack direction="row" justifyContent="center" alignItems="center">
                        <IconButton onClick={handleZoomIn}>
                            <ZoomInIcon />
                        </IconButton>
                        <Typography fontSize={14}>
                            {zoomPercentage}%
                        </Typography>
                        <IconButton onClick={handleZoomOut}>
                            <ZoomOutIcon />
                        </IconButton>

                        <Typography fontSize={14}>
                            {pageNumber} / {numPages}
                        </Typography>

                    </Stack>
                    <div
                        id="pdf-container"
                        ref={pdfContainerRef}
                        className={styles.customScrollbar}
                        style={{ width: '100%', maxWidth: '100%', height: '550px', overflow: 'auto', paddingRight: '10px' }}
                        onScroll={handleScroll}
                        onWheel={handlePageVisibilityChange}
                    >
                        <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
                            {Array.from(new Array(numPages || 0), (_, index) => (
                                <Page
                                    key={`page_${index + 1}`}
                                    pageNumber={index + 1}
                                    width={calculatePageWidth()} // Adjust the width dynamically
                                    scale={scale}
                                    className={styles.pdfPage}
                                    data-page-number={index + 1}
                                    customTextRenderer={() => null || ""}
                                />
                            ))}
                        </Document>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FileViewer;
