import './Table.css';
import React from 'react';

const Table = ({ title = 'Tabela', columns = [], data = [] }) => {
    return (
        <div style={{ overflowX: 'auto', width: '50rem', marginTop: '6rem' }}>
            {title && <h2 className='table-title'>{title}</h2>}
            <table>
                <thead>
                    <tr>
                        {columns.map((col, index) => (
                            <th key={index}>
                                {col.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.length === 0 ? (
                        <tr>
                            <td colSpan={columns.length} className='no-data'>
                                Nenhum dado disponível
                            </td>
                        </tr>
                    ) : (
                        data.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {columns.map((col, colIndex) => (
                                    <td key={colIndex}>
                                        {row[col.accessor] ?? '-'}
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