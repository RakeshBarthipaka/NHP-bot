import { Chart as ChartJS, registerables } from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';
import { Chart, Line, Bar, Pie, Scatter, Doughnut, Bubble, Radar, PolarArea } from 'react-chartjs-2';


ChartJS.register(...registerables, zoomPlugin);


const DrawChart = (chart: any) => {
    let chartData = null;
    let charType = '';
    try {
        chartData = JSON.parse(chart.chart);
        charType = chartData.type;
    }
    catch (err) {
        chartData = null
    }
    const getChartTypesElement = (charType: any, chartData: any) => {
        if (charType === 'line') {
            return (<Line data={chartData.data} options={chartData.options}/>)
        }
        else if (charType === 'pie') {
            return (<Pie data={chartData.data} options={chartData.options}/>)
        }
        else if (charType === 'scatter') {
            return (<Scatter data={chartData.data} options={chartData.options}/>)
        }
        else if (charType === 'doughnut') {
            return (<Doughnut data={chartData.data} options={chartData.options}/>)
        }
        else if (charType === 'bubble') {
            return (<Bubble data={chartData.data} options={chartData.options}/>)
        }
        else if (charType === 'radar') {
            return (<Radar data={chartData.data} options={chartData.options}/>)
        }
        else if (charType === 'polarArea') {
            return (<PolarArea data={chartData.data} options={chartData.options}/>)
        }
        else {
            return (<Bar data={chartData.data} options={chartData.options}/>)
        }
    }
    return (
        <div>
            {chartData && charType ? (
                getChartTypesElement(charType, chartData)
            ):(<p>No Chart Generated</p>)
            }
        </div>
    );
};

export default DrawChart;