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

  const buttonStyle = {
    marginLeft: '393px',
    padding: '8px 16px',
    fontSize: '16px',
    marginTop: '3px',
    cursor: 'pointer',
  };

  return (
    <div style={container}>
      <h2 style={h2style}>Lista svojih tragača:</h2>
      <ul style={ul}>
        {trackers ? trackers.map((tracker) => (
          <li key={tracker.username} style={li}>
            <p style={pStyle}><b>Ime:</b> {tracker.name} </p>
            <p style={pStyle}><b>Prezime:</b> {tracker.surname} </p>
            <p style={pStyle}><b>Korisničko ime:</b> {tracker.username}</p>

            <button style={buttonStyle} onClick={() => handleClick(tracker)}>Uredi</button>
          </li>
        )) : <p>Nema tragača.</p>}
      </ul>   
    </div>
  );
}

export default PregledSvojihTragaca;
