import styles from './home.module.scss';
import { RootLayout } from "@/layouts";
import { Container } from "semantic-ui-react";
import { Service } from '@/api';
import { Home } from '@/components/Home';

const serviceController = new Service();

export default function HomePage() {
    return (
        <>
            {/* SEO */}

            <RootLayout>
                <main className={styles.content}>
                    <Home.HeroSection />
                    <Home.FeaturedServices />
                    <Home.LatestPosts />
                </main>
            </RootLayout>
        </>
    )
}
