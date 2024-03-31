import styles from './FeaturedServices.module.scss';
import { Container } from 'semantic-ui-react';
import { useState, useEffect } from 'react';
import { Service } from '@/api';
import { Grid, Card } from '@/components/Shared';
import { map } from 'lodash';

const serviceController = new Service();

export function FeaturedServices() {

    const [featuredServices, setFeaturedServices] = useState(null);

    useEffect(() => {
        ( async () => {
            try {
                const response = await serviceController.find();
                console.log("FEATURED SERVICES: ", response);
                setFeaturedServices(response.data);
            } catch (error) {
                console.error(error);
            }
        })()
    }, []);

    return (
        <Container fluid className={styles.featuredServices}>
            <Container isContainer className={styles.wrapper}>
                <h2>Servicios destacados</h2>

                <div className={styles.content}>
                    <Grid cols="3" gap="30px">
                        {map(featuredServices, (featuredService) => (
                            <Card title={featuredService.attributes.title} />
                        ))}
                    </Grid>
                </div>
            </Container>
        </Container>
    )
}
