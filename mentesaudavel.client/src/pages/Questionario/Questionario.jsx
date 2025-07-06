import './Questionario.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

const perguntas = [
    'Você tem dores de cabeça frequentes?',
    'Tem falta de apetite?',
    'Dorme mal?',
    'Assusta-se com facilidade?',
    'Tem tremores nas mãos?',
    'Sente-se nervoso(a), tenso(a) ou preocupado(a)?',
    'Tem má digestão?',
    'Tem dificuldades de pensar com clareza?',
    'Tem se sentido triste ultimamente?',
    'Tem chorado mais do que de costume?',
    'Encontra dificuldades para realizar com satisfação suas atividades diárias?',
    'Tem dificuldades para tomar decisões?',
    'Tem dificuldades no serviço (seu trabalho é penoso, causa-lhe sofrimento?)',
    'É incapaz de desempenhar um papel útil em sua vida?',
    'Tem perdido o interesse pelas coisas?',
    'Você se sente uma pessoa inútil, sem préstimo?',
    'Tem tido ideia de acabar com a vida?',
    'Sente-se cansado(a) o tempo todo?',
    'Você se cansa com facilidade?',
    'Tem sensações desagradáveis no estômago?'
];

const Questionario = () => {
    const [formData, setFormData] = useState({});
    const [mensagem, setMensagem] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;

        let boolValue = value;

        if (value === 'true') {
            boolValue = true;
        }
        else if (value === 'false') {
            boolValue = false;
        }

        setFormData({ ...formData, [name]: boolValue });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const usuarioId = localStorage.getItem('usuarioId');

            const dados = {
                usuarioId: usuarioId,
                respostas: formData 
            };

            const response = await api.post('questionarios', dados, {
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.status == 200) {
                navigate('/resultado', {
                    state:
                    {
                        pontuacao: response.data.pontuacao,
                        estratificacao: response.data.estratificacao.descricao
                    }
                });
                return;
            }

            let error = response.data;
            setMensagem(`Erro: ${error.mensagem}`);
        }
        catch (error) {
            error = error.response.data;
            setMensagem('Erro ao enviar questionário: ' + error.mensagem);
        }
    };

    return (
        <div className="container mt-5 d-flex justify-content-center">
            <div style={{ maxWidth: '700px', width: '100%' }}>
                <h1 className="mb-4 text-center">Como está sua saúde mental?</h1>
                <form onSubmit={handleSubmit}>
                    <div className="overflow-auto p-3 border rounded" style={{ maxHeight: '500px' }}>
                        {perguntas.map((pergunta, index) => {
                            const numero = index + 1;
                            return (
                                <div className="mb-3" key={numero}>
                                    <label className="form-label">{numero}- {pergunta}</label>
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name={`r${numero}`}
                                            id={`r${numero}-sim`}
                                            value={true}
                                            required
                                            onChange={handleChange}
                                        />
                                        <label className="form-check-label" htmlFor={`r${numero}-sim`}>
                                            Sim
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name={`r${numero}`}
                                            id={`r${numero}-nao`}
                                            value={false}
                                            onChange={handleChange}
                                        />
                                        <label className="form-check-label" htmlFor={`r${numero}-nao`}>
                                            Não
                                        </label>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="d-flex justify-content-between mt-4">
                        <button type="submit" className="btn btn-primary btnEnviarQuestionario">Enviar</button>
                    </div>

                    {mensagem && <div className="alert alert-info mt-3">{mensagem}</div>}
                </form>
            </div>
        </div>
    );
};

export default Questionario;
