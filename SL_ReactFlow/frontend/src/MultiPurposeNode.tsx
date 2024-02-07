import React from 'react';
import { Handle, Position} from 'reactflow';


interface NodeData {
  label: string;
}

{/* const MultiPurposeNode: React.FC<{ data: NodeData }> = ({ data }) => { */}
const MultiPurposeNode: React.FC<{ data: NodeData }> = ({ data }) => {
  const inlineStyle = {
    display: 'inline-block',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    backgroundColor: '#fff',
    maxWidth: '200px',
    height: 'au',
    overflow: 'hidden',
    
    
  };
  const labelStyle : React.CSSProperties = {
    fontSize: '12px',
    whiteSpace: 'normal',
    textOverflow: 'pre-wrap',
    overflowY: 'auto',
    maxHeight: '80px',
    
    
  };
  return (
    <div className="custom-node"  style={inlineStyle}>
      {/* Node content */}
      <div style={labelStyle}>{data.label}</div>
      
      {/* Handles that can both take and emit edges */}
      
      <Handle type="source" position={Position.Top} id="top" isConnectable={true} />
      <Handle type="source" position={Position.Right} id="right-" isConnectable={true} />
      <Handle type="source" position={Position.Bottom} id="bottom" isConnectable={true} />
      <Handle type="source" position={Position.Left} id="left" isConnectable={true} />

      
    </div>
  );
};

export default MultiPurposeNode;
