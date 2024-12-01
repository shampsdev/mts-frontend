import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  Background,
  BackgroundVariant,
  ConnectionLineType,
  Node,
  useReactFlow,
} from '@xyflow/react';
import '@xyflow/react/dist/base.css';

import CustomNode from './custom-node.component';
import { getPersonNodeById } from '@/shared/api/node.api';
import { PersonNode } from '@/shared/interfaces/person-node.interface';
import { getLayoutedElements } from '@/lib/tree-layout';
import { useEffect } from 'react';
import { useSelectedStore } from '@/shared/store/selected.store';

const nodeTypes = {
  custom: CustomNode,
};

const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
  [],
  []
);

const Flow = () => {
  const [nodes, setNodes, onNodesChange] =
    useNodesState<Node<PersonNode>>(layoutedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);

  const { selected } = useSelectedStore();
  const { fitView, setViewport, getViewport } = useReactFlow();

  useEffect(() => {
    if (selected) {
      console.log(selected);
      fitView({ nodes: [selected], duration: 800 });
    }
  }, [fitView, getViewport, selected, setViewport]);

  useEffect(() => {
    getPersonNodeById('7').then((x) => {
      const { nodes, edges } = getLayoutedElements(
        [
          {
            id: x.id,
            type: 'custom',
            data: x,
            position: { x: 0, y: 0 },
          },
        ],
        []
      );

      setNodes(nodes);
      setEdges(edges);
    });
  }, [setEdges, setNodes, fitView]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodesDraggable={false}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      connectionLineType={ConnectionLineType.SmoothStep}
      fitView
      nodeTypes={nodeTypes}
      proOptions={{ hideAttribution: true }}
      style={{ backgroundColor: '#F7F9FB' }}
    >
      <Background gap={15} size={1} variant={BackgroundVariant.Dots} />
    </ReactFlow>
  );
};

export default Flow;
