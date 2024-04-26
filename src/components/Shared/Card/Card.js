import styles from './Card.module.scss';
import { Icon } from 'semantic-ui-react';

export function Card(props) {

    const { icon, title, content, ...rest } = props;

    const hasDescription = Boolean(content);
    
    return (
        <div className={styles.card}>
            <Icon name={icon || "image"} />
            <h5 className={styles.title}>{title}</h5>
            {hasDescription && <p className={styles.description}>{content}</p>}
        </div>
    )
}
