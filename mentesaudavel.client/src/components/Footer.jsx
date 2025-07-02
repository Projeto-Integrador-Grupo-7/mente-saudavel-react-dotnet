import React from 'react';

const Footer = () => {
    return (
        <footer style={{
            background: '#f5f5f5',
            padding: '1rem',
            textAlign: 'center',
            borderTop: '1px solid #e0e0e0'
        }}>
            <p>&copy; Mente Saudável - {new Date().getFullYear()}</p>
        </footer>
    );
};

export default Footer;