import './Relatorio.css'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

const enumEstratificacao = {
    NAO_IDENTIFICADO: 'Sofrimento Não Identificado',
    SOFRIMENTO_LEVE: 'Sofrimento Leve',
    SOFRIMENTO_MODERADO: 'Sofrimento Moderado',
    SOFRIMENTO_GRAVE: 'Sofrimento Grave',
};

const Relatorio = () => {
    const [pontuacao, setPontuacao] = useState('');
    const [estratificacao, setEstratificacao] = useState('');
    const [dataEnvio, setDataEnvio] = useState('');

    const getUltimoQuestionarioRespondido = async () => {
        try {
            const usuarioId = localStorage.getItem('usuarioId');
            debugger;
            const response = await api.post('questionarios/relatorio', usuarioId);
            debugger;
            if (response.status == 200) {
                let questionario = response.data;

                setPontuacao(questionario.pontuacao);
                setEstratificacao(questionario.estratificacao.descricao);
                setDataEnvio(questionario.dataEnvio);
            }
        }
        catch (error) {

        }
    };

    useEffect(() => {
        getUltimoQuestionarioRespondido();
    }, []);

    return (
        <div className="relatorio-container">
            <h1>Relatório</h1>
            <p>
                O último questionário submetido foi no dia <strong>{ dataEnvio }</strong>. <br />
                Nele, você obteve <strong>{ pontuacao } pontos</strong>,
                equivalente à estratificação <strong>{ estratificacao }</strong>.
            </p>

            {estratificacao === enumEstratificacao.NAO_IDENTIFICADO && (
                <p>
                    Parabéns! Seu resultado indica que, no momento, não há sinais relevantes de sofrimento mental.
                    <br />Continue cuidando de sua saúde emocional e física.
                    Mantenha práticas saudáveis no seu dia a dia, como momentos de lazer, boa alimentação,
                    atividades físicas e bons relacionamentos.
                    <br />Se, em algum momento, você sentir necessidade,
                    saiba que buscar ajuda profissional é sempre uma atitude de autocuidado.
                </p>
            )}

            {estratificacao === enumEstratificacao.SOFRIMENTO_LEVE && (
                <p>
                    Seu resultado indica sinais leves de sofrimento mental.
                    Mesmo que ainda não seja algo grave, é importante estar atento(a) a si mesmo(a).
                    <br />Procure cuidar da sua rotina emocional: pratique atividades que tragam bem-estar, reserve tempo para você e,
                    se possível, converse com pessoas de confiança sobre como se sente.
                    <br />Se o desconforto persistir ou aumentar, buscar apoio psicológico pode ser muito benéfico.
                </p>
            )}

            {estratificacao === enumEstratificacao.SOFRIMENTO_MODERADO && (
                <p>
                    Seu resultado indica sinais moderados de sofrimento mental.
                    <br />Esse é um sinal de que seu bem-estar emocional precisa de atenção.
                    Considere procurar um(a) psicólogo(a) para conversar e receber orientação.
                    Ter alguém capacitado para ajudar nesse momento pode fazer toda a diferença.
                    <br />Não deixe seus sentimentos de lado: cuidar da saúde mental é tão importante quanto cuidar da saúde física.
                </p>
            )}

            {estratificacao === enumEstratificacao.SOFRIMENTO_GRAVE && (
                <p>
                    Seu resultado aponta sinais graves de sofrimento mental.
                    Sabemos que pode ser difícil enfrentar momentos assim, mas é importante lembrar que você não está sozinho(a).
                    <br />Recomendamos que procure o quanto antes o apoio de um(a) profissional da saúde mental, como um(a) psicólogo(a) ou psiquiatra.
                    Eles poderão ouvir você com acolhimento e indicar os melhores caminhos para seu tratamento e recuperação.
                    <br />Pedir ajuda é um ato de coragem e autocuidado.
                    Você merece atenção, cuidado e apoio.
                </p>
            )}

            {!pontuacao && (
                <p>
                    Você ainda não submeteu nenhum questionário.
                    <br />Para visualizar o relatório, preencha o questionário disponível na aba <Link to={'/questionario'} className="btn">Questionário</Link>.
                </p>
            )}

            <div className="relatorio-btn-container">
                <Link to={'/dashboard'} className="btn">Voltar para Dashboard</Link>
            </div>
        </div>
    )
}

export default Relatorio;