// NeaktivneAkcije.js

import React from 'react';
import { useLocation } from 'react-router-dom';



function NeaktivneAkcije() {
  const location = useLocation();
  const { state } = location;
  const actions = state ? state.users : [];

  return (
    <div>
      <h2>Neaktivne Akcije</h2>
      {actions.length > 0 ? (
        <ul>
          {actions.map((action) => (
            <li key={action.id}>
              <strong>ID Akcije:</strong> {action.id}, {'    '}
              <strong>Ime akcije:</strong> {action.name}, {'    '}
              <strong>Istraživač:</strong> {action.username}
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
