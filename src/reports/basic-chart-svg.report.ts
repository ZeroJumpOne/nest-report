import fs from 'fs';
import { TDocumentDefinitions } from "pdfmake/interfaces";
import * as Utils from '../helpers';

const svgContent = fs.readFileSync('src/assets/ford.svg', 'utf8');

const generateChartImage = async () => {
    const chartConfig = {
        type: 'bar',                                // Show a bar chart
        // data: {
        //     labels: [2012, 2013, 2014, 2015, 2016],   // Set X-axis labels
        //     datasets: [{
        //         label: 'Users',                         // Create the 'Users' dataset
        //         data: [120, 60, 50, 180, 120]           // Add data to the chart
        //     }]
        // }
        data: {
            labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio'],
            datasets: [
                {
                    label: 'Mi primer gráfico',
                    data: [65, 59, 80, 81, 56, 55, 10],
                    backgroundColor: 'rgba(93,75,192,0.2)',
                    borderColor: 'rgb(81,75,192)',
                    borderwidth: 1,
                },
            ]
        }
    }

    return Utils.chartJToImage(chartConfig);
}

const generateDonut = async () => {

    const DATA_COUNT = 5;
    const NUMBER_CFG = { count: DATA_COUNT, min: 0, max: 100 };

    const data = {
        labels: ['Red', 'Orange', 'Yellow', 'Green', 'Blue'],
        datasets: [
            {
                label: 'Dataset 1',
                data: Utils.numbers(NUMBER_CFG),
                backgroundColor: Object.values(Utils.CHART_COLORS),
            }
        ]
    };

    const config = {
        type: 'doughnut',
        data: data,
        options: {
            responsive: true,
            title: {
                display: true,
                text: 'Chart.js Doughnut Chart'
            }
        },
    };

    return Utils.chartJToImage(config);
}


export const getSvgChartReport = async (): Promise<TDocumentDefinitions> => {

    const [ chart, chartDonut ] = await Promise.all([generateChartImage(), generateDonut()]);

    // const chart = await generateChartImage();
    // const chartDonut = await generateDonut();

    return {

        content: [
            {
                svg: svgContent,
                width: 100,
                fit: [100, 100],
            },
            {
                image: chart,
                width: 500,
            },
            {
                image: chartDonut,
                width: 500,
            },

        ],

    }

}