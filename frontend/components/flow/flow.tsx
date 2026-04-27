"use client"

import {
    ReactFlow, Background, Controls,
    applyNodeChanges, applyEdgeChanges, addEdge,
    type Node, type Edge, type OnNodesChange, type OnEdgesChange, type OnConnect,
    ConnectionMode
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { useCallback, useState } from "react";
import { nodeTypes } from "@/components/flow/nodeTypes";
import SidePanel from "./sidepanel";


const initialNodes: Node[] = [
    // {
    //     id: 'n1',
    //     position: { x: 0, y: 0 },
    //     data: { label: 'Node 1' },
    //     type: 'node',
    // },
    // {
    //     id: 'n2',
    //     position: { x: 100, y: 100 },
    //     data: { label: 'Node 2' },
    //     type: 'node',
    // },
];

const initialEdges: Edge[] = [
    // {
    // 	id: 'n1-n2',
    // 	source: 'n1',
    // 	target: 'n2',
    // },
];

const proOptions = { hideAttribution: true };

export default function Flow() {

    const [nodes, setNodes] = useState<Node[]>(initialNodes);
    const [edges, setEdges] = useState<Edge[]>(initialEdges);

    const onNodesChange: OnNodesChange = useCallback(
        (changes) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
        [],
    );
    const onEdgesChange: OnEdgesChange = useCallback(
        (changes) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
        [],
    );
    const onConnect: OnConnect = useCallback(
        (params) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
        [],
    );

    return (
        <div
            style={{ height: '100%', width: '100%' }}
            className="flex flex-row"
        >
            <SidePanel setNodes={setNodes} />
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
                connectionMode={ConnectionMode.Loose}
                proOptions={proOptions}
            >
                <Background />
                <Controls />
            </ReactFlow>
        </div>
    )
}