import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { Link, usePage } from '@inertiajs/react';
import { show as modulesRoute } from '@/routes/modules';
import { type DocsManifest } from '@/types';
import React from 'react';

interface DocsNavProps {
    manifest: DocsManifest;
}

export function DocsNav({ manifest = [] }: DocsNavProps) {
    const page = usePage();

    // Filter out items without category and group by category
    const categorizedItems = manifest
        .filter((item) => item.meta.category)
        .reduce((acc, item) => {
            const category = item.meta.category!;
            if (!acc[category]) {
                acc[category] = [];
            }
            acc[category].push(item);
            return acc;
        }, {} as Record<string, typeof manifest>);

    const categories = Object.keys(categorizedItems);

    if (!categories.length) {
        return null;
    }

    return (
        <>
            {categories.map((category) => (
                <SidebarGroup key={category} className="px-2 py-0">
                    <SidebarGroupLabel>{category}</SidebarGroupLabel>
                    <SidebarMenu>
                        {categorizedItems[category].map((item) => (
                            <SidebarMenuItem key={item.slug}>
                                <SidebarMenuButton
                                    asChild
                                    isActive={page.url === modulesRoute(item.slug).url}
                                    tooltip={{ children: item.meta.title }}
                                >
                                    <Link href={modulesRoute(item.slug)} prefetch>
                                        <span>{item.meta.label || item.slug}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
            ))}
        </>
    );
}


