import React, { useState } from 'react';
import Button from '../../components/Button';
import Card from '../../components/Card';
import Input from '../../components/Input';
import { Link } from 'react-router-dom';
import favicon from '../../images/favicon.ico';
import PasswordVerification from '../../components/PasswordVerification';

const Home = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        if (!email || !senha) {
            alert('Preencha todos os campos!');
            return;
        }
        fetch('https://localhost:5021/api/usuarios', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, senha }),
        })
        .then(async response => {
            if (!response.ok) {
                const errorText = await response.text();
                alert(`Erro ao fazer login! Código: ${response.status}\n${errorText}`);
                return;
            }
            alert('Login realizado com sucesso!');
        })
        .catch(error => {
            alert('Erro ao fazer login! ' + error);
        });
    };

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

export default Home;