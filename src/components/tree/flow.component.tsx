import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  Background,
  BackgroundVariant,
  ConnectionLineType,
  Node,
} from '@xyflow/react';
import '@xyflow/react/dist/base.css';

import CustomNode from './custom-node.component';
import { getPersonNodeById } from '@/shared/api/node.api';
import { PersonNode } from '@/shared/interfaces/person-node.interface';
import { getLayoutedElements } from '@/lib/tree-layout';
import { useEffect } from 'react';

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

  useEffect(() => {
    getPersonNodeById('8').then((x) => {
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
  }, [setEdges, setNodes]);

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
            !nodes.some((existingNode) => existingNode.id === parent.id)
        )
        .map((parent) => ({
          id: parent.id,
          type: 'custom',
          data: parent,
          position: { x: 0, y: 0 },
        })),
      ...childNodes
        .filter(
          (child) => !nodes.some((existingNode) => existingNode.id === child.id)
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

    return { newNodes: allNewNodes, newEdges: allNewEdges };
  };

  const onNodeDoubleClick = async (_: unknown, input: Node<PersonNode>) => {
    const node = input.data;

    const maxDepth = 1;
    const { newNodes, newEdges } = await loadNodesRecursively(
      node,
      0,
      maxDepth
    );

    const uniqueNodes = [
      ...new Map(
        [...nodes, ...newNodes].map((node) => [node.id, node])
      ).values(),
    ];

    const uniqueEdges = [
      ...new Map(
        [...edges, ...newEdges].map((edge) => [edge.id, edge])
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
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      connectionLineType={ConnectionLineType.SmoothStep}
      fitView
      snapToGrid
      nodeTypes={nodeTypes}
      snapGrid={[10, 10]}
      fitViewOptions={{
        padding: 5,
      }}
      style={{ backgroundColor: '#F7F9FB' }}
      proOptions={{ hideAttribution: true }}
      onNodeClick={onNodeDoubleClick}
    >
      <Background gap={15} size={1} variant={BackgroundVariant.Dots} />
    </ReactFlow>
  );
};

export default Flow;
