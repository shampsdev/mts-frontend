import { useCommandStore } from '@/shared/store/command.store';
import { Search, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
  const { setOpen } = useCommandStore();
  const navigate = useNavigate();

  return (
    <div className='h-14 fixed z-[1000] bg-white w-full flex items-center justify-between px-5 gap-5'>
      <div onClick={() => navigate('/')} className='gap-5 flex cursor-pointer'>
        <span className='font-medium'>ООО "Maslyata"</span>
        <span className='text-gray-500'>/</span>
        <span>Персоналии</span>
      </div>
      <div className='flex gap-2'>
        <div
          onClick={() => navigate('/find')}
          className='rounded-lg hover:bg-stone-100 p-1 cursor-pointer'
        >
          <Users className='p-1' />
        </div>
        <div
          onClick={() => {
            navigate('/');
            setOpen(true);
          }}
          className='rounded-lg hover:bg-stone-100 p-1 cursor-pointer'
        >
          <Search className='p-1' />
        </div>
      </div>
    </div>
  );
};
