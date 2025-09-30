import { InertiaLinkProps } from '@inertiajs/react';
import { LucideIcon } from 'lucide-react';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: NonNullable<InertiaLinkProps['href']>;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface DocsTableOfContentsItem {
    title: string;
    url: string;
    depth: number;
}

export interface DocsManifestItemMeta {
    title: string;
    description?: string;
    date?: string;
    label?: string;
    tags?: string[];
    category?: string;
}

export interface DocsManifestItem {
    slug: string;
    meta: DocsManifestItemMeta;
    toc?: DocsTableOfContentsItem[] | null;
}

export type DocsManifest = DocsManifestItem[];

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}
