import React from 'react';
import { useEffect } from 'react';
import api from '../../services/api';

const Login = () => {
    useEffect(() => {
        getUsuarios()
    }, []);

    return (
        <div>
            <h1>Login</h1>
        </div>
    );
};

export default Login;

// Provisório, vai ser mudado futuramente
async function getUsuarios() {
    let usuarios = []

    const retorno = await api.get('https://localhost:5021/api/usuarios');

    usuarios = retorno.data;
    console.log(usuarios);
}