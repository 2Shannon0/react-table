import { useQuery } from '@tanstack/react-query';
import type { FC, ReactElement, ReactNode } from 'react';

import { fetchRecords } from '../../api/tablesRecordsApi/api';
import CustomSkeleton from '../Skeleton/Skeleton';
import styles from './Table.module.scss';

// interface ITableProps {}

export const Table = (): ReactElement => {
    const { data, isLoading } = useQuery({
        queryKey: ['records', 1],
        queryFn: () => fetchRecords(1, 100),
    });
    if (isLoading) return (
        <CustomSkeleton height={40} count={10} width={700} />
    );
    return (
        <table className={styles['table']}>
            <thead className={styles['head']}>
                <tr className={styles['headRow']}>
                    {data![0]?.map((header, index) => (
                        <th className={styles['headBox']} key={index}>{header}</th>
                    ))}
                </tr>
            </thead>
            <tbody className={styles['body']}>
                {data!.slice(1).map((row, rowIndex) => (
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
