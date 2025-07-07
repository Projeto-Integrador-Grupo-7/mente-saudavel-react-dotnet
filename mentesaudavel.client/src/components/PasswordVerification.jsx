import React, { useState, useEffect } from "react";
import Input from './Input';

function PasswordVerification({ confirmation = false, onPasswordChange }) {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [validPassword, setValidPassword] = useState(false);
    const [passwordsMatch, setPasswordsMatch] = useState(true);

    useEffect(() => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        const isValid = confirmation ? regex.test(password) : password.length > 0;
        setValidPassword(isValid);

        if (confirmation) {
            setPasswordsMatch(password === confirmPassword);
        } else {
            setPasswordsMatch(true);
        }

        if (onPasswordChange) {
            onPasswordChange(
                password,
                isValid && (!confirmation || password === confirmPassword)
            );
        }
    }, [password, confirmPassword, confirmation, onPasswordChange]);

    return (
        <>
            <Input
                placeholder="senha"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            {confirmation && !validPassword && password.length > 0 && (
                <div className="password-tooltip">
                    A senha deve ter pelo menos 8 caracteres, incluindo maiúscula, minúscula, número e caractere especial.
                </div>
            )}
            {confirmation && (
                <>
                    <Input
                        placeholder="confirme a senha"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    {confirmPassword.length > 0 && !passwordsMatch && (
                        <div className="password-tooltip">As senhas não coincidem.</div>
                    )}
                </>
            )}
        </>
    );
}

export default PasswordVerification;