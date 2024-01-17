import { useLocation, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

function TragaciNaZahtjev() {
    const navigate = useNavigate();
    const location = useLocation();
    const vehicles = location.state?.vehicles;
    const actionId = location.state?.actionId;
    const username = location.state?.username;
    const [trackers, setTrackers] = useState([]);
    const [selectedTrackers, setSelectedTrackers] = useState([]);

    useEffect(() => {
        const fetchTrackers = () => {
          fetch('/manager/requests/trackers', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
               'actionId': actionId
            },
          })
          .then((response) => response.json())
          .then((data) => {setTrackers(data);})
          .catch((error) => console.error('Error fetching trackers data:', error));
        };
        
      fetchTrackers();
      console.log(trackers);
      }, []); 


  const handleSubmit = () => {
    fetch('/manager/requests/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ selectedTrackers : selectedTrackers, actionId : actionId }),
      });

    navigate(`/manager`, {state: { username : username}})
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
                {tracker.name} 
              <input
                type="checkbox"
                id={tracker.trackerId}
                onChange={() => handleCheckboxChange(tracker.username)}
                checked={selectedTrackers.includes(tracker.username)}
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