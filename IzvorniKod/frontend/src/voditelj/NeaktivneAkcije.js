// NeaktivneAkcije.js

import React from 'react';
import { useLocation } from 'react-router-dom';



function NeaktivneAkcije() {
  const location = useLocation();
  const { state } = location;
  const actions = state ? state.users : [];

  const li = {
    border: '1px solid #ccc',
    marginBottom: '3px',
    padding: '5px',
    display: 'flex',
    flexDirection: 'column',
    pointer: 'cursor',
  };

  const ul = {
    listStyleType: 'none',
    padding: '0',
  };

  const container = {
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    padding: '15px',
    width: '550px',
    overflowY: 'auto', 
    maxHeight: '700px',
  };

  const h2style = {
    textAlign: 'center',
  };

  const pStyle = {
    margin: '3px',
  };

  return (
    <div style={container}>
      <h2 style={h2style}>Neaktivne Akcije</h2>
      {actions.length > 0 ? (
        <ul style={ul}>
          {actions.map((action) => (
            <li style={li} key={action.id}>
              <p style={pStyle}><b>ID Akcije:</b> {action.id}, {'    '}</p>
              <p style={pStyle}><b>Ime akcije:</b> {action.name}, {'    '}</p>
              <p style={pStyle}><b>Istraživač:</b> {action.username}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Nema neaktivnih akcija.</p>
      )}
    </div>
  );
}

export default NeaktivneAkcije;
