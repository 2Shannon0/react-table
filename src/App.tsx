import { useState } from 'react';
import { type ReactElement } from 'react';

import styles from './App.module.scss';
import AddIcon from './assets/images/add.svg?react';
import { Button } from './components/Button';
import { FormModal } from './components/FormModal';
import { Table } from './components/Table/Table';
import { Title } from './components/Typography';

export default function App(): ReactElement {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    return (
        <div className={styles['root']}>
            <div className={styles['container']}>
                <Button
                    onClick={handleOpenModal}
                    className={styles['addButton']}
                    startIcon={<AddIcon width={24} height={24} />}
                >
                    Добавить новую запись
                </Button>
                <div className={styles['table']}>
                    <Table />
                </div>
            </div>

            {isModalOpen && (
                <FormModal
                    onClose={handleCloseModal}
                    Header={(
                        <Title>
                            Добавление новой записи в таблицу
                        </Title>
                    )}
                />
            )}
        </div>
    );
}
