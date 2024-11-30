import { useCallback } from 'react';
import {
    ReactFlow,
    useNodesState,
    useEdgesState,
    addEdge,
    Background,
    BackgroundVariant,
    ConnectionLineType,
} from '@xyflow/react';

import dagre from '@dagrejs/dagre';

import '@xyflow/react/dist/base.css';

import CustomNode from './custom-node.component';

const nodeTypes = {
    custom: CustomNode,
};

const initNodes = [
    {
        id: '1',
        type: 'custom',
        data: { name: 'Мамут Рахал', job: 'CEO', emoji: '😎' },
        position: { x: 0, y: 50 },
    },
    {
        id: '2',
        type: 'custom',
        data: { name: 'Матьe Балл', job: 'Designer', emoji: '🤓' },
        position: { x: -200, y: 200 },
    },
    {
        id: '3',
        type: 'custom',
        data: { name: 'Яша Лава', job: 'Developer', emoji: '🤩' },
        position: { x: 200, y: 200 },
    },
    {
        id: '4',
        type: 'custom',
        data: { name: 'Головач Лена', job: 'QA', emoji: '🤩' },
        position: { x: 200, y: 200 },
    }
];

const initEdges = [
    {
        id: 'e1-2',
        source: '1',
        target: '2',
    },
    {
        id: 'e1-3',
        source: '1',
        target: '3',
    },
    {
        id: 'e1-4',
        source: '1',
        target: '4',
    },
];

const dagreGraph = new dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));

const nodeWidth = 180;
const nodeHeight = 40;

const getLayoutedElements = (nodes, edges) => {
    dagreGraph.setGraph({ rankdir: 'TB' });

    nodes.forEach((node) => {
        dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
    });

    edges.forEach((edge) => {
        dagreGraph.setEdge(edge.source, edge.target);
    });

    dagre.layout(dagreGraph);

    const newNodes = nodes.map((node) => {
        const nodeWithPosition = dagreGraph.node(node.id);
        const newNode = {
            ...node,
            targetPosition: 'top',
            sourcePosition: 'bottom',
            position: {
                x: nodeWithPosition.x - nodeWidth / 2,
                y: nodeWithPosition.y - nodeHeight / 2,
            },
        };

        return newNode;
    });

    return { nodes: newNodes, edges };
};

const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
    initNodes,
    initEdges,
);

const Flow = () => {
    const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);

    const onConnect = useCallback(
        (params) =>
            setEdges((eds) =>
                addEdge(
                    { ...params, type: ConnectionLineType.SmoothStep, animated: true },
                    eds,
                ),
            ),
        [],
    );

    return (
        <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            connectionLineType={ConnectionLineType.SmoothStep}
            fitView
            snapToGrid
            nodeTypes={nodeTypes}
            snapGrid={[10, 10]}
            fitViewOptions={{
                padding: 3
            }}
            style={{ backgroundColor: "#F7F9FB" }}
            proOptions={{ hideAttribution: true }}
        >
            <Background gap={15} size={1} variant={BackgroundVariant.Dots} />
        </ReactFlow>
    );
};

export default Flow;
