import { memo } from 'react';
import { PersonNode } from '@/shared/person-node.interface';
import { Handle, Position } from '@xyflow/react';

function CustomNode({ data }: { data: PersonNode }) {
    return (
        <div className="p-2 shadow-sm rounded-md bg-white border">
            <div className="flex">
                <img className="h-12 w-12 rounded-full overflow-hidden" src={data.image} />
                <div className="mx-2">
                    <div className="text-lg font-bold">{data.name}</div>
                    <div className="text-sm text-gray-500">{data.jobtitle}</div>
                </div>
            </div>
            <Handle className="opacity-0" type="target" position={Position.Top} id="a" />
            <Handle className="opacity-0" type="source" position={Position.Bottom} id="b" />
        </div>
    );
}

export default memo(CustomNode);
