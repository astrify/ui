import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { Link, usePage } from '@inertiajs/react';
import { FileText } from 'lucide-react';

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
            <SidebarGroupLabel>Documentation</SidebarGroupLabel>
            <SidebarMenu>
                {manifest.map((item) => (
                    <SidebarMenuItem key={item.slug}>
                        <SidebarMenuButton
                            asChild
                            isActive={page.url === `/docs/${item.slug}`}
                            tooltip={{ children: item.meta.title }}
                        >
                            <Link href={`/docs/${item.slug}`} prefetch>
                                <FileText />
                                <span>{item.meta.title}</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
}


