import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const transportModesList = ['pješke', 'dronom', 'automobilom', 'cross motorom', 'brodom', 'helikopterom'];

function PregledSvihTragaca() {
  const location = useLocation();
  const navigate = useNavigate();
  const trackers = location.state.data;
  const managerUsername = location.state.username;
  console.log("manager username:", managerUsername);


  const [selectedTrackers, setSelectedTrackers] = useState([]);
  const [selectedTransportModes, setSelectedTransportModes] = useState({});

  const handleTrackerCheckboxChange = (trackerUsername) => {
    setSelectedTrackers((prevTrackers) => {
      if (prevTrackers.includes(trackerUsername)) {
        return prevTrackers.filter((username) => username !== trackerUsername);
      } else {
        return [...prevTrackers, trackerUsername];
      }
    });
  };

  const handleTransportModeCheckboxChange = (trackerUsername, mode) => {
    setSelectedTransportModes((prevModes) => {
      const trackerModes = prevModes[trackerUsername] || [];
      if (trackerModes.includes(mode)) {
        return { ...prevModes, [trackerUsername]: trackerModes.filter((m) => m !== mode) };
      } else {
        return { ...prevModes, [trackerUsername]: [...trackerModes, mode] };
      }
    });
  };


  const handleSubmit = async () => {
    try {
      const addTrackersResponse = await fetch(`/manager/${location.state.username}/station/addTrackers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ selectedTrackers }),
      });
      console.log(location.state.username);
      if (addTrackersResponse.ok) {
        console.log('Selected trackers added to station successfully.');
      } else {
        console.error('Failed to add selected trackers to station.');

      }

      for (const selectedTrackerUsername of selectedTrackers) {
        try {
          const selectedTracker = trackers.find((tracker) => tracker.username === selectedTrackerUsername);
  
          const response = await fetch(`/manager/tracker/${selectedTracker.username}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ transportModes: selectedTransportModes[selectedTracker.username] || [] }),
          });
  
          if (response.ok) {
            console.log(`Tracker ${selectedTracker.username} transport modes updated successfully.`);
          } else {
            console.error(`Failed to update transport modes for Tracker ${selectedTracker.username}.`);

          }
        } catch (errorWithinLoop) {
          console.error('Error during loop iteration:', errorWithinLoop.message);

        }
      }

  
    } catch (error) {
      console.error('Error during submission:', error.message);

    }
  };
  
  
  return (
    <div>
      <h2>Pregled svih tragaca</h2>
      <form>
        {/* Tracker selection */}
        {trackers.map((tracker) => (
          <div key={tracker.username}>
            <label>
              <strong>Ime:</strong> {tracker.name}, <strong>Prezime:</strong> {tracker.surname}
              <input
                type="checkbox"
                checked={selectedTrackers.includes(tracker.username)}
                onChange={() => handleTrackerCheckboxChange(tracker.username)}
              />
            </label>
            <br />

            {/* Transport mode selection for each tracker */}
            {selectedTrackers.includes(tracker.username) && (
              <div>
                <label>Select Transport Modes:</label>
                {transportModesList.map((mode) => (
                  <div key={mode}>
                    <label>
                      {mode}
                      <input
                        type="checkbox"
                        checked={(selectedTransportModes[tracker.username] || []).includes(mode)}
                        onChange={() => handleTransportModeCheckboxChange(tracker.username, mode)}
                      />
                    </label>
                    <br />
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        <button type="button" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
}
export default PregledSvihTragaca;