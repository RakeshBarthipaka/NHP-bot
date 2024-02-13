import React from 'react'
import styles from "./Home.module.css";
import { Chart as ChartJS, registerables } from 'chart.js';
import { Chart, Line, Bar, Pie, } from 'react-chartjs-2';
import DataSetTable from './DataSet';
import { useEffect } from 'react';


ChartJS.register(...registerables);



export const HomePage = (props: any) => {
  const data = {
    labels: [
      'J.Crew',
      'Help',
      'Products',
      't-shirts',
      'shirts',
      'brand',
      'policy',
      'customer'
    ],
    datasets: [{
      label: 'Popular Words',
      data: [100, 80, 65, 50, 40, 30, 25, 20, 15],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 102, 102)',
        'rgb(77, 121, 255)',
        'rgb(255, 77, 166)',
        'rgb(255, 204, 102)',
        'rgb(210, 121, 121)',
        'rgb(230, 204, 255)',
        'rgb(223, 159, 223)',
        'rgb(0, 179, 179)',
      ],
      hoverOffset: 4
    }]
  };


  const dataSet = {
    row: ["location", "address", "latitude", "longitude"]
  }
  const [isLoading, setIsLoading] = React.useState(true);


  useEffect(() => {
      setTimeout(function () {
      setIsLoading(false); 
      }, 1000);
    }, []);
    
  return ( !isLoading ? 
    (<div className={styles.homePageBlock}>
      <div className={styles.homeCompnayInfoBlock}>

        <div className={styles.homeCompnayData}>
          <h2>
            <i className="material-icons">info</i>
            Company info</h2>
          <p>
            {props.projectData && props.projectData.companyInfo}
          </p>
        </div>
        <div className={styles.drawLineFlex}>
        </div>

        <div className={styles.homeChatbotData}>
          <h2> <i className="material-icons">info</i> About Chatbot</h2>
          <p> {props.projectData && props.projectData.chatbotInfo}</p>
        </div>
      </div>

      <div className={styles.homeChartBlock}>
        <div className={styles.homeChartKeywords}>
          <h2>Weekly Most Used Words</h2>
          <Bar options={{ indexAxis: "y" }} data={data} />
        </div>
        <div className={styles.homeChartQueries}>
          <h2>Top 5 Queries Asked Last Week</h2>
          <div className={styles.homeChartQueriesList}>
            <div className={styles.QueriesListItem}>
              <p>30%</p>
              <p className={styles.QueriesListItemLabel}>Show recommended Queries after one Queries that info come from history</p>
            </div>
            <div className={styles.QueriesListItem}>
              <p>25%</p>
              <p className={styles.QueriesListItemLabel}>What is the return policy to t-shirts??</p>
            </div>
            <div className={styles.QueriesListItem}>
              <p>20%</p>
              <p className={styles.QueriesListItemLabel}>When was J.Crew founded?</p>
            </div>
            <div className={styles.QueriesListItem}>
              <p>15%</p>
              <p className={styles.QueriesListItemLabel}> How can I access my order history on the J.Crew website?</p>
            </div>
            <div className={styles.QueriesListItem}>
              <p>10%</p>
              <p className={styles.QueriesListItemLabel}>What is your customer service page?</p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.homeDataset}>
        <h2> About dataset</h2>
        <div className={styles.homeDatasetItem}>
          <h4>Context</h4>
          <p>A J. Crew chatbot streamlines shopping, offering product recommendations, tracking orders, and answering queries, providing a faster and more personalized shopping experience.</p>
          <p>The J. Crew dataset consists of 2000 rows, each representing a unique product, and contains the key fields: "type_of_link," "link_description," and "product_information." These fields provide valuable information about the products, with "type_of_link" denoting the category of the link, "link_description" offering a brief description of the link's content, and "product_information" providing detailed information about each product. This dataset can be a valuable resource for various applications, such as product cataloging, information retrieval, or data analysis, offering insights into a diverse range of products and their associated online content.</p>
          <p>The dataset holds approximately up to 1GB of J.Crew data depending on the volume and the format in which it is stored and the media.</p>
        </div>
        <div className={styles.homeDatasetItem}>
          <h4>Content</h4>
          <DataSetTable />
        </div>
      </div>

    </div>):  
    (<h1 style={{ textAlign: "center", alignItems: "center", justifyContent: "center", padding: "100px", width: "120px" }}>Loading...</h1>)
  )
}
