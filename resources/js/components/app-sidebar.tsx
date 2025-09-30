import { DocsNav } from '@/components/docs/docs-nav';
import { NavFooter } from '@/components/nav-footer';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem, type SharedData, type DocsManifest } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { BookOpen, Folder, Github, GithubIcon, LayoutGrid } from 'lucide-react';
import AppLogo from './app-logo';

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/astrify/ui',
        icon: Github,
    },
];

interface AppSidebarProps {
    docsManifest?: DocsManifest;
}

export function AppSidebar({ docsManifest }: AppSidebarProps = {}) {
    const { auth } = usePage<SharedData>().props;

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                {docsManifest && <DocsNav manifest={docsManifest} />}
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                {auth.user && <NavUser />}
            </SidebarFooter>
        </Sidebar>
    );
}
