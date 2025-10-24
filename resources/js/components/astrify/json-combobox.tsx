import { Check, ChevronsUpDown, AlertCircle } from 'lucide-react';
import { useEffect, useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Spinner } from '@/components/ui/spinner';

interface JsonComboboxOption {
    [key: string]: any;
}

interface JsonComboboxProps {
    url: string;
    valueKey?: string;
    labelKey?: string;
    placeholder?: string;
    searchPlaceholder?: string;
    emptyText?: string;
    onChange?: (value: string | null) => void;
    defaultValue?: string | number;
    defaultLabel?: string;
    className?: string;
}

export function JsonCombobox({
    url,
    valueKey = 'value',
    labelKey = 'label',
    placeholder = 'Select option...',
    searchPlaceholder = 'Search...',
    emptyText = 'No results found.',
    onChange,
    defaultValue,
    defaultLabel,
    className,
}: JsonComboboxProps) {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState<string>(defaultValue ? String(defaultValue) : '');

    // Initialize options with default value if provided
    const initialOptions = defaultValue && defaultLabel
        ? [{ [valueKey]: String(defaultValue), [labelKey]: defaultLabel }]
        : [];

    const [options, setOptions] = useState<JsonComboboxOption[]>(initialOptions);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    const fetchData = useCallback(
        async (search: string) => {
            try {
                setLoading(true);
                const searchParams = new URLSearchParams();
                if (search) {
                    searchParams.append('search', search);
                }
                const fetchUrl = `${url}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
                const response = await fetch(fetchUrl);
                if (!response.ok) throw new Error('Failed to fetch options');
                const jsonData = await response.json();
                const newOptions = Array.isArray(jsonData) ? jsonData : [];

                // Preserve the currently selected option if it's not in the new results
                setOptions((prevOptions) => {
                    if (!value) return newOptions;

                    // Check if current value exists in new options
                    const valueExists = newOptions.some((opt) => String(opt[valueKey]) === value);

                    if (valueExists) {
                        return newOptions;
                    }

                    // If not, find it in previous options and prepend it
                    const selectedOption = prevOptions.find((opt) => String(opt[valueKey]) === value);
                    if (selectedOption) {
                        return [selectedOption, ...newOptions];
                    }

                    return newOptions;
                });

                setError(null);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
                setOptions([]);
            } finally {
                setLoading(false);
            }
        },
        [url, value, valueKey],
    );

    // Debounced search effect
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            fetchData(searchQuery);
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [searchQuery, fetchData]);

    // Initial fetch
    useEffect(() => {
        fetchData('');
    }, [fetchData]);

    const handleSelect = (selectedValue: string) => {
        const newValue = selectedValue === value ? '' : selectedValue;
        setValue(newValue);
        setOpen(false);
        onChange?.(newValue || null);
    };

    const selectedOption = options.find((option) => option[valueKey] === value);

    // Extract width class from className prop, default to w-[200px]
    const widthClass = className?.match(/w-\[[^\]]+\]|w-\d+|w-full|w-fit|w-auto/)?.[0] || 'w-[200px]';

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className={cn(widthClass, 'justify-between', className)}
                >
                    {selectedOption ? selectedOption[labelKey] : placeholder}
                    <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className={cn(widthClass, 'p-0')}>
                <Command shouldFilter={false}>
                    <div className="relative">
                        <CommandInput
                            placeholder={searchPlaceholder}
                            value={searchQuery}
                            onValueChange={setSearchQuery}
                            className="h-9"
                        />
                        {loading && (
                            <div className="absolute right-2 top-1/2 -translate-y-1/2">
                                <Spinner className="size-4 text-muted-foreground/50" />
                            </div>
                        )}
                    </div>
                    <CommandList>
                        {error && (
                            <div className="flex flex-col items-center justify-center py-6 text-center">
                                <AlertCircle className="mb-2 size-6 text-muted-foreground/50" />
                                <p className="text-xs text-muted-foreground/60">{error}</p>
                            </div>
                        )}
                        {!error && options.length === 0 && !loading && <CommandEmpty>{emptyText}</CommandEmpty>}
                        {!error && options.length > 0 && (
                            <CommandGroup>
                                {options.map((option) => (
                                    <CommandItem
                                        key={option[valueKey]}
                                        value={option[valueKey]}
                                        onSelect={handleSelect}
                                    >
                                        {option[labelKey]}
                                        <Check
                                            className={cn(
                                                'ml-auto size-4',
                                                value === option[valueKey] ? 'opacity-100' : 'opacity-0',
                                            )}
                                        />
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        )}
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
