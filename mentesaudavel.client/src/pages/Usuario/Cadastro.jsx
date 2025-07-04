import './usuario.css';
import React, { useState } from 'react';
import Button from '../../components/Button';
import Card from '../../components/Card';
import Input from '../../components/Input';
import { Link, useNavigate } from 'react-router-dom';
import PasswordVerification from '../../components/PasswordVerification';
import api from '../../services/api';

const Cadastro = () => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [sexo, setSexo] = useState('');
    const [senhaValida, setSenhaValida] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!senhaValida) {
            alert('A senha não está conforme as regras.');
            return;
        }
        if (!nome || !email || !senha || !dataNascimento || !sexo) {
            alert('Preencha todos os campos!');
            return;
        }

        const dados = { nome, email, senha, dataNascimento, sexo };

        try {
            const response = await api.post('usuarios', dados);

            if (response.status == 400) {
                alert('Erro ao cadastrar: ' + response.data.mensagem);
                return;
            }
            
            alert('Cadastro com sucesso!');
            navigate('/login');
        }
        catch (error) {
            let response = error.response.data;
            alert('Erro ao cadastrar: ' + response.mensagem + '\n\nDetalhes: ' + response.detalhes);
        }
    };

    return (
        <div className='page'>
            <Card>
                <form onSubmit={handleSubmit}>
                    <div className='cardprimary'>
                        <div className='logo-title'>
                            <span className='logo-text'>Cadastro</span>
                        </div>
                        <Input placeholder='nome' type='text' value={nome} onChange={e => setNome(e.target.value)} />
                        <Input placeholder='email' type='email' value={email} onChange={e => setEmail(e.target.value)} />
                        <PasswordVerification confirmation onPasswordChange={(senha, valida) => {
                                setSenha(senha);
                                setSenhaValida(valida);
                            }}
                        />
                        <div className='cardsecondary'>
                            <Input id="dataNascimento" type='date' value={dataNascimento} onChange={e => setDataNascimento(e.target.value)} />
                            <select className="input" value={sexo} onChange={e => setSexo(e.target.value)}>
                                <option value="" disabled hidden>Sexo</option>
                                <option value="F">Feminino</option>
                                <option value="M">Masculino</option>
                                <option value="O">Outro</option>
                            </select>
                        </div>
                    </div>

                    <div className='pagefooter'>
                        <Link to={'/login'}>
                            <Button secondary>Já possuo uma conta</Button>
                        </Link>
                        <Button primary type='submit'>Cadastrar</Button>
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default Cadastro;