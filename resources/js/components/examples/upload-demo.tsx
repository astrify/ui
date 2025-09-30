import { FileUploadProvider, UploadLib, useFileUpload } from '@astrify/react-s3-upload';
import { Dropzone } from '@/components/astrify/upload/dropzone';
import { Errors } from '@/components/astrify/upload/errors';
import { Header } from '@/components/astrify/upload/header';
import { List } from '@/components/astrify/upload/list';
import {
    createUploadSuccessFake,
} from '@/lib/upload-fakes';

// Component that composes all file upload components
function FileUploadSystem({ uploadLib = createUploadSuccessFake() }: {
    uploadLib?: UploadLib;
    title: string;
    description: string;
}) {
    return (
        <FileUploadProvider
            config={{
                maxFiles: 2,
                maxSize: 50 * 1024 * 1024, // 50MB
                signedUrlEndpoint: "/upload/signed-url",
                uploadLib,
            }}
        >
            <div className="space-y-4">
                <Dropzone />
                <Errors />
                <Header />
                <List />
            </div>
        </FileUploadProvider>
    );
}

export function UploadDemo() {
    return (
        <div className="grid w-full max-w-4xl items-start gap-6">
            <FileUploadSystem
                uploadLib={createUploadSuccessFake()}
                title="Successful Upload"
                description="This upload component will simulate successful file uploads with progress indicators."
            />
        </div>
    );
}

// Component for single image upload with preview
function ImageUploadSystem({ uploadLib = createUploadSuccessFake() }: {
    uploadLib?: UploadLib;
}) {
    return (
        <FileUploadProvider
            config={{
                maxFiles: 1,
                maxSize: 10 * 1024 * 1024, // 10MB
                signedUrlEndpoint: "/upload/signed-url",
                uploadLib,
                accept: {
                    "image/*": [".png", ".jpeg", ".jpg", ".gif", ".webp"]
                }
            }}
        >
            <ImageUploadContent />
        </FileUploadProvider>
    );
}

function ImageUploadContent() {
    const { files } = useFileUpload();
    const hasFile = files.length > 0;

    return (
        <div className="space-y-4">
            {!hasFile && <Dropzone />}
            <Errors />
            <List showImagePreviews={true} />
        </div>
    );
}

export function ImageUploadDemo() {
    return (
        <div className="w-full max-w-md">
            <ImageUploadSystem
                uploadLib={createUploadSuccessFake()}
            />
        </div>
    );
}

export const UploadDemoSource = `import { FileUploadProvider } from '@astrify/react-s3-upload';
import { Dropzone } from '@/components/astrify/upload/dropzone';
import { Errors } from '@/components/astrify/upload/errors';
import { Header } from '@/components/astrify/upload/header';
import { List } from '@/components/astrify/upload/list';

export function UploadDemo() {
    return (
        <div className="w-full max-w-4xl">
            <FileUploadProvider
                config={{
                    maxFiles: 10,
                    maxSize: 50 * 1024 * 1024, // 50MB
                    signedUrlEndpoint: "/upload/signed-url",
                }}
            >
                <div className="space-y-4">
                    <Dropzone />
                    <Errors />
                    <Header />
                    <List />
                </div>
            </FileUploadProvider>
        </div>
    );
}`;

export const ImageUploadDemoSource = `import { FileUploadProvider, useFileUpload } from '@astrify/react-s3-upload';
import { Dropzone } from '@/components/astrify/upload/dropzone';
import { Errors } from '@/components/astrify/upload/errors';
import { List } from '@/components/astrify/upload/list';

function ImageUploadContent() {
    const { files } = useFileUpload();
    const hasFile = files.length > 0;

    return (
        <div className="space-y-4">
            {!hasFile && <Dropzone />}
            <Errors />
            <List showImagePreviews={true} />
        </div>
    );
}

export function ImageUploadDemo() {
    return (
        <div className="w-full max-w-md">
            <FileUploadProvider
                config={{
                    maxFiles: 1,
                    maxSize: 10 * 1024 * 1024, // 10MB
                    signedUrlEndpoint: "/upload/signed-url",
                    accept: {
                        "image/*": [".png", ".jpeg", ".jpg", ".gif", ".webp"]
                    }
                }}
            >
                <ImageUploadContent />
            </FileUploadProvider>
        </div>
    );
}`;
