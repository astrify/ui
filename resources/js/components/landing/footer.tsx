import { show as docsRoute } from '@/routes/docs';
import { Link } from '@inertiajs/react';

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative z-10 border-t py-10">
            <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 text-center sm:flex-row sm:text-left lg:px-8">
                <p className="text-sm text-muted-foreground">© {currentYear} Astrify UI. All rights reserved.</p>
                <div className="flex items-center gap-4 text-sm">
                    <Link href={docsRoute('upload')} className="text-muted-foreground hover:text-foreground">
                        Modules
                    </Link>

                    <a href="#template" className="text-muted-foreground hover:text-foreground">
                        Template
                    </a>
                    <a
                        href="https://x.com/benbjurstrom"
                        target="_blank"
                        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground"
                    >
                        <svg className="h-4 w-4" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
                        </svg>
                    </a>
                </div>
            </div>
        </footer>
    );
}
