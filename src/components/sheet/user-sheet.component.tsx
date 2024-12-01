import { Sheet, SheetClose, SheetContent } from '@/components/ui/sheet';
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
      <SheetContent className='flex gap-5'>
        <div className='flex flex-col h-full w-auto gap-5'>
          <div className='aspect-square overflow-hidden h-[50%] rounded-xl bg-stone-100'>
            <img
              className='h-full w-full object-cover'
              src={selected?.image ?? ''}
            />
          </div>
          <div className='p-5 w-full h-[50%] rounded-xl border'>
            <div className='text-2xl font-medium'>Контакты</div>
            <div className='flex items-center gap-2'>
              <Phone className='w-5 h-5 text-stone-500' />
              <span>{selected?.contacts.phone}</span>
            </div>
            <div className='flex items-center gap-2'>
              <Mail className='w-5 h-5 text-stone-500' />
              <span>{selected?.contacts.email}</span>
            </div>
          </div>
        </div>
        <div className='flex gap-5 flex-col h-full w-full'>
          <div className='relative p-5 w-full h-full rounded-l-xl border'>
            <SheetClose className='absolute right-5 top-5'>
              <Cross2Icon className='h-5 w-5' />
            </SheetClose>
            <div className='flex items-center gap-4'>
              <div className='text-2xl font-medium'>
                {selected?.surname} {selected?.name} {selected?.middle_name_rus}
              </div>
              <span className='text-stone-200'>|</span>
              <div className='text-stone-500 pt-1'>
                id{selected?.id}
              </div>
            </div>
            <div className='grid mt-auto grid-cols-2'>
              <div>Должность:</div>
              <div>{selected?.jobtitle}</div>
              <div>Департамент:</div>
              <div>{selected?.department}</div>
              <div>Подразделение:</div>
              <div>{selected?.division}</div>
              <div>Статус:</div>
              <div>{selected?.status}</div>
            </div>
          </div>
          <div className='p-5 w-full h-full rounded-l-xl border'>
            <div className='grid h-full grid-cols-2'>
              <div>Часы работы:</div>
              <div>{selected?.working_hour}</div>
              <div>Место работы:</div>
              <div>{selected?.workplace}</div>
              <div>О себе:</div>
              <div>
                {selected?.about}
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
