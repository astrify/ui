import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BellRing, Bot, CreditCard, Folder, LayoutDashboard, Lock, Palette, Sparkles } from 'lucide-react';

const starterKitFeatures = [
    {
        icon: Lock,
        title: 'Authentication',
        description: 'Google OAuth, magic links, and 2FA ready to go.',
    },
    {
        icon: CreditCard,
        title: 'Stripe Billing',
        description: 'Subscriptions, one‑time payments, and customer portal.',
    },
    {
        icon: Folder,
        title: 'File Management',
        description: 'Upload, store, and serve using S3‑compatible storage.',
    },
    {
        icon: Bot,
        title: 'Chat Dashboard',
        description: 'Pre‑built AI integration with customizable agent rules.',
    },
    {
        icon: LayoutDashboard,
        title: 'Admin Panel',
        description: 'User management, analytics, and system monitoring.',
    },
    {
        icon: Palette,
        title: 'Fully Themed',
        description: 'Dark mode, responsive design, and customizable components.',
    },
];

export function TemplateSection() {
    return (
        <section className="relative z-10" id="template">
            <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
                <div className="mx-auto max-w-3xl text-center">
                    <h2 className="text-3xl font-semibold tracking-tight text-foreground">The Astrify Starter Kit</h2>
                    <p className="mt-3 text-base text-muted-foreground">
                        A complete starter kit that goes beyond boilerplate. Everything you need to launch your next idea.
                    </p>
                </div>

                <Card className="relative mx-auto mt-8 max-w-5xl overflow-hidden p-6 sm:p-8 lg:p-10">
                    <div className="absolute top-0 right-0 h-16 w-16">
                        <div className="absolute top-[32px] right-[-34px] w-[170px] rotate-45 transform bg-primary py-1 text-center text-xs font-medium text-white uppercase dark:text-zinc-900">
                            Coming Soon
                        </div>
                    </div>

                    <CardContent className="p-0">
                        <div className="mx-auto max-w-2xl text-center">
                            <h3 className="text-2xl font-semibold tracking-tight text-foreground">Build and ship your app in days, not months.</h3>
                            <p className="mt-4 text-base text-muted-foreground">Launch faster with auth, billing, file management, and more.</p>
                        </div>

                        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            {starterKitFeatures.map((feature, index) => (
                                <div key={index} className="flex items-start gap-3">
                                    <div className="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-md bg-muted text-muted-foreground">
                                        <feature.icon className="h-4 w-4" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-foreground">{feature.title}</p>
                                        <p className="mt-0.5 text-xs text-muted-foreground">{feature.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <Card className="mx-auto mt-8 max-w-lg p-4 text-center">
                            <CardContent className="p-0">
                                <div className="inline-flex items-center justify-center gap-2 text-sm font-medium text-foreground">
                                    <Sparkles className="h-4 w-4" />
                                    AI Ready
                                </div>
                                <p className="mt-1 text-xs text-muted-foreground">
                                    Includes AI agent guidelines that understand your codebase so you can customize and extend with natural language.
                                </p>
                            </CardContent>
                        </Card>

                        <div id="waitlist" className="mt-8 flex justify-center">
                            <Button size="lg" className="inline-flex w-full items-center justify-center sm:w-auto">
                                <BellRing className="mr-2 h-4 w-4" />
                                Join Waitlist
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
}
