import * as React from 'react';

import { Tabs } from '@/components/ui/tabs';

export function CodeTabs({ children, defaultValue = 'cli', ...props }: React.ComponentProps<typeof Tabs>) {
    const [value, setValue] = React.useState(defaultValue);

    return (
        <Tabs value={value} onValueChange={setValue} className="relative mt-6 w-full" {...props}>
            {children}
        </Tabs>
    );
}
