import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dropzone } from '@/components/astrify/upload/dropzone';
import { Errors } from '@/components/astrify/upload/errors';
import { Header } from '@/components/astrify/upload/header';
import { List } from '@/components/astrify/upload/list';
import { FileUploadProvider, useFileUpload } from '@astrify/react-s3-upload';
import { useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import type { FormEventHandler } from 'react';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Upload Example',
        href: dashboard().url,
    },
];

export default function Upload() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Upload" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <FileUploadProvider
                    config={{
                        signedUrlEndpoint: '/upload/signed-url',
                        maxFiles: 10,
                        maxSize: 10 * 1024 * 1024, // 10MB
                        accept: {
                            'image/*': ['.png', '.jpeg', '.jpg'],
                            'application/pdf': ['.pdf'],
                        },
                    }}
                >
                    <FormContent submitEndpoint={'/documents'} />
                </FileUploadProvider>
            </div>
        </AppLayout>
    )
}


type UploadForm = {
    name: string;
    uploadedFiles: Array<{
        id: string;
        name: string;
        sha256: string;
        size: number;
        type: string;
    }>;
};

function FormContent({ submitEndpoint = '/documents' }: { submitEndpoint: string }) {
    const { files, hasComplete, hasPending, hasUploading, hasErrors, removeAll } = useFileUpload();

    const { data, setData, post, processing, errors, reset, transform } = useForm<UploadForm>({
        name: '',
        uploadedFiles: [],
    });

    const submitForm: FormEventHandler = (e) => {
        e.preventDefault();

        // Extract only completed files for submission
        const completedFiles = files.filter((f) => f.status === 'complete');

        // Prepare the uploaded files data
        const uploadedFiles = completedFiles.map((f) => ({
            id: f.id,
            name: f.name,
            sha256: f.sha256,
            size: f.size,
            type: f.type,
        }));

        // Transform the form data to include uploaded files and submit
        transform((formData) => ({
            ...formData,
            uploadedFiles,
        }));

        // Submit using Inertia
        post(submitEndpoint, {
            onFinish: () => {
                // Reset the name field after successful submission
                reset('name');
                removeAll(); // Clear all files from the upload context
                console.log('Form submitted successfully');
            },
        });
    };

    // Enable submit only when all uploads are complete and form has a name
    const canSubmit = hasComplete && !hasPending && !hasUploading && !hasErrors && data.name.length > 0;

    return (
        <form onSubmit={submitForm} className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter your name"
                    required={true}
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                />
                {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
            </div>

            <div className="space-y-2">
                <Label>Attachments</Label>
                <div className="space-y-4">
                    <Dropzone />
                    <Header />
                    <Errors />
                    <List showImagePreviews={false} />
                </div>
                {errors.uploadedFiles && <p className="text-sm text-destructive">{errors.uploadedFiles}</p>}
            </div>

            <Button type="submit" disabled={!canSubmit || processing} className="w-full sm:w-auto">
                {processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                Submit with {files.filter((f) => f.status === 'complete').length} files
            </Button>
        </form>
    );
}
