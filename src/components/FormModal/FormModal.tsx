import { type PropsWithChildren, type ReactElement, type ReactNode, useEffect } from 'react';
import ReactModal, { type Styles } from 'react-modal';

import CrossIcon from '../../../public/images/cross.svg?react';
import { detectAppleDevice } from '../../utils/detectDevice';
import { Button } from '../Button';
import styles from './FormModal.module.scss';

// Укажите основной элемент приложения
ReactModal.setAppElement('html');

interface ModalProps {
    Header: ReactNode
    Footer?: ReactNode
    closeButtonText?: string
    submitButtonText?: string
    onClose: () => void
    onSubmit?: () => void
    submitDisabled?: boolean
    maxWidth?: string
    dataTestId?: string
}

/**
 * Компонент для отображения модального окна с кастомным хедером, футером и действиями.
 * Использует библиотеку `react-modal` для реализации функциональности модального окна.
 *
 * @component
 * @example
 * <Modal
 *   Header={<h1>Заголовок</h1>}
 *   Footer={<div>Кастомный футер</div>}
 *   closeButtonText="Закрыть"
 *   submitButtonText="Отправить"
 *   onClose={() => console.log('Закрыть')}
 *   onSubmit={() => console.log('Отправить')}
 *   maxWidth="500px"
 * >
 *   <p>Содержимое модального окна</p>
 * </Modal>
 *
 * @param {Object} props - Свойства компонента.
 * @param {ReactNode} props.Header - Кастомный хедер для модального окна.
 * @param {ReactNode} [props.Footer] - Кастомный футер для модального окна. Если не указан, используется стандартный футер.
 * @param {string} [props.closeButtonText] - Текст кнопки закрытия. Отображается в стандартном футере.
 * @param {string} [props.submitButtonText] - Текст кнопки отправки. Отображается в стандартном футере.
 * @param {() => void} props.onClose - Callback-функция, вызываемая при закрытии модального окна.
 * @param {() => void} [props.onSubmit] - Callback-функция, вызываемая при нажатии кнопки отправки.
 * @param {boolean} [props.submitDisabled=false] - Указывает, должна ли кнопка отправки быть заблокирована.
 * @param {string} [props.maxWidth='fit-content'] - Максимальная ширина модального окна.
 * @param {ReactNode} [props.children] - Содержимое модального окна.
 *
 * @returns {ReactElement} Модальное окно с возможностью кастомизации.
 */
export function FormModal({
    Header,
    Footer,
    children,
    closeButtonText,
    submitButtonText,
    onClose,
    onSubmit,
    submitDisabled = false,
    maxWidth = 'fit-content',
}: PropsWithChildren<ModalProps>): ReactElement {
    const isAppleDevice = detectAppleDevice(navigator.userAgent);
    useEffect(() => {
        // Убираем скролл при открытии модального окна
        document.documentElement.style.overflow = 'hidden';
        !isAppleDevice && (document.documentElement.style.paddingRight = '1.7rem');
        return () => {
            document.documentElement.style.overflow = '';
            !isAppleDevice && (document.documentElement.style.paddingRight = '');
        };
    }, [isAppleDevice]);

    return (
        <ReactModal
            style={{
                content: {
                    '--max-width': maxWidth,
                },
            } as Styles}
            className={styles['modal']}
            portalClassName={styles['portal']}
            overlayClassName={styles['overlay']}
            onRequestClose={onClose}
            isOpen={true}
        >
            <div className={styles['header']}>
                {Header}
                <Button
                    className={styles['header__button']}
                    view="flat"
                    onClick={onClose}
                    data-testid="cross-close-modal"
                    startIcon={<CrossIcon width={24} height={24} />}
                />
            </div>

            <div className={styles['content']}>
                {children}
            </div>

            {Footer ?? (
                <div className={styles['footer']}>
                    {submitButtonText && (
                        <Button
                            view="primary"
                            onClick={onSubmit}
                            disabled={!!submitDisabled}
                            data-testid="submit-modal"
                        >
                            {submitButtonText}
                        </Button>
                    )}
                    {closeButtonText && (
                        <Button
                            view="outlined"
                            onClick={onClose}
                            data-testid="close-modal"
                        >
                            {closeButtonText}
                        </Button>
                    )}
                </div>
            )}
        </ReactModal>
    );
}
