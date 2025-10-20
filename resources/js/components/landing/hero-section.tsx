import { TerminalCard } from '@/components/terminal-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { show as docsRoute } from '@/routes/docs';
import { Link } from '@inertiajs/react';
import { Clock, Package, Rocket, ShieldCheck, Wrench, Zap } from 'lucide-react';

export function HeroSection() {
    return (
        <section className="relative z-10">
            <div className="mx-auto max-w-7xl px-6 py-12 lg:py-20 lg:px-8">
                <Badge variant="secondary" className="inline-flex items-center gap-2">
                    <Rocket className="h-3.5 w-3.5" />
                    Free Full-Stack Modules — Available Now!
                </Badge>
                <div className="mt-5 grid gap-10 md:grid-cols-2 md:gap-16">
                    <div>
                        <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-6xl">Ship Faster With Full Stack Modules</h1>

                        <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground">
                            Modern shadcn/ui interfaces wired seamlessly to Laravel backends. Install via the shadcn CLI for instant integration and
                            full customization.
                        </p>

                        <div className="mt-8 flex flex-wrap items-center gap-3">
                            <Button asChild size="lg" className="inline-flex items-center gap-2">
                                <Link href={docsRoute('upload')}>
                                    <Package className="h-4 w-4" />
                                    Browse Modules
                                </Link>
                            </Button>

                            <Button asChild variant="outline" size="lg" className="text-foreground">
                                <a href="#template">
                                    <Clock className="h-4 w-4" />
                                    Starter Kit — Coming Soon
                                </a>
                            </Button>
                        </div>

                        <div className="mt-8 flex items-center gap-6 text-xs text-muted-foreground">
                            <span className="inline-flex items-center gap-2">
                                <ShieldCheck className="h-4 w-4" />
                                Install with shadcn-cli
                            </span>
                            <span className="inline-flex items-center gap-2">
                                <Wrench className="h-4 w-4" />
                                100% customizable
                            </span>
                            <span className="inline-flex items-center gap-2">
                                <Zap className="h-4 w-4" />
                                Instant integration
                            </span>
                        </div>
                    </div>

                    <div className="">
                        <TerminalCard />
                    </div>
                </div>
            </div>
        </section>
    );
}
