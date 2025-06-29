import { useState, useEffect } from 'react';
import PieChart from '../../components/PieChart';
import api from '../../services/api';

const Dashboard = () => {
    const [pieChartLabels, setPieChartLabels] = useState([]);
    const [pieChartValues, setPieChartValues] = useState([]);

    const getPieChartData = async () => {
        try {
            const response = await api.get('dashboard/graficoPizza');

            if (response.data) {
                setPieChartLabels(Object.keys(response.data));
                setPieChartValues(Object.values(response.data));
            }
        }
        catch (error) {

        }
    }

    useEffect(() => {
        getPieChartData();
    }, []);

    return (
        <div style={{ height: '100vh', width: '100vw' }}>
            <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <PieChart
                    title="Usuários por Estratificação"
                    labels={pieChartLabels}
                    tooltipLabel="Usuários"
                    dataValues={ pieChartValues }
                    colors={['#36A2EB', '#56FF7B', '#FFCE56', '#FF6384']}
                />
            </div>
        </div>
    );
}

export default Dashboard;