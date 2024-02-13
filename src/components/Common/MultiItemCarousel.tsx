import React, { useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./multiItemCarousel.module.css";


const MultiItemCarousel = () => {
    const result = [
        {
            kpiname: "ALL BU",
            kpidata: [
                {
                    name: "Turnover",
                    value: "xx.xx"
                },
                {
                    name: "Gross Margin",
                    value: "xx.xx%"
                },
                {
                    name: "UOM",
                    value: "xx.xx%"
                }
            ]
        },
        {
            kpiname: "ALL BG",
            kpidata: [
                {
                    name: "Turnover",
                    value: "xx.xx"
                },
                {
                    name: "Gross Margin",
                    value: "xx.xx%"
                },
                {
                    name: "UOM",
                    value: "xx.xx%"
                }
            ]
        },
        {
            kpiname: "Performance CY VS PY",
            kpidata: [
                {
                    name: "Turnover",
                    value: "xx.xx"
                },
                {
                    name: "Gross Margin",
                    value: "xx.xx%"
                },
                {
                    name: "UOM",
                    value: "xx.xx%"
                }
            ]
        }
    ];

    const settings = {
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1150,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 900,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    useEffect(() => {
        const styleSheet = document.styleSheets[0];
        if (styleSheet) {
            styleSheet.insertRule(
                `
                .slick-prev:before,
                .slick-next:before  {
                    color: #0c447f !important; /* Dark blue arrow color */
                }
            `,
                styleSheet.cssRules.length
            );
        }
    }, []);

    return (
        <div className={styles.carouselContainer}>
            <Slider  {...settings} className={styles.slider}>
                {result.map((card, index) => (
                    <div key={index} className={styles.card}>
                        <p className={styles.cardTitle}>{card.kpiname}</p>
                        <div className={styles.cardInfo}>
                            {
                                card.kpidata.map((kpi, i) => (
                                    <ul className={styles.cardDetails}>
                                        <li className={styles.cardText}>{kpi.name}</li>
                                        <p className={styles.cardText}>{kpi.value}</p>
                                    </ul>
                                ))
                            }
                        </div>

                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default MultiItemCarousel;
