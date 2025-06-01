import { useState } from 'react';
import { type ReactElement } from 'react';

import styles from './App.module.scss';
import { Button } from './components/Button';
import { FormModal } from './components/FormModal';
import { Table } from './components/Table/Table';
// import { Table } from './components/Table/TableInf';





// interface IAppProps { }

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
                        <div>
                            Добавление нового поля
                        </div>
                    )}
                />
            )}
        </div>
    );
}
