import { getLayoutedElements } from '@/lib/tree-layout';
import { getPersonNodePath } from '../api/node.api';
import { Edge, Node, useReactFlow } from '@xyflow/react';
import { PersonNode } from '../interfaces/person-node.interface';

export const useUserFlow = () => {
  const { setNodes, setEdges, getNodes, getEdges } = useReactFlow();

  const moveFromTo = async (from: string, to: string) => {
    const path = await getPersonNodePath(from, to);
    console.log(path);

    const newNodes: Node<PersonNode>[] = [
      ...path
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
    ];

    const newEdges: Edge[] = [];

    for (let i = 0; i < path.length; i++) {
      const personNode = path[i];

      personNode.parents.forEach((parentId) => {
        newEdges.push({
          id: `e-${parentId}-${personNode.id}`,
          source: parentId,
          target: personNode.id,
        });
      });

      personNode.children.forEach((childId) => {
        newEdges.push({
          id: `e-${personNode.id}-${childId}`,
          source: personNode.id,
          target: childId,
        });
      });
    }

    // @ts-expect-error what
    const uniqueNodes: Node<PersonNode>[] = [
      ...new Map(
        [...getNodes(), ...newNodes].map((node) => [node.id, node])
      ).values(),
    ];

    // @ts-expect-error what
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

  return {
    moveFromTo,
  };
};
