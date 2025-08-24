import LandingPageBenefits from '@/components/landing-page/landing-page-benefits';
import LandingPageFeatures from '@/components/landing-page/landing-page-features';
import LandingPageFooter from '@/components/landing-page/landing-page-footer';
import LandingPageHero from '@/components/landing-page/landing-page-hero';
import LandingPageNavigation from '@/components/landing-page/landing-page-navigation';
import LandingPageNewsLetter from '@/components/landing-page/landing-page-newsletter';
import LandingPageTestimonials from '@/components/landing-page/landing-page-testimonials';
import { Head } from '@inertiajs/react';

export default function Welcome() {
    // const { auth } = usePage<SharedData>().props;

    // const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <div className='min-h-screen'>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>

            <LandingPageNavigation />
            <main>
                <LandingPageHero />
                <LandingPageFeatures />
                <LandingPageBenefits />
                <LandingPageTestimonials />
                <LandingPageNewsLetter />
            </main>
            <LandingPageFooter />
        </div>
    );
}
