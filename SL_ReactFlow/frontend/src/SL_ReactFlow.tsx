import {
    Streamlit,
    StreamlitComponentBase,
    withStreamlitConnection,
  } from "streamlit-component-lib"
  import React, { ReactNode} from "react"
  import ReactFlow, { Controls, Background ,MiniMap, Edge,applyEdgeChanges, applyNodeChanges,ConnectionMode,ControlButton} from 'reactflow';
  import 'reactflow/dist/style.css';
  import MultiPurposeNode from './MultiPurposeNode'; // Import the custom node
  
  
  const nodeTypes = { multiPurposeNode: MultiPurposeNode };
  interface NodeData {
    label: string;
  }
  interface MultiPurposeNode {
    id: string; // A (not so)unique identifier for the node
    type: 'multiPurposeNode'; // Specify the type explicitly if you have a finite set of node types.
    position: { x: number; y: number }; // The initial position of the node
    data: NodeData;
  }
  
  interface State {
    numClicks: number; // Track the number of clicks
    isFocused: boolean; // Track the focus state
    nodes: MultiPurposeNode[]; // Adding nodes to the state
    edges: Edge[]; // Adding edges to the state  
    lastNumClicks : number; // Track the last number of clicks
    selectedNodeId: string | null; // Track the selected node
    selectedEdgeId: string | null; // Track the selected edge
  }
  
  
  
  /**
   * This is a React-based component template. The `render()` function is called
   * automatically when your component should be re-rendered.
   */
  class SL_ReactFlow extends StreamlitComponentBase<State> {
  
    constructor(props: any) {
      super(props);
      this.onConnect = this.onConnect.bind(this); 
      this.onNodeClick = this.onNodeClick.bind(this);
      this.onEdgeClick = this.onEdgeClick.bind(this);
      this.deleteSelectedNode = this.deleteSelectedNode.bind(this);
      this.deleteSelectedEdge = this.deleteSelectedEdge.bind(this);
      this.deleteSelectedElement = this.deleteSelectedElement.bind(this);
      this.addNode = this.addNode.bind(this);
      this.clearCanvas = this.clearCanvas.bind(this);
      this.saveCanvas = this.saveCanvas.bind(this);
      this.loadCanvas = this.loadCanvas.bind(this);
      this.streamlitButtonHandler = this.streamlitButtonHandler.bind(this);
      this.updateLastNumClicksIfNeeded = this.updateLastNumClicksIfNeeded.bind(this);
      this.onNodesChange = this.onNodesChange.bind(this);
      this.onEdgesChange = this.onEdgesChange.bind(this);
    }
    onNodeClick = (_:React.MouseEvent, node:any) => {
      this.setState({ selectedNodeId: node.id });
    }
    onEdgeClick = (_:React.MouseEvent, edge:Edge) => {
      this.setState({ selectedEdgeId: edge.id });
    }
    public state : State = { numClicks: 0, 
                  isFocused: false,
                  nodes: [],
                  edges: [],
                  lastNumClicks: 0,
                  selectedNodeId: null,
                  selectedEdgeId: null,
                }; 
    addNode(label: string) {
                  // Define a new node with the CustomNode structure
                  const newNode: MultiPurposeNode = {
                    id: `node-${this.state.nodes.length + 1}`,
                    // Use the custom node type
                    type: 'multiPurposeNode',
                    position: { x: Math.random() * 250, y: Math.random() * 250   },
                    data: { label },
                  };
                
                  // Update the state in a type-safe manner
                  
                  this.setState(prevState => ({
                    nodes: [...prevState.nodes, newNode],}),() => {
                      // This callback is executed after the state has been updated.
                      
                  });
                  
                  
                }
    
    addEdge = (sourceId: string, targetId: string) => {
                  const newEdge: Edge = {
                    id: `e-${this.state.edges.length + 1}`,
                    source: sourceId,
                    target: targetId,
                  };
                
                  this.setState(prevState => ({
                    edges: [...prevState.edges, newEdge],
                  }));
                }
    onConnect = (params:any) => {      
                  this.setState(prevState => ({
                    edges: [...prevState.edges, { id: `e${prevState.edges.length}`, ...params }],
                  }));
                }
                     
    onNodesChange = (changes:any) => {
                  this.setState((state) => ({
                    nodes: applyNodeChanges(changes, state.nodes) as MultiPurposeNode[], // Type assertion here
                  }));
      
                }
    onEdgesChange = (changes:any) => {
                  this.setState((state) => ({
                    edges: applyEdgeChanges(changes, state.edges),
                  }));
                }
    deleteSelectedNode = () => {
                  this.setState(prevState => ({
                    nodes: prevState.nodes.filter(n => n.id !== this.state.selectedNodeId),
                    edges: prevState.edges.filter(e => e.source !== this.state.selectedNodeId && e.target !== this.state.selectedNodeId),
                    selectedNodeId: null, // Reset selected node ID
                  }));
                }
    deleteSelectedEdge = () => {
                  if (!this.state.selectedEdgeId) return;
                
                  this.setState(prevState => ({
                    edges: prevState.edges.filter(edge => edge.id !== prevState.selectedEdgeId),
                    selectedEdgeId: null, // Reset selected edge ID
                  }));
                }
                
    deleteSelectedElement = () => {
                  if (this.state.selectedNodeId) {
                    this.setState(prevState => ({
                      nodes: prevState.nodes.filter(node => node.id !== prevState.selectedNodeId),
                      edges: prevState.edges.filter(e => e.source !== this.state.selectedNodeId && e.target !== this.state.selectedNodeId),
                      selectedNodeId: null, // Reset selected node ID
                    }));
                  } else if (this.state.selectedEdgeId) {
                    this.setState(prevState => ({
                      edges: prevState.edges.filter(edge => edge.id !== prevState.selectedEdgeId),
                      selectedEdgeId: null, // Reset selected edge ID
                    }));
                  }
                }
    clearCanvas = () => {
                  this.setState({ nodes: [], edges: [] });
                }
    saveCanvas = () => {
        Streamlit.setComponentValue({ nodes: this.state.nodes, edges: this.state.edges });
                }   
    loadCanvas = (nodes: MultiPurposeNode[], edges: Edge[]) => {
                  this.setState({ nodes, edges });  
                }

    updateLastNumClicksIfNeeded() {
                  const { numClicks } = this.props.args;
                  // Only update if numClicks has actually changed
                  if (numClicks !== this.state.lastNumClicks) {
                    this.setState({ lastNumClicks: numClicks });
                  }
                }
    streamlitButtonHandler = () => {
                  const { numClicks } = this.props.args;
                  const { lastNumClicks } = this.state;
                  const { lastClickButton } = this.props.args;
                  const { canvas } = this.props.args;
                  if (numClicks !== lastNumClicks) {
                      this.updateLastNumClicksIfNeeded(); // Update lastNumClicks in state
                    if (lastClickButton === 'Add Node') {
                      this.addNode(this.props.args["label"] || `Node ${this.state.nodes.length + 1}`);
                    }
                    else if (lastClickButton === 'Load Canvas') {
                      this.loadCanvas(canvas.nodes, canvas.edges);
                    }
                  }
                }        
                    

    public render = (): ReactNode => {
      // Arguments that are passed to the plugin in Python are accessible
      // via `this.props.args`. Here, we access the "name" arg.
      const name = this.props.args["name"]
      const canvasStyle = this.props.args["canvasStyle"] || { height: 1000 ,width : '100vw'};
  
  
      // Streamlit sends us a theme object via props that we can use to ensure
      // that our component has visuals that match the active theme in a
      // streamlit app.
      const { theme } = this.props
      const style: React.CSSProperties = {}
      
  
      // Maintain compatibility with older versions of Streamlit that don't send
      // a theme object.
      if (theme) {
        // Use the theme object to style our button border. Alternatively, the
        // theme style is defined in CSS vars.
        const borderStyling = `1px solid ${
          this.state.isFocused ? theme.primaryColor : "gray"
        }`
        style.border = borderStyling
        style.outline = borderStyling
      }
      
      // Show a button and some text. 
      // When the button is clicked, we'll increment our "numClicks" state
      // variable, and send its new value back to Streamlit, where it'll
      // be available to the Python program.
      this.streamlitButtonHandler();  
      return (
        <div style = {canvasStyle} >
          <h3> {name} </h3>
        <ReactFlow 
        connectionMode={ConnectionMode.Loose}
        nodeTypes={nodeTypes}
        nodes={this.state.nodes}
        edges={this.state.edges}
        onNodesChange={this.onNodesChange}
        onEdgesChange={this.onEdgesChange}
        onNodeClick={this.onNodeClick}
        onEdgeClick={this.onEdgeClick}
        onConnect={this.onConnect}
        fitView>
         <MiniMap nodeStrokeWidth={3} zoomable pannable  position = "bottom-right"/>
          <Background />
          <Controls showInteractive={false}>
      <ControlButton onClick={this.deleteSelectedElement}> <strong> D </strong>
      </ControlButton>
      <ControlButton onClick={this.clearCanvas}> <strong> W </strong>
      </ControlButton>
      <ControlButton onClick={this.saveCanvas}> <strong> S </strong>
      </ControlButton>
    </Controls>
        </ReactFlow>
      </div>
  
      )
    }
  
  }
  // "withStreamlitConnection" is a wrapper function. It bootstraps the
  // connection between your component and the Streamlit app, and handles
  // passing arguments from Python -> Component.
  //
  // You don't need to edit withStreamlitConnection (but you're welcome to!).
  export default withStreamlitConnection(SL_ReactFlow)