import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { show as docsRoute } from '@/routes/docs';
import { Link } from '@inertiajs/react';
import { Asterisk, Boxes, Hammer, Plus, Table, Table2, Terminal, TextCursorInput, UploadCloud } from 'lucide-react';

interface Module {
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    description: string;
    status: string;
    docSlug?: string;
}

const features = [
    {
        icon: Boxes,
        title: 'Laravel + Inertia + React',
        description: 'Not just UI components. Each module includes frontend and backend logic, all wired together and ready to use.',
    },
    {
        icon: Hammer,
        title: 'Shadcn UI',
        description: "Automatically inherits your app's theme and styling. Integrates seamlessly with your existing shadcn setup",
    },
    {
        icon: Terminal,
        title: 'Shadcn CLI',
        description: 'No dependencies to manage. The installer copies everything into your project for full customization.',
    },
];

const modules: Module[] = [
    {
        icon: UploadCloud,
        title: 'File Upload with S3',
        description: 'Signed URLs, storage, previews',
        status: 'Available Now',
        docSlug: 'upload',
    },
    {
        icon: Table,
        title: 'Paginated Tables',
        description: 'Server-side pagination',
        status: 'Available Now',
        docSlug: 'paginated-table',
    },
    {
        icon: TextCursorInput,
        title: 'Combo Box',
        description: 'Searchable select menus',
        status: 'Coming Soon',
    },
    {
        icon: Table2,
        title: 'Data Tables',
        description: 'Server-side sorting & filtering',
        status: 'Coming Soon',
    },
    // {
    //     icon: Lock,
    //     title: 'Activity Log UI',
    //     description: 'User actions history',
    //     status: 'Coming Soon',
    // },
    // {
    //     icon: Lock,
    //     title: 'OTP Login',
    //     description: 'Passwordless auth',
    //     status: 'Coming Soon',
    // },
    // {
    //     icon: FileInput,
    //     title: 'Team Management',
    //     description: 'Invites, roles, permissions',
    //     status: 'Coming Soon',
    // },
    {
        icon: Plus,
        title: 'More coming weekly…',
        description: 'Requests welcome',
        status: 'Coming Soon',
    },
];

export function ModulesSection() {
    return (
        <section className="relative z-10">
            <div className="mr-auto ml-auto max-w-7xl pt-16 pr-6 pb-16 pl-6 lg:px-8">
                <div className="relative overflow-hidden rounded-2xl bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900">
                    {/* Decorative background */}
                    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
                        <div className="absolute -top-24 -right-16 h-[28rem] w-[28rem] rounded-full bg-gradient-to-br from-white/10 to-transparent blur-3xl dark:from-neutral-900/10"></div>
                        <div className="absolute -bottom-24 -left-16 h-[24rem] w-[24rem] rounded-full bg-gradient-to-b from-white/10 to-transparent blur-3xl dark:from-neutral-900/10"></div>
                    </div>

                    <div className="relative px-6 py-10 sm:px-8 lg:px-12">
                        {/* Header */}
                        <div className="mx-auto max-w-3xl text-center">
                            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-white/80 dark:border-neutral-900/15 dark:bg-neutral-900/5 dark:text-neutral-900/80">
                                <Asterisk className="h-3.5 w-3.5" />
                                Modules Library
                            </span>
                            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">Astrify UI Modules</h2>
                            <p className="mt-3 text-base text-neutral-300 dark:text-neutral-600">
                                Production-ready features for Laravel and React. No more building backends for your UI components.
                            </p>
                        </div>

                        {/* Feature highlights (no cards) */}
                        <div className="mx-auto mt-10 grid gap-6 lg:grid-cols-3">
                            {features.map((feature, index) => (
                                <Card key={index} className="border-white/10 bg-white/5 dark:border-neutral-900/10 dark:bg-neutral-900/5">
                                    <CardContent className="px-4 py-1.5">
                                        <div className="flex items-start gap-4">
                                            <div className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-white/10 text-white dark:bg-neutral-900/10 dark:text-neutral-900">
                                                <feature.icon className="h-5 w-5" />
                                            </div>
                                            <div className="flex-1 text-left">
                                                <h3 className="text-base font-semibold tracking-tight text-white dark:text-neutral-900">
                                                    {feature.title}
                                                </h3>
                                                <p className="mt-2 text-sm text-neutral-300 dark:text-neutral-600">{feature.description}</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        {/* Available Modules: horizontal scroller */}
                        <div className="mt-12">
                            <div className="mx-auto flex max-w-5xl items-center justify-between">
                                <h3 className="text-lg font-semibold tracking-tight">Available Modules</h3>
                                <span className="text-xs text-neutral-300 dark:text-neutral-600">Swipe to explore</span>
                            </div>

                            <div className="scrollbar-hide -mx-2 mt-4 overflow-x-auto pb-2">
                                <div className="flex min-w-max gap-3 px-2">
                                    {modules.map((module, index) => {
                                        const cardContent = (
                                            <>
                                                <div className="flex items-center justify-between">
                                                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-white/10 text-white dark:bg-neutral-900/10 dark:text-neutral-900">
                                                        <module.icon className="h-4 w-4" />
                                                    </span>
                                                    <Badge
                                                        variant={module.status === 'Free' ? 'default' : 'secondary'}
                                                        className="rounded-full bg-white px-2 py-0.5 text-[10px] font-medium text-neutral-900 dark:bg-neutral-900 dark:text-white"
                                                    >
                                                        {module.status}
                                                    </Badge>
                                                </div>
                                                <div className="mt-3">
                                                    <p className="text-sm font-medium">{module.title}</p>
                                                    <p className="mt-0.5 text-xs text-neutral-300 dark:text-neutral-600">{module.description}</p>
                                                </div>
                                            </>
                                        );

                                        const cardClassName =
                                            'w-64 shrink-0 rounded-xl bg-white/5 p-4 ring-1 ring-white/10 dark:bg-neutral-900/5 dark:ring-neutral-900/10';

                                        if (module.docSlug) {
                                            return (
                                                <Link
                                                    key={index}
                                                    href={docsRoute(module.docSlug)}
                                                    className={`${cardClassName} transition-colors hover:bg-white/10 dark:hover:bg-neutral-900/10`}
                                                >
                                                    {cardContent}
                                                </Link>
                                            );
                                        }

                                        return (
                                            <div key={index} className={cardClassName}>
                                                {cardContent}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
