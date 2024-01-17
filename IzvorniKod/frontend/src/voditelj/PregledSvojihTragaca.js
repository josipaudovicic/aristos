import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function PregledSvojihTragaca() {
  const location = useLocation();
  const trackers = location.state.data;
  console.log(trackers);
  const navigate = useNavigate();

  const handleClick = (tracker) => {
    console.log("Uredujemo tragaca ", tracker);
    navigate(`/manager/mytrackers/${tracker.username}`, { state: { tracker: tracker , username: location.state.username} });
  };

  return (
    <div>
      <h2>Lista svojih tragača:</h2>
      <ul>
        {trackers.map((tracker) => (
          <li key={tracker.username} style={{ cursor: 'pointer' }}>
            <strong>Ime:</strong> {tracker.name}, <strong>Prezime:</strong> {tracker.surname}, <strong>Korisničko ime:</strong> {tracker.username}

            <button onClick={() => handleClick(tracker)}>Uredi</button>
          </li>
        ))}
      </ul>   
    </div>
  );
}

export default PregledSvojihTragaca;
