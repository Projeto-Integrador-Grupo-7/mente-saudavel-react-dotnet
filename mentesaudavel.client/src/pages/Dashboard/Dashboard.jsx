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

    const [dataInicio, setDataInicio] = useState('');
    const [dataFim, setDataFim] = useState('');
    const [genero, setGenero] = useState('Todos');
    const [idade, setIdade] = useState('');

    const limparFiltros = () => {
        setDataInicio('');
        setDataFim('');
        setGenero('');
        setIdade('');
    }

    const handleFiltrar = () => {
        getTableData();
        getPieChartData();
    };

    const getTableData = async () => {
        try {
            const usuarioId = localStorage.getItem('usuarioId');

            const response = await api.post('dashboard/historico', {
                usuarioId: usuarioId,
                dataInicio: dataInicio || null,
                dataFim: dataFim || null
            });

            if (response.status == 200) {
                let count = 0;

                const dados = response.data.map(item =>
                ({
                    Numero: count += 1,
                    Id: item.id,
                    Estratificacao: item.estratificacao.descricao,
                    Pontuacao: item.pontuacao,
                    DataEnvio: item.dataEnvio
                }))

                setTableData(dados);
            }
        }
        catch (error) {
            setTableData([]);
        }
    };

    const getPieChartData = async () => {
        try {
            const response = await api.post('dashboard/graficoPizza', {
                dataInicio: dataInicio || null,
                dataFim: dataFim || null,
                genero: genero !== 'Todos' ? genero : null,
                idade: idade ? parseInt(idade) : null
            });

            if (response.status == 200) {
                setPieChartLabels(Object.keys(response.data));
                setPieChartValues(Object.values(response.data));
            }
        }
        catch (error) {
            setPieChartLabels();
            setPieChartValues();
        }
    }

    useEffect(() => {
        getTableData();
        getPieChartData();
    }, []);

    return (
        <div>
            <div className='filter-master-container'>
                <div>
                    <div className='filter-fields-container'>
                        <div>
                            <label className='form-label'>Data Início:</label><br />
                            <input type="date" value={dataInicio} onChange={e => setDataInicio(e.target.value)} className='form-control' />
                        </div>
                        <div>
                            <label className='form-label'>Data Fim:</label><br />
                            <input type="date" value={dataFim} onChange={e => setDataFim(e.target.value)} className='form-control' />
                        </div>
                        <div>
                            <label className='form-label'>Gênero:</label><br />
                            <select value={genero} onChange={e => setGenero(e.target.value)} className='form-select'>
                                <option value={null}>Todos</option>
                                <option value='F'>Feminino</option>
                                <option value='M'>Masculino</option>
                                <option value='O'>Outro</option>
                            </select>
                        </div>
                        <div>
                            <label className='form-label'>Idade:</label><br />
                            <input type="number" min="0" value={idade} onChange={e => setIdade(e.target.value)} className='form-control' />
                        </div>
                    </div>

                    <div className='filter-btn-container'>
                        <button onClick={limparFiltros} className='btn'>Limpar</button>
                        <button onClick={handleFiltrar} className='btn'>Filtrar</button>
                    </div>
                </div>
            </div>

            <div className='dashboard-container'>
                <Table
                    title="Questionários Respondidos"
                    columns={colunas}
                    data={tableData}
                />
                <PieChart
                    title="Resultado Geral"
                    subtitle="Total Usuários: "
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