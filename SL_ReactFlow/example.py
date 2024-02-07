import streamlit as st
from SL_ReactFlow import SL_ReactFlow


if 'numClicks' not in st.session_state:
    st.session_state['numClicks'] = 0



label = st.text_input('Enter the label of the button')
if st.button('click me', key="button"):
    st.session_state['numClicks'] = st.session_state.get('numClicks', 0) + 1


v = SL_ReactFlow('K-MAP',label=label, numClicks=st.session_state.get('numClicks', 0), key="graph_component")
st.write(v)