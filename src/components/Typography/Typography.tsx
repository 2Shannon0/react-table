import clsx from 'clsx';
import React, { type FC, type ReactNode } from 'react';

import styles from './Typography.module.scss';

export type Color =
  | 'text-dark-header'
  | 'text-dark-normal'
  | 'text-dark-caption'
  | 'text-light-header'
  | 'text-light-normal'
  | 'text-light-caption'
  | 'danger'
  | 'success'
  | 'special';

interface ITitleProps {
    tag?: 'h1' | 'h2' | 'h3' | 'h4'
    color?: Color
    size?: 'header-l' | 'header-m' | 'header-s'
    children: ReactNode
    className?: string
}

/**
 * Компонент блока с заголовком.
 *
 * Используется для отображения заголовков с различными стилями и цветами.
 *
 * @component
 * @example
 * <Title tag="h1" color="text-dark-header" size="header-l">Заголовок</Title>
 *
 * @param {string} [props.tag='h2'] - HTML тег, который будет использоваться для заголовка. По умолчанию 'h2'.
 * @param {Color} [props.color='text-dark-header'] - Цвет текста заголовка. Возможные значения: 'text-dark-header', 'text-light-header', 'danger', 'success' и др.
 * @param {string} [props.size='header-m'] - Размер заголовка. Возможные значения: 'header-l', 'header-m', 'header-s'.
 * @param {ReactNode} props.children - Содержимое заголовка.
 * @param {string} [props.className] - Дополнительные классы для стилизации.
 *
 * @returns {ReactElement} Заголовок с заданными стилями.
 */
export const Title: FC<ITitleProps> = ({
    tag: Tag = 'h2',
    color = 'text-dark-header',
    size = 'header-m',
    className,
    children,
}): ReactNode => {
    return (
        <Tag
            className={clsx(styles['text'], { [styles[`text_${size}`]]: size }, { [styles[`text_${color}`]]: color }, !!className && className)}
        >
            {children}
        </Tag>
    );
};

interface ITextProps extends React.HTMLAttributes<HTMLDivElement> {
    color?: Color
    size?: 'header-l' | 'header-m' | 'header-s' | 'body-xs' | 'body-s' | 'body-m'
    children: ReactNode
    className?: string
}

/**
 * Компонент блока с текстом.
 *
 * Используется для отображения обычного текста с возможностью изменения его цвета и размера.
 *
 * @component
 * @example
 * <Text color="text-light-normal" size="body-s">Текстовый блок</Text>
 *
 * @param {Color} [props.color='text-dark-normal'] - Цвет текста. Возможные значения: 'text-dark-normal', 'text-light-normal', 'danger', 'success' и др.
 * @param {string} [props.size='body-m'] - Размер текста. Возможные значения: 'body-xs', 'body-s', 'body-m'.
 * @param {ReactNode} props.children - Содержимое текстового блока.
 * @param {string} [props.className] - Дополнительные классы для стилизации.
 * @param {React.HTMLAttributes<HTMLDivElement>} [props.rest] - Прочие атрибуты для див элемента.
 *
 * @returns {ReactElement} Текстовый блок с заданными стилями.
 */
export const Text: FC<ITextProps> = ({
    color = 'text-dark-normal',
    size = 'body-m',
    className,
    children,
    ...rest
}): ReactNode => {
    const style = {
        '--color': color,
    } as React.CSSProperties;

    return (
        <p
            {...rest}
            className={clsx(styles['text'], { [styles[`text_${size}`]]: size }, { [styles[`text_${color}`]]: color }, !!className && className)}
            style={style}
        >
            {children}
        </p>
    );
};

Text.displayName = 'Text';
