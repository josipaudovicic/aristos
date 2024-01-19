import React, { useState, useEffect }  from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../config';

function IzradaZahtjeva(){
    const navigate = useNavigate();
    const location = useLocation();
    const actionName = location.state?.actionName;
    const username = location.state?.username;
    const data = location.state?.data;
    const [vehicles, setVehicles] = useState([]);
    const [selectedVehicles, setSelectedVehicles] = useState([]);

  useEffect(() => {
    const fetchVehicles = () => { 
          fetch(`${BASE_URL}/explorer/action/info/requests`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            }
          })
          .then((response) => response.json())
          .then((data) => setVehicles(data))
          .catch((error) => console.error('Error fetching vehicle data:', error));
      };
      fetchVehicles();
  }, []);
    
  const handleCheckboxChange = (vehicleId) => {
    setSelectedVehicles((prevSelected) => {
        if (prevSelected.includes(vehicleId)) {
            return prevSelected.filter((id) => id !== vehicleId);
        } else {
            return [...prevSelected, vehicleId];
        }
    });
};
    
      const handleSubmit = () => {
        window.confirm('Jeste li sigurni da želite poslati zahtjev?\nZahtjev možete poslati samo jednom!');
        console.log(selectedVehicles);
          alert('Zahtjev je poslan');

          fetch(`${BASE_URL}/explorer/action/info/requests/post`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              actionName: actionName,
            },
            body: JSON.stringify({ selectedVehicles }),
          });

          navigate(`/explorer/action/${actionName}/info`, {state: { actionName: actionName, username: username, data: data, sentRequest: "true"}})
      }; 
      

    const regularButtonStyle = {
        padding: '8px 18px',
        cursor: 'pointer',
      };

      const label = {
        display: 'block',
        marginBottom: '10px', 
      };

      const checkboxStyle = {
        marginRight: '5px', 
      };

      const p = {
        textAlign: 'left',
        marginLeft: '-250px',
        marginTop: '-10px',
        fontWeight: 'bold',
      };

    return (
    <div className='container'>
        <h2>Zahtjev za tragačima</h2>
        <form>
          <p style={p}>Odaberite vozila:</p>
          <label style={label}>
            {vehicles.map((vehicle) => (
              <label key={vehicle.vehicleId} style={label}>
                {vehicle.vehicleName} 
              <input
                type="checkbox"
                id={vehicle.vehicleId}
                onChange={() => handleCheckboxChange(vehicle.vehicleId)}
                checked={selectedVehicles.includes(vehicle.vehicleId)}
                style={checkboxStyle}
              />
            </label>
              ))}
          </label>
        </form>

        <button onClick={() => handleSubmit()} style={regularButtonStyle}>Pošalji zahtjev</button>
    </div>
    );
}

export default IzradaZahtjeva;