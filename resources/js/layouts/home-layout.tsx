import { Footer } from '@/components/landing/footer';
import { Header } from '@/components/landing/header';
import React from 'react';

type Props = {
    children: React.ReactNode;
};

export default function HomeLayout({ children }: Props) {
    return (
        <div className="relative min-h-screen">
            {/* Top gradient / glow */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 -top-64 z-0 flex justify-center">
                <div className="h-[28rem] w-[56rem] rounded-full bg-gradient-to-b from-muted/70 to-transparent blur-3xl" />
            </div>

            <Header />
            {children}
            <Footer />
        </div>
    );
}
