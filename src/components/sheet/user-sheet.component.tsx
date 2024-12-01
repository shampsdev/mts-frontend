import { Sheet, SheetClose, SheetContent } from '@/components/ui/sheet';
import { colors } from '@/shared/constants';
import { useSelectedStore } from '@/shared/store/selected.store';
import { Cross2Icon } from '@radix-ui/react-icons';
import { Phone, Mail } from 'lucide-react';

export function UserSheet() {
  const { selected, setSelected } = useSelectedStore();

  return (
    <Sheet
      open={selected !== null}
      onOpenChange={(open) => {
        if (!open) setSelected(null);
      }}
    >
      <SheetContent className='flex flex-col sm:flex-row gap-5 overflow-y-auto'>
        <SheetClose className='sm:hidden'>
          <Cross2Icon className='ml-auto h-5 w-5' />
        </SheetClose>
        <div className='flex flex-col h-full w-auto gap-5'>
          <div className='aspect-square overflow-hidden h-[50%] rounded-xl bg-stone-100'>
            <img
              className='h-full w-full object-cover'
              src={selected?.image ?? ''}
            />
          </div>
          <div className='flex flex-col gap-5 p-5 w-full sm:h-[50%] rounded-xl border'>
            <div className='text-2xl font-medium'>Контакты</div>
            <div className='flex items-center gap-2'>
              <div className='bg-[#EDF0FB] text-[#1846C7] rounded-lg'>
                <Phone className='w-8 h-8 p-2' />
              </div>
              <span>{selected?.contacts.phone}</span>
            </div>
            <div className='flex items-center gap-2'>
              <div className='bg-[#EDF0FB] text-[#1846C7] rounded-lg'>
                <Mail className='w-8 h-8 p-2' />
              </div>
              <span>{selected?.contacts.email}</span>
            </div>
          </div>
        </div>
        <div className='flex gap-5 flex-col h-full w-full'>
          <div className='relative p-5 w-full h-full rounded-xl sm:rounded-r-none border'>
            <SheetClose className='hidden sm:block absolute right-5 top-5'>
              <Cross2Icon className='h-5 w-5' />
            </SheetClose>
            <div className='flex items-center gap-4'>
              <div className='text-2xl font-medium'>
                {selected?.surname} {selected?.name} {selected?.middle_name_rus}
              </div>
              <span className='text-stone-200'>|</span>
              <div className='text-stone-500 pt-1'>id{selected?.id}</div>
            </div>
            <div className='grid h-full grid-cols-2 pb-2'>
              <div className='text-gray-500'>Должность:</div>
              <div>{selected?.jobtitle}</div>
              <div className='text-gray-500'>Департамент:</div>
              <div>{selected?.department}</div>
              <div className='text-gray-500'>Подразделение:</div>
              <div>
                <div
                  style={{
                    backgroundColor: `rgba(${parseInt(
                      colors[selected?.division ?? '']?.slice(1, 3),
                      16
                    )}, ${parseInt(
                      colors[selected?.division ?? '']?.slice(3, 5),
                      16
                    )}, ${parseInt(
                      colors[selected?.division ?? '']?.slice(5, 7),
                      16
                    )}, 0.2)`,
                    color: colors[selected?.division ?? ''] ?? '',
                  }}
                  className='p-2 text-sm rounded-full font-medium text-center'
                >
                  {selected?.division}
                </div>
              </div>
              <div className='text-gray-500'>Статус:</div>
              <div>{selected?.status}</div>
            </div>
          </div>
          <div className='p-5 w-full h-full rounded-xl sm:rounded-r-none border'>
            <div className='grid h-full grid-cols-2'>
              <div className='text-gray-500'>Часы работы:</div>
              <div>{selected?.working_hour}</div>
              <div className='text-gray-500'>Место работы:</div>
              <div>{selected?.workplace}</div>
              <div className='text-gray-500'>О себе:</div>
              <div>{selected?.about}</div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
