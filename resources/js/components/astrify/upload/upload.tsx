import type { FileUploadConfig } from "@astrify/react-s3-upload";
import { FileUploadProvider } from "@astrify/react-s3-upload";
import { Dropzone } from "@/components/astrify/upload/dropzone";
import { Errors } from "@/components/astrify/upload/errors";
import { Header } from "@/components/astrify/upload/header";
import { List } from "@/components/astrify/upload/list";

interface UploadProps {
	config?: Partial<FileUploadConfig>;
	className?: string;
}

export function Upload({
	config = {
		signedUrlEndpoint: "/upload/signed-url",
		maxFiles: 10,
		maxSize: 10 * 1024 * 1024, // 10MB
		accept: {
			"application/pdf": [".pdf"],
			"image/*": [".png", ".jpeg", ".jpg"],
		},
	},
	className,
}: UploadProps) {
	return (
		<FileUploadProvider config={config}>
			<div className={`space-y-4 ${className || ""}`}>
				<Dropzone />
				<Header />
				<List />
				<Errors />
			</div>
		</FileUploadProvider>
	);
}
