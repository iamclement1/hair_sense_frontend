
import LandingPage from "@/My-pages/LandingPage";
import { BackToTop } from "@/components/Common";
import { Layout } from "@/components/layouts";


export default function Home() {
    return (
        <Layout title="Hair Sense">
            <LandingPage />
            <BackToTop />
        </Layout>
    );
}
