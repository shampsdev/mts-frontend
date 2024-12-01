import { useEffect, useState } from 'react';
import {
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandList,
  CommandItem,
} from '../ui/command';
import { Person } from '@/shared/interfaces/person.interface';
import { API_URL, colors } from '@/shared/constants';
import { useUserFlow } from '@/shared/hooks/useUserFlow';
import { Badge } from '../ui/badge';
import { useCommandStore } from '@/shared/store/command.store';
import { useSelectedStore } from '@/shared/store/selected.store';

export function CommandMenu() {
  const { open, setOpen } = useCommandStore();
  const { setSelected } = useSelectedStore();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Person[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { moveFromTo } = useUserFlow();

  const { selected } = useSelectedStore();

  const handleQueryChange = (search: string) => {
    setQuery(search);
  };

  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
      return;
    }

    const fetchResults = async () => {
      setError(null);

      try {
        const response = await fetch(
          `${API_URL}/persons/search?text=${encodeURIComponent(query)}`
        );
        const data = await response.json();
        setResults(data);
      } catch {
        setError('An error occurred while fetching the results.');
      }
    };

    fetchResults();
  }, [query]);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(true);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [setOpen]);

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput
        placeholder='ФИО, Депертамент, Должность'
        value={query}
        onValueChange={handleQueryChange}
      />
      <CommandList>
        {error && <CommandEmpty>{error}</CommandEmpty>}
        {results.length === 0 && !error && (
          <CommandEmpty>No results found.</CommandEmpty>
        )}
        {results.map((result) => {
          return (
            <CommandItem
              onSelect={() => {
                setOpen(false);
                setSelected(result);
                moveFromTo(selected?.id ?? '8', result.id);
              }}
              key={result.id}
              className='flex justify-between'
            >
              <div className='flex items-center gap-3'>
                <img className='h-5 w-5 rounded-full' src={result.image} />
                <div>
                  {result.surname} {result.name} {result.middle_name_rus}
                </div>
                <span className='text-gray-300'>|</span>
                <div className='text-gray-400'>id{result.id}</div>
                <span className='text-gray-300'>|</span>
                <div className='text-gray-400 line-clamp-1'>
                  {result.jobtitle}
                </div>
              </div>
              <div className='flex gap-5'>
                {result.division != '' && (
                  <Badge
                    style={{
                      backgroundColor: colors[result.division] ?? 'black',
                    }}
                  >
                    {result.division}
                  </Badge>
                )}
              </div>
            </CommandItem>
          );
        })}
      </CommandList>
    </CommandDialog>
  );
}
