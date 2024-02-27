import React from 'react';
import { Bar } from 'react-chartjs-2';

const StackedBarChart = () => {
  // Sample data for the stacked bar chart
  const data = {
    labels: ['2019', '2020', '2021', '2022', '2023'],
    datasets: [
      {
        label: 'North America',
        backgroundColor: 'rgba(75,192,192,0.5)',
        data: [65, 59, 80, 81, 56]
      },
      {
        label: 'Europe',
        backgroundColor: 'rgba(255,87,132,0.5)',
        data: [28, 48, 40, 19, 86]
      },
      {
        label: 'APAC',
        backgroundColor: 'rgba(75,55,192,0.5)',
        data: [65, 59, 80, 81, 56]
      },
      {
        label: 'MEA',
        backgroundColor: 'rgba(255,0,132,0.5)',
        data: [28, 48, 40, 19, 86]
      },
      {
        label: 'Latin America',
        backgroundColor: 'rgba(165,192,192,0.5)',
        data: [65, 59, 80, 81, 56]
      },

    ]
  };

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
          labels: data.labels,
          datasets: data.datasets.map(dataset => ({
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






