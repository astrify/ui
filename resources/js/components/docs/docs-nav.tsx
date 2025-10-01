import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { Link, usePage } from '@inertiajs/react';
import { show as docsRoute } from '@/routes/docs';
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

    // Sort items alphabetically by label within each category
    Object.keys(categorizedItems).forEach((category) => {
        categorizedItems[category].sort((a, b) => {
            const labelA = (a.meta.label || a.slug).toLowerCase();
            const labelB = (b.meta.label || b.slug).toLowerCase();
            return labelA.localeCompare(labelB);
        });
    });

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
                                    isActive={page.url === docsRoute(item.slug).url}
                                    tooltip={{ children: item.meta.title }}
                                >
                                    <Link href={docsRoute(item.slug)} prefetch>
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


