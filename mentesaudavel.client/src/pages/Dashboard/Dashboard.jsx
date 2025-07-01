import { useState, useEffect } from 'react';
import PieChart from '../../components/PieChart';
import Table from '../../components/Table';
import api from '../../services/api';

const Dashboard = () => {
    const [pieChartLabels, setPieChartLabels] = useState([]);
    const [pieChartValues, setPieChartValues] = useState([]);
    const [tableData, setTableData] = useState([]);
    const colunas = ['Numero', 'Estratificacao', 'Pontuacao', 'DataEnvio'];

    const getTableData = async () => {
        try {
            const response = await api.post('dashboard/historico', '5713002A-AB95-40FA-B56B-69A806D5BBDF', {
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.data) {
                let count = 0;

                const dados = response.data.map(item =>
                ({
                    Numero: count +=1,
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
        <div style={{ display: 'flex', height: '100vh', padding: '20px', boxSizing: 'border-box' }}>
            <div style={{ flex: 1, paddingRight: '20px' }}>
                <Table
                    title="Questionários Respondidos"
                    columns={colunas}
                    data={tableData}
                />
            </div>
            <div>
                <PieChart
                    title="Usuários por Estratificação"
                    labels={pieChartLabels}
                    tooltipLabel="Usuários"
                    dataValues={pieChartValues}
                    colors={['#36A2EB', '#56FF7B', '#FFCE56', '#FF6384']}
                />
            </div>
        </div>
    );
}

export default Dashboard;