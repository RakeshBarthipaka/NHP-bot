import ChartJsImage from 'chartjs-to-image';
import { Buffer } from "buffer";
//import { uploadFileToAzure } from '../../utils/fileUploadAzure';

window.Buffer = window.Buffer || Buffer;

const DrawChartURL = async (chartData: any) => {
    try {
        const myChart = new ChartJsImage();
        myChart.setConfig({
            type: chartData.type,
            data: chartData.data,
            options:chartData.options
        });
        if(chartData.type==='pie' || chartData.type==='doughnut'){
            myChart.setHeight(420)
        }
        myChart.setDevicePixelRatio(0)
        let dataUrl = await myChart.toDataUrl();
       // let charURL = await uploadFileToAzure(dataUrl, chartData.type)
        return dataUrl
    }
    catch (err) {
        return ''
    }
};

export default DrawChartURL;
