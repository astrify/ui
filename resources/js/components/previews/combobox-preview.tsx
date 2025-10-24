import { Check, ChevronsUpDown } from 'lucide-react';
import { useState, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

// Mock user email data for demonstration
const users = [
    { value: '1', label: 'alice@example.com' },
    { value: '2', label: 'bob@example.com' },
    { value: '3', label: 'carol@example.com' },
    { value: '4', label: 'david@example.com' },
    { value: '5', label: 'emma@example.com' },
    { value: '6', label: 'frank@example.com' },
    { value: '7', label: 'grace@example.com' },
    { value: '8', label: 'henry@example.com' },
    { value: '9', label: 'ivy@example.com' },
    { value: '10', label: 'jack@example.com' },
    { value: '11', label: 'acooper@example.com' },
    { value: '12', label: 'emily@example.com' },
];

export function ComboboxPreview() {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    // Simulate server-side filtering with starts-with pattern
    const filteredOptions = useMemo(() => {
        if (!searchQuery) return users;
        const query = searchQuery.toLowerCase();
        return users.filter((user) => user.label.toLowerCase().startsWith(query));
    }, [searchQuery]);

    const handleSelect = (selectedValue: string) => {
        const newValue = selectedValue === value ? '' : selectedValue;
        setValue(newValue);
        setOpen(false);
    };

    const selectedOption = users.find((user) => user.value === value);

    return (
        <div className="flex w-full items-center justify-center">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button variant="outline" role="combobox" aria-expanded={open} className="w-[250px] justify-between">
                        {selectedOption ? selectedOption.label : 'Select email...'}
                        <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[250px] p-0">
                    <Command shouldFilter={false}>
                        <CommandInput
                            placeholder="Search by email..."
                            value={searchQuery}
                            onValueChange={setSearchQuery}
                            className="h-9"
                        />
                        <CommandList>
                            {filteredOptions.length === 0 && <CommandEmpty>No email found.</CommandEmpty>}
                            {filteredOptions.length > 0 && (
                                <CommandGroup>
                                    {filteredOptions.map((user) => (
                                        <CommandItem key={user.value} value={user.value} onSelect={handleSelect}>
                                            {user.label}
                                            <Check
                                                className={cn(
                                                    'ml-auto size-4',
                                                    value === user.value ? 'opacity-100' : 'opacity-0',
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
        </div>
    );
}

export const JsonComboboxPreviewSource = `import { JsonCombobox } from '@/components/astrify/json-combobox';

export function JsonComboboxExample() {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  return (
    <JsonCombobox
      url="/api/users"
      placeholder="Select email..."
      searchPlaceholder="Search by email..."
      valueKey="value"
      labelKey="label"
      onChange={setSelectedUserId}
      className="w-[250px]"
    />
  );
}`;
