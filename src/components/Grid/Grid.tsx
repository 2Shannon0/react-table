import clsx from 'clsx';
import { type CSSProperties, type FC, type ReactNode } from 'react';

import styles from './Grid.module.scss';

interface IProps {
    container?: boolean
    item?: boolean
    fill?: boolean
    spacing?: string
    columnSpacing?: string
    xs?: number
    md?: number
    lg?: number
    children: ReactNode
}

/**
 * Компонент для создания сетки, которая может использоваться как контейнер или элемент внутри контейнера.
 * Поддерживает настройки для промежутков, колонок и адаптивных размеров.
 *
 * @component
 * @example
 * <Grid container spacing="1.6rem">
 *   <Grid item xs={12} md={6}>Контент</Grid>
 * </Grid>
 *
 * @param {Object} props - Свойства компонента.
 * @param {boolean} [props.container] - Указывает, что компонент является контейнером для сетки.
 * @param {boolean} [props.item] - Указывает, что компонент является элементом внутри сетки.
 * @param {boolean} [props.fill] - Заполняет всю строку, если нет соседнего элемента в сетке.
 * @param {string} [props.spacing] - Промежуток между элементами сетки.
 * @param {string} [props.columnSpacing] - Промежуток между колонками в сетке (если не задан, используется значение `spacing`).
 * @param {number} [props.xs] - Размер элемента для маленьких экранов (от 0 до 12).
 * @param {number} [props.md] - Размер элемента для средних экранов (от 0 до 12).
 * @param {number} [props.lg] - Размер элемента для больших экранов (от 0 до 12).
 * @param {ReactNode} props.children - Дочерние элементы, которые будут отображаться в сетке.
 *
 * @returns {React.Element|null} Возвращает контейнер или элемент сетки, в зависимости от переданных пропсов.
 */
export const Grid: FC<IProps> = ({
    container,
    item,
    fill,
    spacing,
    columnSpacing = spacing,
    xs,
    md,
    lg,
    children,
}): ReactNode => {
    const style = {
        '--spacing': spacing,
        '--column-spacing': columnSpacing,
    } as CSSProperties;

    if (container) {
        return (
            <div className={styles.gridContainer} style={style} data-testid="container">
                {children}
            </div>
        );
    }

    if (item) {
        return (
            <div
                className={clsx(styles.gridItem, { [styles['gridItem_fill']]: fill })}
                data-xs={xs}
                data-md={md}
                data-lg={lg}
            >
                {children}
            </div>
        );
    }

    return null;
};

Grid.displayName = 'Grid';
