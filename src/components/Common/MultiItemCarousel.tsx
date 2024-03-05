import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./multiItemCarousel.module.css";
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import { useSelector } from "react-redux";

interface Props { 
    KpiSlides:any;
    toggleChatRightContent: () => void; 
    toggleKpiAnalysis: () => void;
}

const MultiItemCarousel = ({KpiSlides, toggleChatRightContent, toggleKpiAnalysis}:Props) => {
    const Slides: any[] = KpiSlides
    const { colorCode } = useSelector((state: any) => state.theme.color)
    const [isRightPanelOpen, setIsRightPanelOpen] = useState(false);

    function SlickNextArrow(props: any) {
        const { className, style, onClick } = props;
        return (
            <div className={className} onClick={onClick} style={{ top: '25%' }}>
                <ArrowForwardIosOutlinedIcon style={{ ...style, color: "#F1F1F1", fontSize: "36px", marginLeft: "-15px" }} />
            </div>
        );
    }

    function SlickPrevArrow(props: any) {
        const { className, style, onClick } = props;
        return (
            <div className={className} onClick={onClick} style={{ top: '25%' }}>
                <ArrowBackIosOutlinedIcon style={{ ...style, color: "#F1F1F1", fontSize: "36px", marginLeft: "-5px" }} />
            </div>
        );
    }

    const settings = {
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        
        responsive: [
            {
                breakpoint: 1400,
                settings: {
                  slidesToShow: 3 
                }
              },
            {
                breakpoint: 1168,
                settings: {
                  slidesToShow: 2 
                }
              },
              {
                breakpoint: 900,
                settings: {
                  slidesToShow: 4
                }
              },
              {
                breakpoint: 700,
                settings: {
                  slidesToShow: 3
                }
              },
              {
                breakpoint: 520,
                settings: {
                  slidesToShow: 2
                }
              },
        ],
        nextArrow: <SlickNextArrow />,
        prevArrow: <SlickPrevArrow />
    };


    useEffect(() => {
        const styleSheet = document.styleSheets[0];
        if (styleSheet) {
            styleSheet.insertRule(
                `
                .slick-prev svg,
                .slick-next svg  {
                    color: #E5E5EA !important; /* Dark blue arrow color */
                }
                
            `,
                styleSheet.cssRules.length
            );
        }
    }, []);

    const toggleisRightPanelOpen = () => {
        setIsRightPanelOpen(current => !current);
        console.log(isRightPanelOpen);
    };


    return (
        <>
           
                <Slider  {...settings} className={styles.slider}>
                    {Slides.map((card, index) => (
                        <div data-index={index} key={index} className={styles.kpiCard}   
                        onClick={() => {
                            toggleisRightPanelOpen();
                            toggleKpiAnalysis();
                        }}
                        >
                            <h5>{card.kpiname}</h5>
                            <h4>{card.kpivalue}</h4>
                            <div className={styles.previousInfo}>
                                <p>{card.comparisonvalue}</p>
                                <p className={card.growth ? styles.positive : styles.negative}>{card.change}</p>
                            </div>
                            <p>({card.timeduration})</p>
                        </div>
                    ))}
                </Slider>
            
        </>
    );
};

export default MultiItemCarousel;
