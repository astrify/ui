import * as React from 'react';

import { CodeCollapsibleWrapper } from '@/components/docs/code-collapsible-wrapper';
import { CopyButton } from '@/components/docs/copy-button';
import { getIconForLanguageExtension } from '@/components/docs/icons';
import { highlightCode } from '@/lib/highlight-code';
import { cn } from '@/lib/utils';

export function ComponentSource({
    code,
    title,
    language = 'tsx',
    collapsible = true,
    className,
}: React.ComponentProps<'div'> & {
    code: string;
    title?: string;
    language?: string;
    collapsible?: boolean;
}) {
    const [highlightedCode, setHighlightedCode] = React.useState<string>('');

    React.useEffect(() => {
        const highlight = async () => {
            const highlighted = await highlightCode(code, language);
            setHighlightedCode(highlighted);
        };
        highlight();
    }, [code, language]);

    if (!code) {
        return null;
    }

    if (!collapsible) {
        return (
            <div className={cn('relative', className)}>
                <ComponentCode code={code} highlightedCode={highlightedCode} language={language} title={title} />
            </div>
        );
    }

    return (
        <CodeCollapsibleWrapper className={className}>
            <ComponentCode code={code} highlightedCode={highlightedCode} language={language} title={title} />
        </CodeCollapsibleWrapper>
    );
}

function ComponentCode({
    code,
    highlightedCode,
    language,
    title,
}: {
    code: string;
    highlightedCode: string;
    language: string;
    title: string | undefined;
}) {
    return (
        <figure data-rehype-pretty-code-figure="" className="[&>pre]:max-h-96">
            {title && (
                <figcaption
                    data-rehype-pretty-code-title=""
                    className="flex items-center gap-2 text-code-foreground [&_svg]:size-4 [&_svg]:text-code-foreground [&_svg]:opacity-70"
                    data-language={language}
                >
                    {getIconForLanguageExtension(language)}
                    {title}
                </figcaption>
            )}
            <CopyButton value={code} />
            <div dangerouslySetInnerHTML={{ __html: highlightedCode }} />
        </figure>
    );
}
