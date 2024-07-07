import type { TDocumentDefinitions } from "pdfmake/interfaces";
import * as Utils from 'src/helpers';
import { generateDonutChart } from "./charts/donut.chart";
import { footerSection, headerSection } from "./sections";
import { generateLineChart } from "./charts/line.chart";
import { generateBarChar } from "./charts/bar.chart";
import { generatePolarAreaChart } from "./charts/polar-area.chart";


interface TopCountry {
    country: string;
    customers: number;
}

interface ReportOptions {
    title?: string;
    subTitle?: string;
    topCountries: TopCountry[];
}

export const getStatisticsReport = async (options: ReportOptions): Promise<TDocumentDefinitions> => {

    const data = options.topCountries.map(({ country, customers }) => ({
        label: country,
        value: customers,
    }));

    const [ donutChart, lineChart, barChart, polarAreaChart ] = await Promise.all([generateDonutChart({ entries: data, position: 'left' }), generateLineChart(), generateBarChar(), generatePolarAreaChart()]);

    // const donutChart = await generateDonutChart({ entries: data, position: 'left' });
    // const lineChart = await generateLineChart();

    const docDefinition: TDocumentDefinitions = {
        pageMargins: [40, 100, 40, 60],
        header: headerSection({
            title: options.title ?? 'Estadísticas de clientes',
            subtitle: options.subTitle ?? 'Países con más ventas',
        }),
        footer: footerSection,
        content: [
            {
                columns: [
                    {
                        stack: [
                            {
                                text: 'Top 10 países con más clientes',
                                alignment: 'center',
                                marginBottom: 10,
                            },
                            {
                                image: donutChart,
                                width: 350,
                            }
                        ],
                    },
                    {
                        layout: 'lightHorizontalLines',
                        width: 'auto',
                        table: {
                            headerRows: 1,
                            widths: [100, 'auto'],
                            body: [
                                ['País', 'Clientes'],
                                ...options.topCountries.map((country) => [country.country, country.customers]),
                            ],
                        }

                    }
                ]
            },
            {
                image: lineChart,
                width: 500,
                marginTop: 20,
            },
            {
                columns: [
                    {
                        image: barChart,
                        width: 250,
                        marginTop: 20,
                    },
                    {
                        image: polarAreaChart,
                        width: 250,
                        marginTop: 20,
                    },

                ]
            }
        ],
    }

    return docDefinition;
}