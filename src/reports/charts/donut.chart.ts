import * as Utils from 'src/helpers';

interface DonutEntry {
    label: string;
    value: number;
}

interface DonutOptions {
    position?: 'left' | 'right' | 'top' | 'bottom';    
    entries: DonutEntry[];
}

export const generateDonutChart = async (options: DonutOptions): Promise<string> => {
    const { position = 'top' } = options;

    const data = {
        labels: options.entries.map( (item) => item.label),
        datasets: [
            {
                label: 'Dataset 1',
                data: options.entries.map( (item) => item.value),
                backgroundColor: Object.values(Utils.CHART_COLORS),
            }
        ]
    };

    const config = {
        type: 'doughnut',
        data: data,
        options: {
            responsive: true,
            legend: {
                position: position,
            },
            plugins: {
                datalabels: {
                    color: 'white',
                    font: {
                        weight: 'bold',
                        size: 14,
                    }
                    // text: 'Chart.js Doughnut Chart'
                }
            }
        },
    };

    return Utils.chartJToImage(config);
}
