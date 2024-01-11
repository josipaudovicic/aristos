// NeaktivneAkcije.js

import React from 'react';

function NeaktivneAkcije({ location }) {
  const { state } = location;
  const actions = state ? state.users : [];

  return (
    <div>
      <h2>Neaktivne Akcije</h2>
      {actions.length > 0 ? (
        <ul>
          {actions.map((action) => (
            <li key={action.actionId}>
              <strong>ID Akcije:</strong> {action.actionId},{' '}
              <strong>Ime akcije:</strong> {action.actionName},{' '}
              <strong>Započeta:</strong> {action.started ? 'Yes' : 'No'}
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
