import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function PregledSvojihTragaca() {
  const location = useLocation();
  const trackers = location.state.users;
  console.log(trackers);
  const navigate = useNavigate();

  const handleClick = (tracker) => {
    navigate(`manager/trackers/${tracker.id}`, { state: { tracker: tracker } });
  };

  return (
    <div>
      <h2>Lista mojih tragača:</h2>
      <ul>
        {trackers.map((tracker) => (
          <li key={tracker.id} style={{ cursor: 'pointer' }}>
            <strong>Ime:</strong> {tracker.name}, <strong>Prezime:</strong> {tracker.surname}, <strong>ID:</strong> {tracker.id}, <strong>Uloga:</strong> {tracker.role}
            <button onClick={() => handleClick(tracker)}>Uredi</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PregledSvojihTragaca;
