# streamlit-custom-component

Streamlit component that allows you to do X

## Installation instructions

```sh
pip install -i https://test.pypi.org/simple/ SL-ReactFlow
```

## Usage instructions

```python
import streamlit as st

from SL_ReactFlow import SL_ReactFlow

# Return the current states of the graph (nodes and edges)
value = SL_ReactFlow(name = 'new_graph',label = 'node label text',numClicks=st.session_state.get('numClicks', 0), key="graph_component")

st.write(value) 
```
