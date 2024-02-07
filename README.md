# SL-ReactFlow

Streamlit's Reacflow (https://reactflow.dev/) component, there is a similar component : streamlit-react-flow but it is out of date (last update 3 years ago)
so I make this for my own project

## Installation instructions

```sh
pip install -i https://test.pypi.org/simple/ SL-ReactFlow
```

## Usage instructions

```python
import streamlit as st

from SL_ReactFlow import SL_ReactFlow

if 'numClicks' not in st.session_state:
    st.session_state['numClicks'] = 0



label = st.text_input('Enter the label of the button')
if st.button('click me', key="button"):
    st.session_state['numClicks'] = st.session_state.get('numClicks', 0) + 1
# Return the current states of the graph (nodes and edges)
value = SL_ReactFlow(name = 'new_graph',label = 'node label text',numClicks=st.session_state.get('numClicks', 0), key="graph_component")

st.write(value) 
```
