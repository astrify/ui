'use client';

import { Button } from '@/components/ui/button';
import { Asterisk, Github, Moon, Package, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';
import AppLogoIcon from '@/components/app-logo-icon';
import { Link } from '@inertiajs/react';
import { show as modulesRoute } from '@/routes/modules';

export function Header() {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem('theme');
        const isDarkMode = stored === 'dark';
        setIsDark(isDarkMode);
        document.documentElement.classList.toggle('dark', isDarkMode);
    }, []);

    const toggleTheme = () => {
        const newTheme = !isDark;
        setIsDark(newTheme);
        document.documentElement.classList.toggle('dark', newTheme);
        localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    };

    return (
        <header className="relative z-10">
            <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
                <a href="#" className="inline-flex items-center gap-2">
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
                        <AppLogoIcon className="size-5" />
                    </span>
                    <span className="text-[17px] font-semibold tracking-tight text-foreground">Astrify UI</span>
                </a>

                <div className="hidden items-center gap-8 md:flex">
                    <Link href={modulesRoute('upload')} className="text-sm font-medium text-muted-foreground hover:text-foreground">
                        Modules
                    </Link>

                    <a href="#template" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                        Template
                    </a>
                    <a
                        target="_blank"
                        href="https://github.com/astrify/ui"
                        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
                    >
                        <Github className="h-4 w-4" />
                        GitHub
                    </a>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={toggleTheme}
                        className="inline-flex items-center gap-2 bg-transparent dark:text-zinc-50"
                    >
                        {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                    </Button>
                </div>
            </nav>
        </header>
    );
}
