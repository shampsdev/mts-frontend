import { PersonNode } from '@/shared/interfaces/person-node.interface';
import dagre from '@dagrejs/dagre';

import { Node, Edge, Position } from '@xyflow/react';

const dagreGraph = new dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));

const nodeWidth = 360;
const nodeHeight = 80;

export const getLayoutedElements = (
  nodes: Node<PersonNode>[],
  edges: Edge<PersonNode>[]
) => {
  dagreGraph.setGraph({ rankdir: 'TB' });

  nodes.forEach((node: Node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge: Edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  const newNodes: Node<PersonNode>[] = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    const position = {
      x: nodeWithPosition.x - nodeWidth / 2,
      y: nodeWithPosition.y - nodeHeight / 2,
    };

    return {
      ...node,
      targetPosition: Position.Top,
      sourcePosition: Position.Bottom,
      position,
    };
  });

  return { nodes: newNodes, edges };
};
