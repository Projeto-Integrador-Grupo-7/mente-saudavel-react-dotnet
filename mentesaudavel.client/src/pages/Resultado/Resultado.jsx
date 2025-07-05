import './resultado.css';
import React from 'react';
import { useLocation } from 'react-router-dom';

const enumEstratificacao = {
    NAO_IDENTIFICADO: 'Sofrimento Não Identificado',
    SOFRIMENTO_LEVE: 'Sofrimento Leve',
    SOFRIMENTO_MODERADO: 'Sofrimento Moderado',
    SOFRIMENTO_GRAVE: 'Sofrimento Grave',
};

const Resultado = () => {
    const location = useLocation();
    const { pontuacao, estratificacao } = location.state || {};

    const redirectHome = () => {
        window.location.href = '/';
    };

    const redirectDashboard = () => {
        window.location.href = '/dashboard';
    };

    return (
        <section className="mt-5">
            <h1 className="mb-4 text-center">Seu resultado</h1>

            <div className="slider-container text-center">
                <input
                    type="range"
                    min="0"
                    max="20"
                    value={pontuacao}
                    className="slider"
                    id="feelingRange"
                    disabled
                />
                <div className="emojis custom-emojis">
                    <span role="img" aria-label="muito bem">😁</span>
                    <span role="img" aria-label="bem">🙂</span>
                    <span role="img" aria-label="neutro">😐</span>
                    <span role="img" aria-label="triste">😢</span>
                    <span role="img" aria-label="muito triste">😫</span>
                </div>
            </div>

            <div className="resultContainer mt-4">
                <h2 className="text-center">{estratificacao}</h2>

                {estratificacao === enumEstratificacao.NAO_IDENTIFICADO && (
                    <p>
                        Parabéns! Seu resultado indica que, no momento, não há sinais relevantes de sofrimento mental. <br />
                        Continue cuidando de sua saúde emocional e física. Mantenha práticas saudáveis no seu dia a dia, como momentos de lazer,
                        boa alimentação, atividades físicas e bons relacionamentos. <br />
                        Se, em algum momento, você sentir necessidade, saiba que buscar ajuda profissional é sempre uma atitude de autocuidado.
                    </p>
                )}

                {estratificacao === enumEstratificacao.SOFRIMENTO_LEVE && (
                    <p>
                        Seu resultado indica sinais leves de sofrimento mental. <br />
                        Mesmo que ainda não seja algo grave, é importante estar atento(a) a si mesmo(a). <br />
                        Procure cuidar da sua rotina emocional: pratique atividades que tragam bem-estar, reserve tempo para você e,
                        se possível, converse com pessoas de confiança sobre como se sente. <br />
                        Se o desconforto persistir ou aumentar, buscar apoio psicológico pode ser muito benéfico.
                    </p>
                )}

                {estratificacao === enumEstratificacao.SOFRIMENTO_MODERADO && (
                    <p>
                        Seu resultado indica sinais moderados de sofrimento mental. <br />
                        Esse é um sinal de que seu bem-estar emocional precisa de atenção. <br />
                        Considere procurar um(a) psicólogo(a) para conversar e receber orientação. <br />
                        Ter alguém capacitado para ajudar nesse momento pode fazer toda a diferença. <br />
                        Não deixe seus sentimentos de lado: cuidar da saúde mental é tão importante quanto cuidar da saúde física.
                    </p>
                )}

                {estratificacao === enumEstratificacao.SOFRIMENTO_GRAVE && (
                    <p>
                        Seu resultado aponta sinais graves de sofrimento mental. <br />
                        Sabemos que pode ser difícil enfrentar momentos assim, mas é importante lembrar que você não está sozinho(a). <br />
                        Recomendamos que procure o quanto antes o apoio de um(a) profissional da saúde mental, como um(a) psicólogo(a) ou psiquiatra. <br />
                        Eles poderão ouvir você com acolhimento e indicar os melhores caminhos para seu tratamento e recuperação. <br />
                        Pedir ajuda é um ato de coragem e autocuidado. Você merece atenção, cuidado e apoio.
                    </p>
                )}
            </div>

            <div className="containerBtns mt-4 d-flex justify-content-center gap-3">
                <button className="btn btn-outline-primary" onClick={redirectHome}>Voltar para página inicial</button>
                <button className="btn btn-primary" onClick={redirectDashboard}>Ir para Dashboard</button>
            </div>
        </section>
    );
};

export default Resultado;