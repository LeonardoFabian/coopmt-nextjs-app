import styles from './Card.module.scss';
import { Icon } from 'semantic-ui-react';

export function Card(props) {

    const { icon, title, content, ...rest } = props;
    
    return (
        <div className={styles.card}>
            <Icon name="image" />
            <h4>{title}</h4>
            <p>{content}</p>
        </div>
    )
}
