import { Link } from '@inertiajs/react';
import * as React from 'react';

import { Callout } from '@/components/docs/callout';
import { CodeBlockCommand } from '@/components/docs/code-block-command';
import { CodeCollapsibleWrapper } from '@/components/docs/code-collapsible-wrapper';
import { CodeTabs } from '@/components/docs/code-tabs';
import { ComponentPreview } from '@/components/docs/component-preview';
import { ComponentSource } from '@/components/docs/component-source';
import { CopyButton } from '@/components/docs/copy-button';
import { getIconForLanguageExtension } from '@/components/docs/icons';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

export const mdxComponents = {
    h1: ({ className, ...props }: React.ComponentProps<'h1'>) => (
        <h1 className={cn('font-heading mt-2 scroll-m-28 text-3xl font-bold tracking-tight', className)} {...props} />
    ),
    h2: ({ className, ...props }: React.ComponentProps<'h2'>) => {
        return (
            <h2
                id={props.children?.toString().replace(/ /g, '-').replace(/'/g, '').replace(/\?/g, '').toLowerCase()}
                className={cn(
                    'font-heading mt-12 scroll-m-28 text-2xl font-medium tracking-tight first:mt-0 lg:mt-20 [&+p]:!mt-4 *:[code]:text-2xl',
                    className,
                )}
                {...props}
            />
        );
    },
    h3: ({ className, ...props }: React.ComponentProps<'h3'>) => (
        <h3 className={cn('font-heading mt-8 scroll-m-28 text-xl font-semibold tracking-tight *:[code]:text-xl', className)} {...props} />
    ),
    h4: ({ className, ...props }: React.ComponentProps<'h4'>) => (
        <h4 className={cn('font-heading mt-8 scroll-m-28 text-lg font-medium tracking-tight', className)} {...props} />
    ),
    h5: ({ className, ...props }: React.ComponentProps<'h5'>) => (
        <h5 className={cn('mt-8 scroll-m-28 text-lg font-medium tracking-tight', className)} {...props} />
    ),
    h6: ({ className, ...props }: React.ComponentProps<'h6'>) => (
        <h6 className={cn('mt-8 scroll-m-28 text-base font-medium tracking-tight', className)} {...props} />
    ),
    // Links - use Inertia Link for internal routes, regular anchor for external
    // Special handling for anchor links inside headings (from rehype-autolink-headings)
    a: ({
        className,
        href,
        ...props
    }: Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'onClick' | 'onError' | 'onProgress' | 'onSuccess' | 'onStart' | 'onFinish'>) => {
        const isExternal = href?.startsWith('http') || href?.startsWith('//');
        const isInternal = href?.startsWith('/');
        const isHashLink = href?.startsWith('#');

        // For hash links (heading anchors), don't add underlines
        if (isHashLink) {
            return <a href={href} className={cn('text-inherit no-underline', className)} {...props} />;
        }

        if (isInternal) {
            return <Link href={href} className={cn('font-medium text-primary underline underline-offset-4', className)} {...props} />;
        }

        return (
            <a
                href={href}
                className={cn('font-medium text-primary underline underline-offset-4', className)}
                {...(isExternal && { target: '_blank', rel: 'noopener noreferrer' })}
                {...props}
            />
        );
    },
    p: ({ className, ...props }: React.ComponentProps<'p'>) => (
        <p className={cn('leading-relaxed [&:not(:first-child)]:mt-6', className)} {...props} />
    ),
    strong: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => <strong className={cn('font-medium', className)} {...props} />,
    ul: ({ className, ...props }: React.ComponentProps<'ul'>) => <ul className={cn('my-6 ml-6 list-disc', className)} {...props} />,
    ol: ({ className, ...props }: React.ComponentProps<'ol'>) => <ol className={cn('my-6 ml-6 list-decimal', className)} {...props} />,
    li: ({ className, ...props }: React.ComponentProps<'li'>) => <li className={cn('mt-2', className)} {...props} />,
    blockquote: ({ className, ...props }: React.ComponentProps<'blockquote'>) => (
        <blockquote className={cn('mt-6 border-l-2 pl-6 italic', className)} {...props} />
    ),
    img: ({ className, alt, ...props }: React.ComponentProps<'img'>) => <img className={cn('rounded-md', className)} alt={alt} {...props} />,
    hr: ({ ...props }: React.ComponentProps<'hr'>) => <hr className="my-4 md:my-8" {...props} />,
    table: ({ className, ...props }: React.ComponentProps<'table'>) => (
        <div className="my-6 w-full overflow-y-auto">
            <table className={cn('relative w-full overflow-hidden border-none text-sm', className)} {...props} />
        </div>
    ),
    tr: ({ className, ...props }: React.ComponentProps<'tr'>) => <tr className={cn('last:border-b-none m-0 border-b', className)} {...props} />,
    th: ({ className, ...props }: React.ComponentProps<'th'>) => (
        <th className={cn('px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right', className)} {...props} />
    ),
    td: ({ className, ...props }: React.ComponentProps<'td'>) => (
        <td className={cn('px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right', className)} {...props} />
    ),
    pre: ({ className, children, ...props }: React.ComponentProps<'pre'>) => {
        return (
            <pre
                className={cn(
                    'no-scrollbar min-w-0 overflow-x-auto px-4 py-3.5 outline-none has-[[data-highlighted-line]]:px-0 has-[[data-line-numbers]]:px-0 has-[[data-slot=tabs]]:p-0',
                    className,
                )}
                {...props}
            >
                {children}
            </pre>
        );
    },
    figure: ({ className, ...props }: React.ComponentProps<'figure'>) => {
        return <figure className={cn(className)} {...props} />;
    },
    figcaption: ({ className, children, ...props }: React.ComponentProps<'figcaption'>) => {
        const iconExtension =
            'data-language' in props && typeof props['data-language'] === 'string' ? getIconForLanguageExtension(props['data-language']) : null;

        return (
            <figcaption
                className={cn(
                    'flex items-center gap-2 text-code-foreground [&_svg]:size-4 [&_svg]:text-code-foreground [&_svg]:opacity-70',
                    className,
                )}
                {...props}
            >
                {iconExtension}
                {children}
            </figcaption>
        );
    },
    code: ({
        className,
        __raw__,
        __src__,
        __npm__,
        __yarn__,
        __pnpm__,
        __bun__,
        ...props
    }: React.ComponentProps<'code'> & {
        __raw__?: string;
        __src__?: string;
        __npm__?: string;
        __yarn__?: string;
        __pnpm__?: string;
        __bun__?: string;
    }) => {
        // Inline Code.
        if (typeof props.children === 'string') {
            return (
                <code
                    className={cn('relative rounded-md bg-muted px-[0.3rem] py-[0.2rem] font-mono text-[0.8rem] outline-none', className)}
                    {...props}
                />
            );
        }

        // npm command.
        const isNpmCommand = __npm__ && __yarn__ && __pnpm__ && __bun__;
        if (isNpmCommand) {
            return <CodeBlockCommand __npm__={__npm__} __yarn__={__yarn__} __pnpm__={__pnpm__} __bun__={__bun__} />;
        }

        // Default codeblock.
        return (
            <>
                {__raw__ && <CopyButton value={__raw__} src={__src__} />}
                <code {...props} />
            </>
        );
    },
    Step: ({ className, ...props }: React.ComponentProps<'h3'>) => (
        <h3 className={cn('font-heading mt-8 scroll-m-32 text-xl font-medium tracking-tight', className)} {...props} />
    ),
    Steps: ({ ...props }) => <div className="steps mb-12 [counter-reset:step] *:[h3]:first:!mt-0 [&>h3]:step" {...props} />,
    // Image: ({
    //             src,
    //             className,
    //             width,
    //             height,
    //             alt,
    //             ...props
    //         }: React.ComponentProps<"img">) => (
    //     <Image
    //         className={cn("mt-6 rounded-md border", className)}
    //         src={src || ""}
    //         width={Number(width)}
    //         height={Number(height)}
    //         alt={alt || ""}
    //         {...props}
    //     />
    // ),
    Tabs: ({ className, ...props }: React.ComponentProps<typeof Tabs>) => {
        return <Tabs className={cn('relative mt-6 w-full', className)} {...props} />;
    },
    TabsList: ({ className, ...props }: React.ComponentProps<typeof TabsList>) => (
        <TabsList className={cn('justify-start gap-4 rounded-none bg-transparent px-2 md:px-0', className)} {...props} />
    ),
    TabsTrigger: ({ className, ...props }: React.ComponentProps<typeof TabsTrigger>) => (
        <TabsTrigger
            className={cn(
                'px-0 text-base text-muted-foreground data-[state=active]:text-foreground data-[state=active]:shadow-none dark:data-[state=active]:border-transparent dark:data-[state=active]:bg-transparent',
                className,
            )}
            {...props}
        />
    ),
    TabsContent: ({ className, ...props }: React.ComponentProps<typeof TabsContent>) => (
        <TabsContent
            className={cn('relative [&_h3.font-heading]:text-base [&_h3.font-heading]:font-medium *:[figure]:first:mt-0 [&>.steps]:mt-6', className)}
            {...props}
        />
    ),
    Tab: ({ className, ...props }: React.ComponentProps<'div'>) => <div className={cn(className)} {...props} />,
    Button,
    Callout,
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
    Alert,
    AlertTitle,
    AlertDescription,
    AspectRatio,
    CodeTabs,
    ComponentPreview,
    ComponentSource,
    CodeBlockCommand,
    CodeCollapsibleWrapper,
    Link: ({ className, ...props }: React.ComponentProps<typeof Link>) => (
        <Link className={cn('font-medium underline underline-offset-4', className)} {...props} />
    ),
    LinkedCard: ({ className, ...props }: React.ComponentProps<typeof Link>) => (
        <Link
            className={cn(
                'flex w-full flex-col items-center rounded-xl bg-surface p-6 text-surface-foreground transition-colors hover:bg-surface/80 sm:p-10',
                className,
            )}
            {...props}
        />
    ),
};
