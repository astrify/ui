import { HeroSection } from '@/components/landing/hero-section';
import { ModulesSection } from '@/components/landing/modules-section';
import { TemplateSection } from '@/components/landing/template-section';
import HomeLayout from '@/layouts/home-layout';
import { Head } from '@inertiajs/react';

export default function Welcome() {
    return (
        <HomeLayout>
            <Head title="Welcome" />
            <HeroSection />

            <ModulesSection />

            <TemplateSection />
        </HomeLayout>
    );
}
