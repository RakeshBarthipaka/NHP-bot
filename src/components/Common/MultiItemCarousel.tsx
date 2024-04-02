import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./multiItemCarousel.scss";
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import { useSelector } from "react-redux";

interface Props {
    KpiSlides: any;
    toggleChatRightContent: () => void;
    toggleKpiAnalysis: () => void;
    setKpiName: any;
}

const MultiItemCarousel = ({ KpiSlides, toggleChatRightContent, toggleKpiAnalysis, setKpiName }: Props) => {
    // const Slides: any[] = KpiSlides
    const [slides, setSlides] = useState<any[]>(KpiSlides);
    let sliderRef = React.useRef<Slider>(null);
    const { colorCode } = useSelector((state: any) => state.theme.color)
    const [isRightPanelOpen, setIsRightPanelOpen] = useState(false);

    function SlickNextArrow(props: any) {
        const { className, style, onClick } = props;
        return (
            <div className={className} onClick={onClick} >
                <ArrowForwardIosOutlinedIcon style={{ ...style }} />
            </div>
        );
    }

    function SlickPrevArrow(props: any) {
        const { className, style, onClick } = props;
        return (
            <div className={className} onClick={onClick}>
                <ArrowBackIosOutlinedIcon style={{ ...style }} />
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

    const goToSlideOne = () => {
        const sliderElement = sliderRef.current;
        if (sliderElement) {
            sliderElement.slickGoTo(0); 
        }
    }

    useEffect(() => {
        setSlides(KpiSlides);
        goToSlideOne();
    }, [KpiSlides]);


    const toggleisRightPanelOpen = () => {
        setIsRightPanelOpen(current => !current);
    };


    return (
        <>
            <Slider  {...settings} className="slider" ref={sliderRef}>
                {slides.map((card, index) => (
                    <div data-index={index} key={index} className="kpiCard"
                        onClick={() => {
                            toggleisRightPanelOpen();
                            toggleKpiAnalysis();
                            setKpiName(card.kpiname); 
                        }}
                    >
                        <h5>{card.kpiname}</h5>
                        <h4>{card.kpivalue}</h4>
                        <div className="previousInfo">
                            <p>{card.comparisonvalue}</p>
                            <p className={card.growth ? 'positive' : 'negative'}>{card.change}</p>
                        </div>
                        <p>({card.timeduration})</p>
                    </div>
                ))}
            </Slider>
        </>
    );
};

export default MultiItemCarousel;
