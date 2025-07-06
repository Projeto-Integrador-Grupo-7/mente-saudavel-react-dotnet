import './Home.css';
import { Link } from 'react-router-dom';

const Home = () => {
    const usuarioNome = localStorage.getItem('nome');

    return (
        <div className="big-container">
            <div className="home-container">
                <h2>Bem-vindo {usuarioNome}, esse é o sistema Mente Saudável!</h2>
                <p>
                    O sistema tem como objetivo monitorar a saúde mental dos trabalhadores empregando
                    o <strong>questionário Self-Reporting Questionnaire-20 (SRQ-20)</strong>, sinta-se à vontade para respondê-lo.
                    <br />
                    As respostas serão utilizadas em relatórios, médias e gráficos para análise de métricas,
                    porém <strong>seu nome não será divulgado</strong> aos outros usuários.
                </p>

                <div className="cards-container">
                    <div className="card">
                        <h3>Responder Questionário</h3>
                        <p>Participe da autoavaliação de saúde mental com o SRQ-20.</p>
                        <Link to={'/questionario'} className="card-btn">Responder</Link>
                    </div>
                    <div className="card">
                        <h3>Dashboard</h3>
                        <p>Acompanhe seu progresso, veja estatísticas e relatórios personalizados.</p>
                        <Link to={'/dashboard'} className="card-btn">Visualizar</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;