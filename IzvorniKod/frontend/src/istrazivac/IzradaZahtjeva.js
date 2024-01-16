import React, { useState, useEffect }  from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

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
          fetch('/explorer/action/info/requests', {
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
        console.log(selectedVehicles);
          alert('Zahtjev je poslan');

          fetch('/explorer/action/info/requests/post', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              actionName: actionName,
            },
            body: JSON.stringify({ selectedVehicles }),
          });

          navigate(`/explorer/action/${actionName}/info`, {state: { actionName: actionName, username: username, data: data}})
      }; 
      

    const regularButtonStyle = {
        padding: '8px 18px',
        cursor: 'pointer',
      };

      const label = {
        textAlign: 'left',
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
              <div key={vehicle.vehicleId}>
                <input
                  type="checkbox"
                  id={vehicle.vehicleId}
                  onChange={() => handleCheckboxChange(vehicle.vehicleId)}
                  checked={selectedVehicles.includes(vehicle.vehicleId)}
                  />
                  <label htmlFor={vehicle.vehicleId}>{vehicle.vehicleName}</label>
              </div>
              ))}
          </label>
        </form>

        <button onClick={() => handleSubmit()} style={regularButtonStyle}>Pošalji zahtjev</button>
    </div>
    );
}

export default IzradaZahtjeva;