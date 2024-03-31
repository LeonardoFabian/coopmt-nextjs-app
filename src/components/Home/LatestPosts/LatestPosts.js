import styles from './LatestPosts.module.scss';
import { Container } from 'semantic-ui-react';
import { useState, useEffect } from 'react';
import { Post } from '@/api';
import { Grid } from '@/components/Shared';
import { map } from 'lodash';

const postController = new Post();

export function LatestPosts() {

    const [latestPost, setLatestPost] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                const limit = 3;
                const response = await postController.getLatestPublished(limit);
                console.log("LATEST POSTS: ", response);
                setLatestPost(response.data);
            } catch (error) {
                console.error(error);
            }
        })()
    }, []);

    return (
        <Container fluid className={styles.latestPosts}>
            <Container isContainer className={styles.wrapper}>
                <h2>Últimas publicaciones</h2>

                <div className={styles.content}>
                    <Grid cols="3" gap="30px">
                        {map(latestPost, (post) => (
                            <h4>{post.attributes.title}</h4>
                        ))}
                    </Grid>
                </div>
            </Container>
        </Container>
    )
}
