import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function TragaciNaAkciju() {
    const [trackers, setTrackers] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();
  const username = location.state.username;
  console.log(username);
    
  const redirectToPage = async (path) => {
    try {
      let response;
      if (path === 'manager/actions') {
        navigate('/manager/actions', {state : {username: username}});
      }
    } catch (error) {
      console.error(`Error fetching data:`, error.message);
    }

  }
    
    useEffect(() => {
        // Fetch users with confirmed attribute set to NULL
        const fetchAvailableTrackers = async () => {
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

        const fetchTrackersOnAction = async () => {
          try {
            const response = await fetch('/manager/trackersOnAction');
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
    
        fetchAvailableTrackers();
      }, []);


  const handleAdd = async (trackerUsername) => {
    try {
      const response = await fetch(`/manager/myAvailableTrackers/${trackerUsername}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setTrackers((prevTrackers) => prevTrackers.filter((tracker) => tracker.username !== trackerUsername));
      } else {
        console.error('Failed to add tracker on action');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSubmit = () => {
    alert('Spremljene promjene');

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
          <li key={tracker.username} style={{ cursor: 'pointer' }}>
            <strong>Ime:</strong> {tracker.name}, <strong>Prezime:</strong> {tracker.surname}
            <button style={buttonStyle} onClick={() => handleAdd(tracker.username)}>Dodaj</button>
          </li>
        ))}
      </ul>
      <button style={buttonStyle} onClick={() => handleSubmit()}>Spremi promjene</button>
    </div>
  );
}

export default TragaciNaAkciju;