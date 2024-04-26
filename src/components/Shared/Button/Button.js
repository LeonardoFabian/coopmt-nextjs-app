import styles from './Button.module.scss';
import { Button as ButtonUI, Icon } from "semantic-ui-react"

export function Button(props) {

    const { onClick, icon, label, btnClass, type, className, children } = props;

    switch (btnClass) {
        case 'icon':
            return (
                <ButtonUI onClick={onClick} className={className}>
                    <Icon name={icon} />
                </ButtonUI>
                
            );
            break;
        case 'primary':
            return (
                <ButtonUI primary onClick={onClick} className={className}>
                    {icon ? <Icon name={icon} /> : null}
                    { label }
                    { children }
                </ButtonUI>
            );
            break;
        case 'secondary':
            return (
                <ButtonUI secondary onClick={onClick} className={className}>
                    {icon ? <Icon name={icon} /> : null}
                    { label }
                    { children }
                </ButtonUI>
            );
            break;
        default:
            return (
                <ButtonUI onClick={onClick} className={className}>
                    {icon ? <Icon name={icon} /> : null}
                    { label }
                    { children }
                </ButtonUI>
            );
            break;
    }    
}
