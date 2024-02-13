import React from 'react'
import styles from "./Answer.module.css";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import DOMPurify from "dompurify";



export const ProductList = (props: any) => {
    return (
        <>
            {
                props.product_list.map((product: any, i: any) => (
                    <>
                        <p className={styles.boldTag}> {product.title}</p>
                        <div className={styles.productList} key={i} >
                            <OwlCarousel dots={true} items={2} margin={8} dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(product.product).replace(/href/g, "target='_blank' href")}} className='owl-theme' loop nav={false} >
                            </OwlCarousel>;
                        </div>
                    </>
                ))
            }
        </>
    )
}
