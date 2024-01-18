import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const transportModesList = ['pješke', 'dronom', 'automobilom', 'cross motorom', 'brodom', 'helikopterom'];

function EditNacinaTransporta() {
  console.log("Uredujemo nacine transporta pojedinog tragaca");
  const location = useLocation();
  const trackerUsername = location.state.tracker.username;
  const navigate = useNavigate();

  const [selectedTransportModes, setSelectedTransportModes] = useState({});


  // Handler for checkbox changes
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
      const response = await fetch(`/manager/mytrackers/${trackerUsername}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ transportModes: selectedTransportModes[trackerUsername] }),
      });

      if (response.ok) {
        console.log('Tracker transport modes updated successfully.');
        navigate('/manager', {state : location.state});
      } else {
        console.error('Failed to update tracker transport modes.');
      }
    } catch (error) {
      console.error('Error updating tracker transport modes:', error.message);
    }
    navigate("/manager", {state : {username: location.state.username}});
  };

  return (
    <div className='container'>
      <h2>Uređivanje načina transporta tragača {trackerUsername}</h2>
      <form>
        {transportModesList.map((mode) => (
          <div key={mode}>
            <label>
             {mode}
              <input
                type="checkbox"
                checked={(selectedTransportModes[trackerUsername] || []).includes(mode)}
                onChange={() => handleTransportModeCheckboxChange(trackerUsername, mode)}
              />
            </label>
            <br />
          </div>
        ))}
        <button type="button" onClick={handleSubmit}>
          Potvrdi
        </button>
      </form>
    </div>
  );
}

export default EditNacinaTransporta;
