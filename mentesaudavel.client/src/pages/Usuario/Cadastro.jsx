import './usuario.css';
import React, { useState } from 'react';
import Button from '../../components/Button';
import Card from '../../components/Card';
import Input from '../../components/Input';
import { Link } from 'react-router-dom';
import PasswordVerification from '../../components/PasswordVerification';

const Cadastro = () => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [sexo, setSexo] = useState('');
    const [senhaValida, setSenhaValida] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!senhaValida) {
            alert('A senha não está conforme as regras.');
            return;
        }
        if (!nome || !email || !senha || !dataNascimento || !sexo) {
            alert('Preencha todos os campos!');
            return;
        }
        const data = { nome, email, senha, dataNascimento, sexo };
        fetch('https://localhost:5021/api/usuarios', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        })
        .then(async response => {
            if (!response.ok) {
                alert(`Erro ao cadastrar! Código: ${response.status}`);
                return;
            }
            alert('Cadastro com sucesso!');
        })
        .catch(error => {
            alert('Erro ao cadastrar! ' + error);
        });
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
                                <option value="feminino">Feminino</option>
                                <option value="masculino">Masculino</option>
                                <option value="nao_dizer">Prefiro não dizer</option>
                            </select>
                        </div>
                    </div>

                    <div className='pagefooter'>
                        <Link to={'/'}>
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