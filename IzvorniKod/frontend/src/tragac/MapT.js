import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
//import L from 'leaflet';
import 'leaflet/dist/leaflet.css';  
import 'leaflet.heat';

function MapT() {
  const location = useLocation();
  const username = location.state?.username;
  const [action, setAction] = useState([]);

  
  useEffect(() => {
    fetch(`/tracker/action`, {	
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        username: username,
      },
    })
      .then((response) => response.json())
      .then((data) => {setAction(data);
      console.log(data);})
      .catch((error) => {
        console.error('Error:', error);
      });
    }, [username]);

  return (
    <div>
      <h2>Ime akcije: {action.actionName}</h2>
      <p>Tvoj istraživač: {action.explorerName}</p>
      <p>Tvoje vozilo: {action.vehicleName}</p>
      <div id="map" style={{ height: '150vh', width: '150vh' }} />;
    </div>
    );
}

export default MapT;