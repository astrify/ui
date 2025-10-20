import { ComponentPreviewTabs } from '@/components/docs/component-preview-tabs';
import { ComponentSource } from '@/components/docs/component-source';

export function ComponentPreview({
    component,
    code,
    title,
    className,
    align = 'center',
    hideCode = false,
    ...props
}: React.ComponentProps<'div'> & {
    component: React.ReactNode;
    code: string;
    title?: string;
    language?: string;
    align?: 'center' | 'start' | 'end';
    description?: string;
    hideCode?: boolean;
    type?: 'block' | 'component' | 'example';
}) {
    return (
        <ComponentPreviewTabs
            className={className}
            align={align}
            hideCode={hideCode}
            component={component}
            source={<ComponentSource code={code} title={title} collapsible={false} />}
            {...props}
        />
    );
}
