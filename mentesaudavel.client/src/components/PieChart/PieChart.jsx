import './PieChart.css';
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const PieChart = ({ title = 'Gráfico de Pizza', subtitle = 'Total: ', labels = ['Sem dados'], tooltipLabel = 'Valores', dataValues = [1], colors = [] }) => {
    const total = dataValues.reduce((acc, val) => acc + val, 0);

    const data = {
        labels: labels,
        datasets: [
            {
                label: tooltipLabel,
                data: dataValues,
                backgroundColor: colors.length > 0 ? colors : [
                    '#0088FE',
                    '#00C49F',
                    '#FFBB28',
                    '#FF8042'
                ],
                borderColor: '#ffffff',
                borderWidth: 2,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
            },
            datalabels: {
                color: '#fff',
                formatter: (value) => {
                    const porcentagem = ((value / total) * 100).toFixed(1);
                    return porcentagem + '%';
                },
                font: {
                    weight: 'bold',
                    size: 12,
                },
            }
        }
    };

    return (
        <div className='piechart-container'>
            <h2>{title}</h2>
            <h3 style={{ textAlign: 'center' }}>{subtitle}{total}</h3>
            <Pie data={data} options={options} />
        </div>
    );
};

export default PieChart;
