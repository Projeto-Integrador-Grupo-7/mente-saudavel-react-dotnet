import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './questionario.css';

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

const toPascalCase = (obj) => {
  const newObj = {};
  for (const key in obj) {
    const pascalKey = key.charAt(0).toUpperCase() + key.slice(1);
    newObj[pascalKey] = obj[key];
  }
  return newObj;
};

const Questionario = () => {
  const [formData, setFormData] = useState({});
  const [mensagem, setMensagem] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://localhost:5001/api/questionarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(toPascalCase(formData))
      });

      if (!response.ok) {
        const errorText = await response.text();
        setMensagem(`Erro: ${errorText}`);
        return;
      }

      const data = await response.json();

      // Redireciona para tela de resultado com pontuação
      navigate('/resultado', { state: { pontuacao: data.Pontuacao } });

    } catch (error) {
      console.error('Erro ao enviar:', error);
      setMensagem('Erro ao enviar questionário.');
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
                      name={`q${numero}`}
                      id={`q${numero}-sim`}
                      value="S"
                      required
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor={`q${numero}-sim`}>
                      Sim
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name={`q${numero}`}
                      id={`q${numero}-nao`}
                      value="N"
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor={`q${numero}-nao`}>
                      Não
                    </label>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="d-flex justify-content-between mt-4">
            <button type="submit" className="btn btn-primary">Enviar</button>
            <a href="/dashboard" className="btn btn-outline-secondary">Voltar para Dashboard</a>
          </div>

          {mensagem && <div className="alert alert-info mt-3">{mensagem}</div>}
        </form>
      </div>
    </div>
  );
};

export default Questionario;
