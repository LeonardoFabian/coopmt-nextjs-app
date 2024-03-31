import styles from './Grid.module.scss';

export function Grid(props) {

    const { cols, gap, children } = props;

    return (
        <div 
            className={styles.grid} 
            style={{
                gridTemplateColumns: `repeat(${cols}, 1fr)`,
                gap: `${gap}`
            }}
        >
            { children }
        </div>
    )
}
