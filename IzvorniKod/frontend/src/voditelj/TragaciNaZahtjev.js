import { useLocation, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

function TragaciNaZahtjev() {
    const navigate = useNavigate();
    const location = useLocation();
    const vehicles = location.state?.vehicles;
    const [trackers, setTrackers] = useState([]);
    const [selectedTrackers, setSelectedTrackers] = useState([]);


    useEffect(() => {
        const fetchTrackers = () => {
          fetch('/manager/requests/trackers', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json', 
                vehicles: vehicles,
            },
          })
          .then((response) => response.json())
          .then((data) => {setTrackers(data);})
          .catch((error) => console.error('Error fetching trackers data:', error));
        };
    
      fetchTrackers();
      }, []); 


  const handleSubmit = () => {
    fetch('/manager/requests/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ selectedTrackers }),
      });

    navigate(`/manager/requests`, {state: { vehicles: vehicles}})
  };

  const handleCheckboxChange = (trackerId) => {
    setSelectedTrackers((prevSelected) => {
        if (prevSelected.includes(trackerId)) {
            return prevSelected.filter((id) => id !== trackerId);
        } else {
            return [...prevSelected, trackerId];
        }
    });
};

  const buttonStyle = {
    flex: '1', 
    marginLeft: '8px',
    padding: '8px 16px',
    fontSize: '16px',
    marginTop: '12px',
  };

  const label = {
    display: 'block',
    marginBottom: '10px', 
  };

  const checkboxStyle = {
    marginRight: '5px', 
  };

  return (
    <div>
      <h2>Lista tragača:</h2> 
      <form>
          <label style={label}>
            {trackers.map((tracker) => (
              <label key={tracker} style={label}>
                {tracker.trackerName} 
              <input
                type="checkbox"
                id={tracker.trackerId}
                onChange={() => handleCheckboxChange(tracker.trackerId)}
                checked={selectedTrackers.includes(tracker.trackerId)}
                style={checkboxStyle}
              />
            </label>
              ))}
          </label>
        </form>

      <button style={buttonStyle} onClick={() => handleSubmit()}>Dodaj</button>
    </div>
  );
}

export default TragaciNaZahtjev;