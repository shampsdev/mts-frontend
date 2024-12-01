import { Sheet, SheetClose, SheetContent } from '@/components/ui/sheet';
import { useSelectedStore } from '@/shared/store/selected.store';
import { Cross2Icon } from '@radix-ui/react-icons';

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
          </div>
        </div>
        <div className='flex flex-col h-full w-full'>
          <div className='relative p-5 w-full h-full rounded-l-xl border'>
            <SheetClose className='absolute right-5 top-5'>
              <Cross2Icon className='h-5 w-5' />
            </SheetClose>
            <div className='text-2xl font-medium'>
              {selected?.surname} {selected?.name} {selected?.middle_name_rus}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
