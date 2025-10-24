import { JsonCombobox } from '@/components/astrify/json-combobox';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'JSON Combobox Example',
        href: '/json-combobox-example',
    },
];

export default function JsonComboboxExample() {
    const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="JSON Combobox Example" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div>
                    <h1 className="text-xl font-bold">JSON Combobox Example</h1>
                    <p className="mb-4 text-sm">
                        This combobox fetches user emails from a JSON endpoint with server-side search filtering. Type to
                        search by email using a starts-with pattern.
                    </p>
                </div>

                <div className="flex items-center gap-4">
                    <JsonCombobox
                        url="/api/users"
                        placeholder="Select email..."
                        searchPlaceholder="Search by email..."
                        valueKey="value"
                        labelKey="label"
                        onChange={setSelectedUserId}
                        className="w-[250px]"
                    />

                    {selectedUserId && (
                        <div className="rounded-lg border bg-muted/50 px-4 py-2">
                            <p className="text-sm text-muted-foreground">
                                Selected User ID: <span className="font-medium text-foreground">{selectedUserId}</span>
                            </p>
                        </div>
                    )}
                </div>

                <div className="mt-4 rounded-lg border p-4">
                    <h2 className="mb-2 text-sm font-semibold">Features:</h2>
                    <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
                        <li>Server-side email search with debounced queries (300ms)</li>
                        <li>Starts-with search pattern for better performance</li>
                        <li>Inline loading spinner during searches</li>
                        <li>No flickering - previous results stay visible while loading</li>
                        <li>Error handling with visual feedback</li>
                        <li>Single-select functionality with user ID as value</li>
                        <li>Clean, simple email-only display</li>
                    </ul>
                </div>

                <div className="mt-4 rounded-lg border bg-blue-500/10 p-4">
                    <h2 className="mb-2 text-sm font-semibold">Try it out:</h2>
                    <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
                        <li>Type an email to see users whose email starts with your input</li>
                        <li>Try typing "alice" to match "alice@example.com"</li>
                        <li>Notice the inline spinner appears on the right of the search input</li>
                        <li>Notice the 300ms debounce - it waits for you to stop typing</li>
                        <li>The search uses a starts-with pattern (`search%`), not contains (`%search%`)</li>
                    </ul>
                </div>
            </div>
        </AppLayout>
    );
}
