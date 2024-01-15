import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function PregledSvojihTragaca() {
  const location = useLocation();
  const trackers = location.state.data;
  console.log(trackers);
  const navigate = useNavigate();

  const handleClick = (tracker) => {
    navigate(`manager/trackers/${tracker.username}`, { state: { tracker: tracker } });
  };

  return (
    <div>
      <h2>Lista svojih tragača:</h2>
      <ul>
        {trackers.map((tracker) => (
          <li key={tracker.username} style={{ cursor: 'pointer' }}>
            <strong>Ime:</strong> {tracker.name}, <strong>Prezime:</strong> {tracker.surname}, <strong>Uloga:</strong> {tracker.role}

            <button onClick={() => handleClick(tracker)}>Uredi</button>
          </li>
        ))}
      </ul>   
    </div>
  );
}

export default PregledSvojihTragaca;
