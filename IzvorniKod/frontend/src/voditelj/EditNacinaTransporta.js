import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const transportModesList = ['pješke', 'dronom', 'automobilom', 'cross motorom', 'brodom', 'helikopterom'];

function EditNacinaTransporta() {
  const location = useLocation();
  const { tracker } = location.state;
  const navigate = useNavigate();

  // Initial state for transport modes
  const [transportModes, setTransportModes] = useState(tracker.transportModes);

  // Handler for checkbox changes
  const handleCheckboxChange = (mode) => {
    setTransportModes((prevModes) => {
      if (prevModes.includes(mode)) {
        return prevModes.filter((m) => m !== mode);
      } else {
        return [...prevModes, mode];
      }
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`/api/tracker/${tracker.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ transportModes: transportModes }),
      });

      if (response.ok) {
        console.log('Tracker transport modes updated successfully.');
        navigate('/manager/trackers');
      } else {
        console.error('Failed to update tracker transport modes.');
      }
    } catch (error) {
      console.error('Error updating tracker transport modes:', error.message);
    }
  };

  return (
    <div>
      <h2>Edit načina Transporta</h2>
      <form>
        {transportModesList.map((mode) => (
          <div key={mode}>
            <label>
             {mode}
              <input
                type="checkbox"
                checked={transportModes.includes(mode)}
                onChange={() => handleCheckboxChange(mode)}
              />
            </label>
            <br />
          </div>
        ))}
        <button type="button" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default EditNacinaTransporta;
