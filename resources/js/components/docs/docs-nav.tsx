import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { Link, usePage } from '@inertiajs/react';
import { FileText } from 'lucide-react';
import { show as modulesRoute } from '@/routes/modules';
import React from 'react';

interface DocsManifestItem {
    slug: string;
    meta: {
        title: string;
        description?: string;
        date?: string;
        author?: string;
        tags?: string[];
        readingTime?: number;
    };
    toc?: Array<{
        title: string;
        url: string;
        depth: number;
    }> | null;
}

interface DocsNavProps {
    manifest: DocsManifestItem[];
}

export function DocsNav({ manifest = [] }: DocsNavProps) {
    const page = usePage();

    if (!manifest.length) {
        return null;
    }

    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarGroupLabel>Modules</SidebarGroupLabel>
            <SidebarMenu>
                {manifest.map((item) => (
                    <SidebarMenuItem key={item.slug}>
                        <SidebarMenuButton
                            asChild
                            isActive={page.url === modulesRoute(item.slug).url}
                            tooltip={{ children: item.meta.title }}
                        >
                            <Link href={modulesRoute(item.slug)} prefetch>
                                <span>{item.slug}</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
}


