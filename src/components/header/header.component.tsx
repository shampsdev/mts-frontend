import { useCommandStore } from '@/shared/store/command.store';
import { Search } from 'lucide-react';

export const Header = () => {
  const { setOpen } = useCommandStore();

  return (
    <div className='h-14 fixed z-[1000] bg-white w-full flex items-center justify-between px-5 gap-5'>
      <div className='gap-5 flex'>
        <span className='font-medium'>ООО "Maslyata"</span>
        <span className='text-gray-500'>/</span>
        <span>Персоналии</span>
      </div>
      <div
        onClick={() => setOpen(true)}
        className='rounded-lg hover:bg-stone-100 p-1 cursor-pointer'
      >
        <Search className='p-1' />
      </div>
    </div>
  );
};
