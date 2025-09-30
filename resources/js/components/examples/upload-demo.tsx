import { FileUploadProvider, UploadLib } from '@astrify/react-s3-upload';
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
                maxFiles: 1,
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

export const UploadDemoSource = `import { FileUploadProvider } from '@astrify/react-s3-upload';
import { Dropzone } from '@/components/upload/dropzone';
import { Errors } from '@/components/upload/errors';
import { Header } from '@/components/upload/header';
import { List } from '@/components/upload/list';
import {
    createUploadSuccessFake,
    createUploadFailureFake,
    createUploadValidationErrorFake,
} from '@/lib/upload-fakes';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

// Component that composes all file upload components
function FileUploadSystem({ uploadLib = createUploadSuccessFake(), title, description }: {
    uploadLib?: any;
    title: string;
    description: string;
}) {
    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
                <FileUploadProvider
                    config={{
                        maxFiles: 10,
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
            </CardContent>
        </Card>
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
}`;
