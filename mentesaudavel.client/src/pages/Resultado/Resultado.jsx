import React from 'react';
import './resultado.css';

const enumEstratificacao = {
  NAO_IDENTIFICADO: 'NAO_IDENTIFICADO',
  SOFRIMENTO_LEVE: 'SOFRIMENTO_LEVE',
  SOFRIMENTO_MODERADO: 'SOFRIMENTO_MODERADO',
  SOFRIMENTO_GRAVE: 'SOFRIMENTO_GRAVE',
};
const formatarEstratificacao = (texto) => {
  if (!texto) return '';
  return texto
    .toLowerCase()
    .replace(/_/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase());
};


const Resultado = ({ pontuacao }) => {
  const redirectHome = () => {
    window.location.href = '/';
  };

  const redirectDashboard = () => {
    window.location.href = '/dashboard';
  };

  const getEstratificacao = () => {
    if (pontuacao <= 5) return enumEstratificacao.NAO_IDENTIFICADO;
    if (pontuacao <= 10) return enumEstratificacao.SOFRIMENTO_LEVE;
    if (pontuacao <= 15) return enumEstratificacao.SOFRIMENTO_MODERADO;
    return enumEstratificacao.SOFRIMENTO_GRAVE;
  };

  const estratificacao = getEstratificacao();

  return (
    <section className="container mt-5">
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
        <h2 className="text-center">{formatarEstratificacao(estratificacao)}</h2>

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

// mentesaudavel.client/src/pages/Resultado.jsx
import React from 'react'; // Não precisamos mais de useState ou useEffect para um componente estático
import Button from '../../components/Button';
import Card from '../../components/Card';
import Input from '../../components/Input'; // Usado para o slider, se for um componente Input customizado
import { Link, useNavigate } from 'react-router-dom';

const Resultado = () => {
    const navigate = useNavigate();

    const pontuacaoFixa = 12;
    const estratificacaoTextoFixo = "Sofrimento Moderado";
    const descricaoEstratificacaoFixo = (
        <>
            Seu resultado indica sinais moderados de sofrimento mental.
            <br />Esse é um sinal de que seu bem-estar emocional precisa de atenção.
            Considere procurar um(a) psicólogo(a) para conversar e receber orientação.
            Ter alguém capacitado para ajudar nesse momento pode fazer toda a diferença.
            <br />Não deixe seus sentimentos de lado: cuidar da saúde mental é tão importante quanto cuidar da saúde física.
        </>
    );

    const redirectHome = () => {
        navigate('/');
    };

    const redirectDashboard = () => {
        navigate('/dashboard');
    };

    return (
        <div className='page'>
            <Card>
                <div className='cardprimary'>
                    <div className='logo-title'>
                        <span className='logo-text'>Seu Resultado</span>
                    </div>

                    <div className="slider-container" style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        margin: '20px 0',
                        width: '100%', // Adicionado para melhor controle do espaço
                        padding: '0 20px', // Adicionado um padding para as bordas
                        boxSizing: 'border-box' // Para incluir padding na largura
                    }}>
                        {/* Estilos inline detalhados para o input de range */}
                        <input
                            type="range"
                            min="0"
                            max="20"
                            value={pontuacaoFixa}
                            className="slider" // Mantida a classe, mas os estilos virão inline
                            id="feelingRange"
                            disabled={true}
                            style={{
                                WebkitAppearance: 'none', // Necessário para estilizar o slider no WebKit
                                appearance: 'none',
                                width: '100%', // Ocupa 100% da largura do slider-container
                                height: '8px', // Altura da barra do slider
                                background: '#ddd', // Cor de fundo da barra
                                borderRadius: '5px', // Bordas arredondadas
                                outline: 'none', // Remove o contorno ao focar
                                opacity: '0.7', // Transparência
                                transition: 'opacity .2s', // Transição suave ao hover (se não fosse disabled)
                                marginBottom: '15px', // Espaço abaixo do slider
                            }}
                        />
                        <div className="emojis" style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            width: '100%', // Ocupa 100% da largura do slider-container
                            fontSize: '24px', // Tamanho dos emojis
                        }}>
                            <span>😁</span>
                            <span>🙂</span>
                            <span>😐</span>
                            <span>😢</span>
                            <span>😫</span>
                        </div>
                    </div>

                    <div className="resultConainer">
                        <h2>{estratificacaoTextoFixo}</h2>
                        <p>{descricaoEstratificacaoFixo}</p>
                    </div>
                </div>

                <div className='pagefooter'>
                    <Link to={'/'}>
                        <Button secondary>Voltar para página inicial</Button>
                    </Link>
                    <Button primary onClick={redirectDashboard}>Ir para Dashboard</Button>
                </div>
            </Card>
        </div>
    );
};

export default Resultado;
