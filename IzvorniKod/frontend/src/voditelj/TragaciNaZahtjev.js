
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

function TragaciNaZahtjev() {
    const [trackers, setTrackers] = useState([]);
    
    const navigate = useNavigate();
    const location = useLocation();
    const username = location.state.username;
    const requestId = location.state.requests;

    const redirectToPage = async (path) => {
      try {
        if (path === 'manager/actions') {
          navigate('/manager/actions', {state : {username: username}});
        }
      } catch (error) {
        console.error(`Error fetching data:`, error.message);
      }
  
    }

    useEffect(() => {
        // Fetch users with confirmed attribute set to NULL
        const fetchTrackers = async () => {
          try {
            const response = await fetch('/manager/myAvailableTrackers');
            if (response.ok) {
              const data = await response.json();
              console.log(data);
              setTrackers(data);
            } else {
              console.error('Failed to fetch trackers');
            }
          } catch (error) {
            console.error('Error:', error);
          }
        };
    
        fetchTrackers();
      }, []); 

  const handleAdd = async (trackerID) => {
    try {
      const response = await fetch(`/manager/myAvailableTrackers/${trackerID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setTrackers((prevTrackers) => prevTrackers.filter((tracker) => tracker.id !== trackerID));
      } else {
        console.error('Failed to add tracker on action');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSubmit = () => {
    alert('Zahtjev je obrađen');

    //delete zahtjeva??
    //trebam dohvatit sa prijasnje stranice tocno koji je request (sa useLocation)
    //i onda ovdje obrisat tocno taj request

    try {
      fetch(`/manager/requests/${requestId}`, {
        method: 'DELETE',
      });
    } catch (error) {
      console.error('Error deleting request:', error);
    }

    redirectToPage('manager/actions')
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
      <h2>Lista tragača:</h2> 
      <ul>
        {trackers.map((tracker) => (
          <li key={tracker.id} style={{ cursor: 'pointer' }}>
            <strong>Ime:</strong> {tracker.name}, <strong>Prezime:</strong> {tracker.surname}
            <button style={buttonStyle} onClick={() => handleAdd(tracker.id)}>Dodaj</button>
          </li>
        ))}
      </ul>
      <button style={buttonStyle} onClick={() => handleSubmit()}>Spremi promjene</button>
    </div>
  );
}

export default TragaciNaZahtjev;