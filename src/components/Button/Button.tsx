import clsx from 'clsx';
import React, {
    type AnchorHTMLAttributes,
    type ButtonHTMLAttributes,
    type DetailedHTMLProps,
    type PropsWithChildren,
    type ReactElement,
} from 'react';

import styles from './Button.module.scss';
import type { TButtonSize } from './types';

export interface IButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    view?: 'primary' | 'outlined' | 'flat'
    size?: TButtonSize
    endIcon?: React.ReactNode
    startIcon?: React.ReactNode
    isIconButton?: boolean
    disabled?: boolean
    isLoading?: boolean
    href?: string
    target?: AnchorHTMLAttributes<HTMLAnchorElement>['target']
}

/**
 * Универсальный компонент кнопки с поддержкой иконок, состояний загрузки и ссылок.
 *
 * @component
 * @param {Object} props - Пропсы компонента.
 * @param {React.ReactNode} props.children - Дочерние элементы кнопки (текст или другие компоненты).
 * @param {'primary' | 'outlined' | 'flat'} [props.view='primary'] - Стиль кнопки.
 * @param {TButtonSize} [props.size='m'] - Размер кнопки.
 * @param {string} [props.className] - Дополнительные CSS-классы для стилизации.
 * @param {React.ReactNode} [props.startIcon] - Иконка, отображаемая перед текстом.
 * @param {React.ReactNode} [props.endIcon] - Иконка, отображаемая после текста.
 * @param {boolean} [props.isIconButton=false] - Флаг, указывающий, является ли кнопка иконкой.
 * @param {boolean} [props.disabled] - Флаг, отключающий кнопку.
 * @param {boolean} [props.isLoading] - Флаг, указывающий, что кнопка в состоянии загрузки.
 * @param {string} [props.href] - URL, на который ведет кнопка (превращает кнопку в ссылку).
 * @param {string} [props.target] - Атрибут target для ссылки (например, '_blank').
 * @param {ButtonHTMLAttributes<HTMLButtonElement>} [props...properties] - Дополнительные атрибуты кнопки.
 * @returns {ReactElement} Возвращает JSX элемент кнопки или ссылки.
 *
 * @example
 * <Button view="primary" size="l" startIcon={<Icon />} onClick={() => console.log('Clicked!')}>
 *   Нажми меня
 * </Button>
 *
 * @example
 * <Button href="/about" target="_blank" view="outlined" endIcon={<ArrowIcon />}>
 *   Перейти на страницу
 * </Button>
 */
export const Button = ({
    children,
    view = 'primary',
    size = 'm',
    className,
    startIcon,
    endIcon,
    isIconButton = false,
    disabled,
    isLoading,
    href,
    target,
    ...properties
}: PropsWithChildren<IButtonProps>): ReactElement => {
    const commonProps = {
        'className': clsx(
            !!className && className,
            styles['button'],
            {
                [styles[`button_view_${view}`]]: view,
                [styles[`button_size_${size}`]]: size,
                [styles['button_disabled']]: disabled || isLoading,
                [styles['button_mode_icon']]: isIconButton,
            },
        ),
        'aria-disabled': disabled || isLoading,
    };

    const content = (
        <>
            {isLoading && (
                <span
                    className={clsx(styles['button__loader'], styles['button__icon'], styles['button__icon_start'], {
                        [styles['button__icon_clear']]: !children && !endIcon,
                    })}
                >
                </span>
            )}
            {!isLoading && startIcon && (
                <span
                    className={clsx(styles['button__icon'], styles['button__icon_start'], {
                        [styles['button__icon_clear']]: !children && !endIcon,
                    })}
                >
                    {startIcon}
                </span>
            )}

            <span className={styles['button__children']}>
                {children}
            </span>

            {endIcon && (
                <span
                    className={clsx(styles['button__icon'], styles['button__icon_end'], {
                        [styles['button__icon_clear']]: !children && !startIcon,
                    })}
                >
                    {endIcon}
                </span>
            )}
        </>
    );

    if (href) {
        return (
            <a
                href={href}
                {...commonProps}
                target={target}
                {...(properties as DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>)}
            >
                {content}
            </a>
        );
    }

    return (
        <button
            {...properties}
            disabled={disabled || isLoading}
            {...commonProps}
        >
            {content}
        </button>
    );
};
