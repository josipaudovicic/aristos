import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const transportModesList = ['pješke', 'dronom', 'automobilom', 'cross motorom', 'brodom', 'helikopterom'];

function PregledSvihTragaca() {
  const location = useLocation();
  const navigate = useNavigate();
  const trackers = location.state.data; 
  const [selectedTrackers, setSelectedTrackers] = useState([]);
  const [selectedTransportModes, setSelectedTransportModes] = useState({});

  const handleTrackerCheckboxChange = (trackerId) => {
    setSelectedTrackers((prevTrackers) => {
      if (prevTrackers.includes(trackerId)) {
        return prevTrackers.filter((id) => id !== trackerId);
      } else {
        return [...prevTrackers, trackerId];
      }
    });
  };

  const handleTransportModeCheckboxChange = (trackerId, mode) => {
    setSelectedTransportModes((prevModes) => {
      const trackerModes = prevModes[trackerId] || [];
      if (trackerModes.includes(mode)) {
        return { ...prevModes, [trackerId]: trackerModes.filter((m) => m !== mode) };
      } else {
        return { ...prevModes, [trackerId]: [...trackerModes, mode] };
      }
    });
  };


  const handleSubmit = async () => {
    try {
      const addTrackersResponse = await fetch(`/station/addTrackers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ selectedTrackers }),
      });
  
      if (addTrackersResponse.ok) {
        console.log('Selected trackers added to station successfully.');
      } else {
        console.error('Failed to add selected trackers to station.');

      }

      for (const selectedTrackerId of selectedTrackers) {
        try {
          const selectedTracker = trackers.find((tracker) => tracker.id === selectedTrackerId);
  
          const response = await fetch(`/api/tracker/${selectedTracker.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ transportModes: selectedTransportModes[selectedTracker.id] || [] }),
          });
  
          if (response.ok) {
            console.log(`Tracker ${selectedTracker.id} transport modes updated successfully.`);
          } else {
            console.error(`Failed to update transport modes for Tracker ${selectedTracker.id}.`);

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
          <div key={tracker.id}>
            <label>
              <strong>Ime:</strong> {tracker.name}, <strong>Prezime:</strong> {tracker.surname}, <strong>ID:</strong> {tracker.id}
              <input
                type="checkbox"
                checked={selectedTrackers.includes(tracker.id)}
                onChange={() => handleTrackerCheckboxChange(tracker.id)}
              />
            </label>
            <br />

            {/* Transport mode selection for each tracker */}
            {selectedTrackers.includes(tracker.id) && (
              <div>
                <label>Select Transport Modes:</label>
                {transportModesList.map((mode) => (
                  <div key={mode}>
                    <label>
                      {mode}
                      <input
                        type="checkbox"
                        checked={(selectedTransportModes[tracker.id] || []).includes(mode)}
                        onChange={() => handleTransportModeCheckboxChange(tracker.id, mode)}
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
