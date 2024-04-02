import React from 'react';
import { Bar } from 'react-chartjs-2';

interface Props {
  barchartData: any;
}

const StackedBarChart = (props: Props) => {
  // Sample data for the stacked bar chart
  const data = props?.barchartData;

  // Options for the stacked bar chart
  const options: any = {
    responsive: true,
    title: {
      display: true,
      text: 'Sales by Month and Product',
      fontSize: 20
    },
    scales: {
      xAxes: [{ stacked: true }],
      yAxes: [{ stacked: true }]
    }
  };

  return (
    <div>
      <Bar
        data={{
          labels: data?.labels,
          datasets: data?.datasets?.map((dataset: any) => ({
            ...dataset,
            stack: 'stack',
          }))
        }}
        options={options}
      />
    </div>
  );
};

export default StackedBarChart;






