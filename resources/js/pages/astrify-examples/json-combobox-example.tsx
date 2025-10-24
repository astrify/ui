import { JsonCombobox } from '@/components/astrify/json-combobox';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import type { FormEventHandler } from 'react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'JSON Combobox Example',
        href: '/json-combobox-example',
    },
];

type ComboboxForm = {
    task_name: string;
    assigned_to: string | null;
};

interface JsonComboboxExampleProps {
    defaultUserId?: string | null;
    defaultUserEmail?: string | null;
}

export default function JsonComboboxExample({ defaultUserId, defaultUserEmail }: JsonComboboxExampleProps) {
    const { data, setData, post, processing, errors, reset } = useForm<ComboboxForm>({
        task_name: '',
        assigned_to: defaultUserId ?? null,
    });

    const submitForm: FormEventHandler = (e) => {
        e.preventDefault();

        post('/json-combobox-example', {
            onSuccess: () => {
                reset('task_name');
                toast.success('Task assigned successfully', {
                    richColors: true,
                });
            },
        });
    };

    const canSubmit = data.task_name.length > 0 && data.assigned_to !== null;

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

                <form onSubmit={submitForm} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="task_name">Task Name</Label>
                        <Input
                            type="text"
                            id="task_name"
                            name="task_name"
                            placeholder="Enter task name"
                            required={true}
                            value={data.task_name}
                            onChange={(e) => setData('task_name', e.target.value)}
                        />
                        {errors.task_name && <p className="text-sm text-destructive">{errors.task_name}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="assigned_to">Assign To</Label>
                        <JsonCombobox
                            url="/api/users"
                            placeholder="Select email..."
                            searchPlaceholder="Search by email..."
                            valueKey="value"
                            labelKey="label"
                            defaultValue={data.assigned_to || undefined}
                            defaultLabel={defaultUserEmail || undefined}
                            onChange={(value) => setData('assigned_to', value)}
                            className="w-[250px]"
                        />
                        {errors.assigned_to && <p className="text-sm text-destructive">{errors.assigned_to}</p>}
                    </div>

                    <Button type="submit" disabled={!canSubmit || processing} className="w-full sm:w-auto">
                        {processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                        Assign Task
                    </Button>
                </form>
            </div>
        </AppLayout>
    );
}
