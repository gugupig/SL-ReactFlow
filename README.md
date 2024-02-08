# SL-ReactFlow

Streamlit's Reactflow (https://reactflow.dev/) component. There is a similar component called streamlit-react-flow, but it is outdated (last updated 3 years ago). This component works with the new version.
## Installation instructions

```sh
pip install -i https://test.pypi.org/simple/ SL-ReactFlow
```

## Update Log


## Usage instructions

```python
import streamlit as st
from SL_ReactFlow import SL_ReactFlow
import pickle


if 'numClicks' not in st.session_state:
    st.session_state['numClicks'] = 0

if 'lastButtonClick' not in st.session_state:
    st.session_state['lastButtonClick'] = None

if 'canvas' not in st.session_state:
    st.session_state['canvas'] = {'nodes': [], 'edges':[]}



label = st.text_input('Enter the label of the button')
if st.button('Add Node', key="Add Node"):
    st.session_state['numClicks'] = st.session_state.get('numClicks', 0) + 1
    st.session_state['lastButtonClick'] = 'Add Node'

if st.button('Load Canvas', key="Load Canvas"):
    st.session_state['numClicks'] = st.session_state.get('numClicks', 0) + 1
    st.session_state['lastButtonClick'] = 'Load Canvas'
    try:
        canvas = pickle.load(open('canvas.pkl', 'rb'))
    except:
        canvas = {'nodes': [], 'edges':[]}
    if isinstance(canvas, dict) and any(value for value in canvas.values()):
        st.session_state['canvas'] = canvas
    else:
        st.write ('Canvas is empty')


cs = {'width': '100vw', 'height': 1000}
canvas = SL_ReactFlow('K-MAP',
                canvasStyle=cs,
                label=label, 
                numClicks=st.session_state.get('numClicks', 0), 
                lastClickButton=st.session_state.get('lastButtonClick', None),
                canvas = st.session_state.get('canvas', {'nodes': [], 'edges':[]}),
                key="graph_component",
                )

st.write(canvas)
if canvas is not None:
    pickle.dump(canvas, open('canvas.pkl', 'wb'))
```
