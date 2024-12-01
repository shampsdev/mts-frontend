import { memo, useEffect, useState } from 'react';
import { PersonNode } from '@/shared/interfaces/person-node.interface';
import {
  Handle,
  NodeProps,
  Position,
  useReactFlow,
  Node,
  Edge,
} from '@xyflow/react';
import { getPersonNodeById } from '@/shared/api/node.api';
import { getLayoutedElements } from '@/lib/tree-layout';
import { ChevronDown } from 'lucide-react';

interface CustomNodeProps extends NodeProps {
  data: PersonNode;
}

const CustomNode = ({ data }: CustomNodeProps) => {
  const { setNodes, setEdges, getNodes, getEdges } =
    useReactFlow<Node<PersonNode>>();
  const [areChildrenLoaded, setAreChildrenLoaded] = useState(false);

  useEffect(() => {
    checkChildrenLoaded(data.children, getNodes());
  }, [data.children, getNodes]);

  const checkChildrenLoaded = (
    childrenIds: string[],
    nodes: Node<PersonNode>[]
  ) => {
    const nodeIds = nodes.map((node) => node.id);
    return childrenIds.every((childId) => nodeIds.includes(childId));
  };

  const loadNodesRecursively = async (
    node: PersonNode,
    currentDepth: number,
    maxDepth: number
  ) => {
    if (currentDepth >= maxDepth) {
      return { newNodes: [], newEdges: [] };
    }

    const parentNodes = await Promise.all(
      node.parents.map((id) => getPersonNodeById(id))
    );
    const childNodes = await Promise.all(
      node.children.map((id) => getPersonNodeById(id))
    );

    const newNodes = [
      ...parentNodes
        .filter(
          (parent) =>
            !getNodes().some((existingNode) => existingNode.id === parent.id)
        )
        .map((parent) => ({
          id: parent.id,
          type: 'custom',
          data: parent,
          position: { x: 0, y: 0 },
        })),
      ...childNodes
        .filter(
          (child) =>
            !getNodes().some((existingNode) => existingNode.id === child.id)
        )
        .map((child) => ({
          id: child.id,
          type: 'custom',
          data: child,
          position: { x: 0, y: 0 },
        })),
    ];

    const newEdges = [
      ...parentNodes.map((parentNode) => ({
        id: `e-${parentNode.id}-${node.id}`,
        source: parentNode.id,
        target: node.id,
      })),
      ...childNodes.map((childNode) => ({
        id: `e-${node.id}-${childNode.id}`,
        source: node.id,
        target: childNode.id,
      })),
    ];

    let allNewNodes = newNodes;
    let allNewEdges = newEdges;

    for (const parentNode of parentNodes) {
      const { newNodes: nestedNodes, newEdges: nestedEdges } =
        await loadNodesRecursively(parentNode, currentDepth + 1, maxDepth);
      allNewNodes = [...allNewNodes, ...nestedNodes];
      allNewEdges = [...allNewEdges, ...nestedEdges];
    }

    for (const childNode of childNodes) {
      const { newNodes: nestedNodes, newEdges: nestedEdges } =
        await loadNodesRecursively(childNode, currentDepth + 1, maxDepth);
      allNewNodes = [...allNewNodes, ...nestedNodes];
      allNewEdges = [...allNewEdges, ...nestedEdges];
    }

    if (checkChildrenLoaded(data.children, getNodes())) {
      setAreChildrenLoaded(true);
    }

    return { newNodes: allNewNodes, newEdges: allNewEdges };
  };

  const onNodeButtonClick = async (node: PersonNode) => {
    const maxDepth = 1;
    const { newNodes, newEdges } = await loadNodesRecursively(
      node,
      0,
      maxDepth
    );

    const uniqueNodes: Node<PersonNode>[] = [
      ...new Map(
        [...getNodes(), ...newNodes].map((node) => [node.id, node])
      ).values(),
    ];

    const uniqueEdges: Edge<PersonNode>[] = [
      ...new Map(
        [...getEdges(), ...newEdges].map((edge) => [edge.id, edge])
      ).values(),
    ];

    const { nodes: updatedNodes, edges: updatedEdges } = getLayoutedElements(
      uniqueNodes,
      uniqueEdges
    );

    setNodes(updatedNodes);
    setEdges(updatedEdges);
  };

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
        {!areChildrenLoaded && (
          <ChevronDown
            className='cursor-pointer'
            onClick={() => onNodeButtonClick(data)}
          />
        )}
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
};

export default memo(CustomNode);
