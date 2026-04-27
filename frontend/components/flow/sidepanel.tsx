import { Dispatch, SetStateAction } from 'react';
import { type Node } from "@xyflow/react";

interface Props {
    setNodes: Dispatch<SetStateAction<Node[]>>;
}

export default function SidePanel({ setNodes }: Props) {

    const handleAddNode = () => {
        setNodes(prev => [...prev, {
            id: `n${prev.length + 1}`,
            position: { x: 50, y: 50 },
            data: { label: `Node ${prev.length + 1}` },
            type: 'node',
        }])
    }

    return (
        <div className="w-1/5 bg-blue-400">
            SidePanel
            <button onClick={handleAddNode}>
                Add Node
            </button>
        </div>
    )
}