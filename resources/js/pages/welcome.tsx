import { HeroSection } from '@/components/landing/hero-section';
import { ModulesSection } from '@/components/landing/modules-section';
import { TemplateSection } from '@/components/landing/template-section';
import HomeLayout from '@/layouts/home-layout';
import { Head } from '@inertiajs/react';

export default function Welcome() {
    return (
        <HomeLayout>
            <Head title="Confirm password">
                <meta inertia name="description" content="Modern shadcn/ui interfaces wired seamlessly to Laravel backends. Install via the shadcn CLI for instant integration and full customization." />
            </Head>

            <HeroSection />

            <ModulesSection />

            <TemplateSection />
        </HomeLayout>
    );
}
