import styles from './MenuItem.module.scss';
import { BlockRenderer } from '@/components/BlockRenderer';

export function MenuItem({ blocks }) {
    return (
        <>
            <BlockRenderer blocks={blocks} />
        </>
    )
}
