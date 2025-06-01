import { useInfiniteQuery } from '@tanstack/react-query';
import { type ReactElement, useEffect } from 'react';
import { FixedSizeList as List } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';

import { fetchRecords } from '../../api/tablesRecordsApi/api';
import CustomSkeleton from '../Skeleton/Skeleton';
import styles from './Table.module.scss';

const PAGE_SIZE = 1000;

export const Table = (): ReactElement => {
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
    } = useInfiniteQuery({
        queryKey: ['records'],
        queryFn: ({ pageParam = 1 }) => fetchRecords(pageParam, PAGE_SIZE),
        getNextPageParam: (lastPage, allPages) =>
            lastPage.length < PAGE_SIZE ? undefined : allPages.length + 1,
        initialPageParam: 1,
    });
    console.log('data', data, '\nfetchNextPage', fetchNextPage, '\nhasNextPage', hasNextPage, '\nisFetchingNextPage', isFetchingNextPage, '\nisLoading', isLoading);
    if (isLoading) return <CustomSkeleton height={40} count={10} width={700} />;
    const pages = data?.pages ?? [];
    const header = pages[0]?.[0] ?? [];
    const rows = pages
        .flatMap((page) => page.slice(1))
        .map((row) => {
            const filledRow = [...row];
            while (filledRow.length < header.length) {
                filledRow.push('');
            }
            return filledRow;
        });

    return (
        <div className={styles['table']}>
            <div className={styles['head']}>
                <div className={styles['headRow']}>
                    {header.map((cell, idx) => (
                        <div key={idx} className={styles['headBox']}>{cell}</div>
                    ))}
                </div>
            </div>
            <div className={styles['body']}>
                <InfiniteLoader
                    isItemLoaded={(index) => index < rows.length}
                    itemCount={hasNextPage ? rows.length + 1 : rows.length}
                    loadMoreItems={(startIndex, stopIndex) => {
                        if (hasNextPage && !isFetchingNextPage) {
                            return fetchNextPage().then(() => {});
                        }
                        return Promise.resolve();
                    }}
                >
                    {({ onItemsRendered, ref }) => (
                        <List
                            height={600}
                            itemCount={hasNextPage ? rows.length + 1 : rows.length}
                            itemSize={50}
                            width="100%"
                            onItemsRendered={onItemsRendered}
                            ref={ref}
                        >
                            {({ index, style }) =>
                                index < rows.length ? (
                                    <div style={style} className={styles['bodyRow']}>
                                        {rows[index].map((cell, cellIdx) => (
                                            <div key={cellIdx} className={styles['bodyBox']}>{cell}</div>
                                        ))}
                                    </div>
                                ) : (
                                    <div style={style} className={styles['bodyRow']}>
                                        <div className={styles['bodyBox']}>Загрузка...</div>
                                    </div>
                                )
                            }
                        </List>
                    )}
                </InfiniteLoader>
            </div>
        </div>
    );
};

Table.displayName = 'Table';
