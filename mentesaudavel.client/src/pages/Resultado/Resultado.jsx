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
