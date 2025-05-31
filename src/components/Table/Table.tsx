import type { FC, ReactElement, ReactNode } from 'react';

import styles from './Table.module.scss';

interface ITableProps {
    data: string[][]
}


export const Table: FC<ITableProps> = ({ data }): ReactElement => {
    return (
        <table className={styles['table']}>
            <thead className={styles['head']}>
                <tr className={styles['headRow']}>
                    {data[0]?.map((header, index) => (
                        <th className={styles['headBox']} key={index}>{header}</th>
                    ))}
                </tr>
            </thead>
            <tbody className={styles['body']}>
                {data.slice(1).map((row, rowIndex) => (
                    <tr key={rowIndex} className={styles['bodyRow']}>
                        {row.map((cell, cellIndex) => (
                            <td className={styles['bodyBox']} key={cellIndex}>{cell}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

Table.displayName = 'Table';
