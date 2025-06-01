'use client';

import clsx from 'clsx';
import { debounce } from 'perfect-debounce';
import React, { type ChangeEvent, type FC, type InputHTMLAttributes, type ReactElement, useCallback, useId, useRef, useState } from 'react';

import styles from './TextField.module.scss';

export interface IInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange' | 'id'> {
    size?: 's' | 'm'
    error?: string
    onChange?: (value: string) => void
    onBlur?: () => void
    onFocus?: () => void
    startIcon?: React.ReactNode
    endIcon?: React.ReactNode
    view?: 'default' | 'outlined'
    label?: string
    debounceDelay?: number // Новая опция задержки debounce
    onDebouncedChange?: (value: string) => void // Новая функция обработки debounce
    id?: string
    dataTestId?: string
    prefix?: string
    readOnly?: boolean
}

/**
 * Компонент для текстового поля с возможностью установки задержки для изменения значения (debounce).
 * Поддерживает различные размеры, виды, обработку ошибок и возможность добавления иконки начала.
 *
 * @component
 * @example
 * <TextField
 *   label="Введите текст"
 *   value="Текст"
 *   onChange={(value) => console.log(value)}
 *   error="Ошибка при вводе"
 *   startIcon={<SomeIcon />}
 *   debounceDelay={500}
 *   onDebouncedChange={(value) => console.log('Debounced:', value)}
 * />
 *
 * @param {Object} props - Свойства компонента.
 * @param {string} [props.size='m'] - Размер поля ввода: 's' (маленький) или 'm' (средний).
 * @param {string} [props.view='default'] - Внешний вид поля: 'default' или 'outlined'.
 * @param {string} [props.error] - Сообщение об ошибке, которое будет отображаться ниже поля.
 * @param {function} [props.onChange] - Функция, которая вызывается при изменении значения поля.
 * @param {function} [props.onDebouncedChange] - Функция, которая вызывается при изменении значения с задержкой (debounce).
 * @param {number} [props.debounceDelay=300] - Задержка (в миллисекундах) для debounce.
 * @param {function} [props.onBlur] - Функция, которая вызывается при потере фокуса.
 * @param {function} [props.onFocus] - Функция, которая вызывается при получении фокуса.
 * @param {React.ReactNode} [props.startIcon] - Иконка, отображаемая слева от поля ввода.
 * @param {string} [props.label] - Метка, которая отображается выше поля.
 * @param {string} [props.id] - Идентификатор поля ввода.
 *
 * @returns {ReactElement} Компонент текстового поля с дебаунсом и дополнительными опциями.
 */
export const TextField: FC<IInputProps> = ({
    size = 'm',
    view = 'default',
    onChange,
    className,
    value,
    error,
    startIcon,
    endIcon,
    label,
    onBlur,
    onFocus,
    debounceDelay = 300, // Значение по умолчанию для задержки debounce
    onDebouncedChange, // Функция для обработки debounce
    id,
    dataTestId,
    prefix,
    readOnly,
    ...inputProps
}): ReactElement => {
    const inputId = useId();
    const inputReference = useRef<HTMLInputElement | null>(null);
    const [isFocused, setIsFocused] = useState(false);

    // Используем debounce из lodash
    const debouncedOnChange = useCallback(
        debounce((value: string) => {
            onDebouncedChange && onDebouncedChange(value);
        }, debounceDelay as number),
        [debounceDelay],
    );

    const onInputChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            const { value } = event.target;
            onChange && onChange(value);
            debouncedOnChange(value);
        },
        [onChange, debouncedOnChange],
    );

    const handleFieldClick = (): void => {
        inputReference.current?.focus();
    };

    const handleFocus = (): void => {
        setIsFocused(true);
        onFocus && onFocus();
    };

    const handleBlur = (): void => {
        setIsFocused(false);
        onBlur && onBlur();
    };

    return (
        <div id={id} className={styles['root']} data-testid={dataTestId}>
            {label && (
                <label
                    className={styles['label']}
                    htmlFor={inputId}
                >
                    {label}
                </label>
            )}
            <div
                className={clsx(styles['field'], !!className && className, {
                    [styles[`field_size_${size}`]]: size,
                    [styles[`field_view_${view}`]]: view,
                    [styles['field_error']]: error,
                    [styles['field_fill']]: value,
                    [styles['field_focus']]: isFocused,
                })}
                onClick={handleFieldClick}
            >
                {startIcon && (
                    <span className={clsx(styles['field__icon'], styles['field__icon_start'])}>
                        {startIcon}
                    </span>
                )}
                {prefix && (
                    <span className={clsx(styles['field__prefix'],)}>
                        {prefix}
                    </span>
                )}
                <input
                    readOnly={readOnly}
                    {...inputProps}
                    id={inputId}
                    placeholder={inputProps.placeholder}
                    className={styles['field__input']}
                    onChange={onInputChange}
                    value={value}
                    ref={inputReference}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    aria-invalid={!!error}
                    aria-describedby={error ? `${inputId}-error` : undefined}
                />
                {endIcon && (
                    <span className={clsx(styles['field__icon'], styles['field__icon_end'])}>
                        {endIcon}
                    </span>
                )}
            </div>
            {error ? <span id={`${inputId}-error`} className={styles['error']}>{error}</span> : null}
        </div>
    );
};
