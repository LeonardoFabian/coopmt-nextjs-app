import styles from './Confirm.module.scss';
import { Confirm as ConfirmSUI } from 'semantic-ui-react';

export function Confirm(props) {

    const { ...rest } = props;

    return <ConfirmSUI className='confirm' size='mini' { ...rest } />;
}
