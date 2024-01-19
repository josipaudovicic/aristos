import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { BASE_URL } from '../config';

function TragaciNaAkciju() {
    const [availableTrackers, setAvailableTrackers] = useState([]);
    const [activeTrackers, setActiveTrackers] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();
  const username = location.state.username;
  const actionId = location.state.actionId;
  console.log("Manager username: ", username);
  console.log("Action id", actionId)
    
    
    useEffect(() => {
        const fetchTrackers = async () => {
         const response =  await fetch(`${BASE_URL}/manager/activeAction/trackers`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
               'actionId': actionId
            },
          })
          const data = await response.json();
          setAvailableTrackers(data.availableTrackers);
          setActiveTrackers(data.activeTrackers);

        };

    
        fetchTrackers();
      }, []);


  const handleAdd = async (trackerId) => {
    try {
      const response = await fetch(`${BASE_URL}/manager/activeAction/trackers/addTracker`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({actionId : actionId, trackerId: trackerId})
      });
    } catch (error) {
      console.error('Error:', error);
    }
    navigate('/manager', { state: { username: location.state.username}});
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
    marginBottom: '10px',
    marginTop: '30px',
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

  const p = {
    textAlign: 'center',
  };

  return (
    <div style={container}> 
      <h2 style={h2style}>Lista tragača na akciji:</h2> 
      <ul style={ul}>
        {activeTrackers ? activeTrackers.map((tracker) => (
          <li style={li} key={tracker.username}>
            <p style={pStyle}><b>Username:</b> {tracker.username}</p>
            <p style={pStyle}><b>Ime:</b> {tracker.name}</p>
            <p style={pStyle}><b>Prezime:</b> {tracker.surname}</p>
          </li>
        )) : <p style={p}>Nema aktivnih tragača</p>}
      </ul>
      <h2 style={h2style}>Lista tragača dostupnih za dodavanje na akciju:</h2> 
      <ul style={ul}>
        {availableTrackers ? availableTrackers.map((tracker) => (
          <li key={tracker.username} style={{...li, cursor: 'pointer' }}>
            <p style={pStyle}><b>Ime:</b> {tracker.name}</p>
            <p style={pStyle}><b>Prezime:</b> {tracker.surname}</p>
            <button style={buttonStyle} onClick={() => handleAdd(tracker.username)}>Dodaj</button>
          </li>
        )) : <p style={p}>Nema dostupnih tragača</p>}
      </ul>
    </div>
  );
}

export default TragaciNaAkciju;