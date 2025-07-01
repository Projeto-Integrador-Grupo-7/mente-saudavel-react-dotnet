import React from 'react';

const Table = ({ title = 'Tabela', columns = [], data = [] }) => {
    return (
        <div style={{ overflowX: 'auto' }}>
            {title && <h2 style={{ textAlign: 'center', marginBottom: '10px' }}>{title}</h2>}
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        {columns.map((col, index) => (
                            <th
                                key={index}
                                style={{
                                    border: '1px solid #ddd',
                                    padding: '8px',
                                    backgroundColor: '#f2f2f2',
                                    textAlign: 'left',
                                }}
                            >
                                {col}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.length === 0 ? (
                        <tr>
                            <td colSpan={columns.length} style={{ padding: '8px', textAlign: 'center' }}>
                                Nenhum dado disponível
                            </td>
                        </tr>
                    ) : (
                        data.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {columns.map((col, colIndex) => (
                                    <td
                                        key={colIndex}
                                        style={{
                                            border: '1px solid #ddd',
                                            padding: '8px',
                                        }}
                                    >
                                        {row[col] ?? '-'}
                                    </td>
                                ))}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Table;