import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

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
        // Fetch users with confirmed attribute set to NULL
        const fetchTrackers = async () => {
         const response =  await fetch('/manager/activeAction/trackers', {
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
      const response = await fetch(`/manager/activeAction/trackers/addTracker`, {
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

  const buttonStyle = {
    flex: '1', 
    marginLeft: '8px',
    padding: '8px 16px',
    fontSize: '16px',
    marginTop: '12px',
  };

  return (
    <div>
      <h2>Lista tragača na akciji:</h2> 
      <ul>
        {activeTrackers ? activeTrackers.map((tracker) => (
          <li key={tracker.username}>
            <strong>Username</strong> {tracker.username}, <strong>Ime:</strong> {tracker.name}, <strong>Prezime:</strong> {tracker.surname}
          </li>
        )) : <p>Nema aktivnih tragača</p>}
      </ul>
      <h2>Lista tragača dostupnih za dodavanje na akciju:</h2> 
      <ul>
        {availableTrackers ? availableTrackers.map((tracker) => (
          <li key={tracker.username} style={{ cursor: 'pointer' }}>
            <strong>Ime:</strong> {tracker.name}, <strong>Prezime:</strong> {tracker.surname}
            <button style={buttonStyle} onClick={() => handleAdd(tracker.username)}>Dodaj</button>
          </li>
        )) : <p>Nema dostupnih tragača</p>}
      </ul>
    </div>
  );
}

export default TragaciNaAkciju;