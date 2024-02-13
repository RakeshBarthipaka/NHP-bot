
import React from 'react'
import styles from "./OrderTracking.module.css";
import { useState, useEffect } from 'react';


export const OrderTracking = (props: any) => {
    let orderStatus = props.orderStatus;
    const [orderState, setState] = React.useState({
        ordered: false,
        courierPickedUp: false,
        transition: false,
        delivered: false,
    });
    const { ordered, courierPickedUp, transition, delivered } = orderState;

    useEffect(() => {
        if (orderStatus === 'ordered') {
            setState({
                ...orderState,
                ['ordered']: true,
                ['courierPickedUp']: false,
                ['transition']: false,
                ['delivered']: false,

            });
        }
        else if (orderStatus === 'courier picked-up') {
            setState({
                ...orderState,
                ['ordered']: true,
                ['courierPickedUp']: true,
                ['transition']: false,
                ['delivered']: false,

            });
        }
        else if (orderStatus === 'in-transition') {
            setState({
                ...orderState,
                ['ordered']: true,
                ['courierPickedUp']: true,
                ['transition']: true,
                ['delivered']: false,
            });
        }
        else if (orderStatus === 'delivered') {
            setState({
                ...orderState,
                ['ordered']: true,
                ['courierPickedUp']: true,
                ['transition']: true,
                ['delivered']: true,

            });
        }
    }, [orderStatus]);


    return (
        <>
            <div className="container">
                <div className="row">
                    <div className={styles.grayBox} >
                        <p className='text-center' style={{ fontWeight: "bold", marginBottom: "2rem" }}>Order Tracking</p>
                        <div className={styles.OrderTrackingBlock}>
                            <div className={`${styles.orderTracking} ${styles.isComplete} ${ordered ? styles.completed : ""} `}>
                                <span className={styles.isComplete}></span>
                                <p>Ordered</p>
                            </div>
                            <div className={`${styles.orderTracking} ${styles.isComplete} ${courierPickedUp ? styles.completed : ""}`}>
                                <span className={styles.isComplete}></span>
                                <p>Courier picked-up</p>
                            </div>
                            <div className={`${styles.orderTracking} ${styles.isComplete} ${transition ? styles.completed : ""}`}>
                                <span className={styles.isComplete}></span>
                                <p>In-Transit</p>
                            </div>
                            <div className={`${styles.orderTracking} ${styles.isComplete} ${delivered ? styles.completed : ""}`}>
                                <span className={styles.isComplete}></span>
                                <p>Delivered To Buyer</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export const ReturnOrderTracking = (props: any) => {
    let orderStatus = props.orderStatus;
    const [orderState, setState] = React.useState({
        ordered: false,
        courierPickedUp: false,
        transition: false,
        returned: false,
    });
    const { ordered, courierPickedUp, transition, returned } = orderState;

    useEffect(() => {
        if (orderStatus === 'order returned') {
            setState({
                ...orderState,
                ['ordered']: true,
                ['courierPickedUp']: false,
                ['transition']: false,
                ['returned']: false,

            });
        }
        else if (orderStatus === 'return-courier-picked-up') {
            setState({
                ...orderState,
                ['ordered']: true,
                ['courierPickedUp']: true,
                ['transition']: false,
                ['returned']: false,

            });
        }
        else if (orderStatus === 'return-in-transition') {
            setState({
                ...orderState,
                ['ordered']: true,
                ['courierPickedUp']: true,
                ['transition']: true,
                ['returned']: false,
            });
        }
        else if (orderStatus === 'returned') {
            setState({
                ...orderState,
                ['ordered']: true,
                ['courierPickedUp']: true,
                ['transition']: true,
                ['returned']: true,

            });
        }
    }, [orderStatus]);


    return (
        <>
            <div className="container">
                <div className="row">
                    <div className={styles.grayBox} >
                        <p className='text-center' style={{ fontWeight: "bold", marginBottom: "2rem" }}>Return Order Tracking</p>
                        <div className={styles.OrderTrackingBlock}>
                            <div className={`${styles.orderTracking} ${styles.isComplete} ${ordered ? styles.completed : ""} `}>
                                <span className={styles.isComplete}></span>
                                <p>Order Returned </p>
                            </div>
                            <div className={`${styles.orderTracking} ${styles.isComplete} ${courierPickedUp ? styles.completed : ""}`}>
                                <span className={styles.isComplete}></span>
                                <p>Courier picked-up</p>
                            </div>
                            <div className={`${styles.orderTracking} ${styles.isComplete} ${transition ? styles.completed : ""}`}>
                                <span className={styles.isComplete}></span>
                                <p>In-Transit</p>
                            </div>
                            <div className={`${styles.orderTracking} ${styles.isComplete} ${returned ? styles.completed : ""}`}>
                                <span className={`${styles.isComplete} ${styles.arrow}`}></span>
                                <p>Returned to seller</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

