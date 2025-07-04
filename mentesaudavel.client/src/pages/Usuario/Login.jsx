import './usuario.css';
import React, { useState } from 'react';
import Button from '../../components/Button';
import Card from '../../components/Card';
import Input from '../../components/Input';
import { Link, useNavigate } from 'react-router-dom';
import favicon from '../../images/favicon.ico';
import PasswordVerification from '../../components/PasswordVerification';
import api from '../../services/api';

const Login = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        try {
            e.preventDefault();

            if (!email || !senha) {
                alert('Preencha todos os campos!');
                return;
            }

            const dados = {
                email: email,
                senha: senha
            }

            const response = await api.post('usuarios/login', dados);

            if (response.status == 200) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('usuarioId', response.data.usuarioId);
                localStorage.setItem("nome", response.data.nome);
                navigate('/home');
                return;
            }

            alert('Erro ao fazer login: ' + response.data.mensagem);
        }
        catch (error) {
            let response = error.response.data;
            alert('Erro ao fazer login: ' + response.mensagem + '\n\nDetalhes: ' + response.detalhes);
        }
    }

    return (
        <div className='page'>
            <Card>
                <form onSubmit={handleLogin}>
                    <div className='cardprimary'>
                        <div className='logo-title'>
                            <img src={favicon} alt="Logo" className='logo-img' />
                            <span className='logo-text'>Mente<br />Saudável</span>
                        </div>
                        <Input
                            placeholder='email'
                            type='email'
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        <PasswordVerification
                            onPasswordChange={senha => setSenha(senha)}
                        />
                        <Link to='/' className='recoverypassword'>esqueci a senha</Link>
                    </div>
                    <div className='pagefooter'>
                        <Link to={'/cadastro'}>
                            <Button secondary>Criar nova conta</Button>
                        </Link>
                        <Button primary type='submit'>Entrar</Button>
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default Login;