import './Dashboard.css'
import { useState, useEffect } from 'react';
import PieChart from '../../components/PieChart/PieChart';
import Table from '../../components/Table/Table';
import api from '../../services/api';

const Dashboard = () => {
    const [pieChartLabels, setPieChartLabels] = useState([]);
    const [pieChartValues, setPieChartValues] = useState([]);
    const [tableData, setTableData] = useState([]);
    const colunas = [
        { header: '#', accessor: 'Numero' },
        { header: 'Estratificação', accessor: 'Estratificacao' },
        { header: 'Pontuação', accessor: 'Pontuacao' },
        { header: 'Data de Envio', accessor: 'DataEnvio' }
    ];

    const getTableData = async () => {
        try {

            const usuarioId = localStorage.getItem('usuarioId');
            const response = await api.post('dashboard/historico', usuarioId, {
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.data) {
                let count = 0;

                const dados = response.data.map(item =>
                ({
                    Numero: count += 1,
                    Estratificacao: item.estratificacao.descricao,
                    Pontuacao: item.pontuacao,
                    DataEnvio: item.dataEnvio
                }))

                setTableData(dados);
            }
        }
        catch (error) {

        }
    };

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
        getTableData();
        getPieChartData();
    }, []);

    return (
        <div className='dashboard-container'>
            <Table
                title="Questionários Respondidos"
                columns={colunas}
                data={tableData}
            />
            <PieChart
                title="Usuários por Estratificação"
                labels={pieChartLabels}
                tooltipLabel="Usuários"
                dataValues={pieChartValues}
                colors={['#36A2EB', '#56FF7B', '#FFCE56', '#FF6384']}
            />
        </div>
    );
}

export default Dashboard;