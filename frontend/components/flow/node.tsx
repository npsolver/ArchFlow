import { Position, Handle } from '@xyflow/react';
import { useNodesData } from '@xyflow/react';

export default function Node({ data }: { data: { label: string } }) {
	return (
		<div className="border-2 rounded p-2.5 w-30 h-30 flex items-center justify-center">
			<div>{data.label}</div>
			<Handle id="st" type="source" position={Position.Top} />
			<Handle id="sb" type="source" position={Position.Bottom} />
			<Handle id="sl" type="source" position={Position.Left} />
			<Handle id="sr" type="source" position={Position.Right} />
		</div>
	);
}