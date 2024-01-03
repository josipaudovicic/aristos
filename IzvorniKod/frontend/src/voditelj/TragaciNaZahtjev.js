
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

function TragaciNaZahtjev() {
    const [trackers, setTrackers] = useState([]);

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
    //redirect na neku stranicu ili implementacija return botuna?

    //delete zahtjeva??
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