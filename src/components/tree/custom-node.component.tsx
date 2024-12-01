import { memo } from 'react';
import { PersonNode } from '@/shared/interfaces/person-node.interface';
import { Handle, Position } from '@xyflow/react';

function CustomNode({ data }: { data: PersonNode }) {
  return (
    <div className='p-4 min-w-52 shadow-sm rounded-xl bg-white border-[1.51px]'>
      <div className='flex items-center'>
        <img
          className='h-12 aspect-square rounded-full overflow-hidden'
          src={
            data.image === ''
              ? 'https://thispersondoesnotexist.com/'
              : data.image
          }
        />
        <div className='mx-4 h-fit'>
          <div className='text-md font-medium'>{data.name}</div>
          <div className='text-sm text-gray-500'>{data.jobtitle}</div>
        </div>
      </div>
      <Handle
        className='border border-gray-400 w-3 h-3 bg-white'
        type='target'
        position={Position.Top}
        id='a'
      />
      <Handle
        className='border border-gray-400 w-3 h-3 bg-white'
        type='source'
        position={Position.Bottom}
        id='b'
      />
    </div>
  );
}

export default memo(CustomNode);
