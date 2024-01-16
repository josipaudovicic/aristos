import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const markerIcon = new L.Icon({
  iconUrl: 'https://leafletjs.com/examples/custom-icons/leaf-green.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const NoviZadatak = () => {
  const [map, setMap] = useState(null);
  const [lat, setLat] = useState();
  const [lng, setLng] = useState();
  const [task, setTask] = useState({
    taskText: '',
    username: '',
    animalName: '',
    startLocation: '',
    endLocation: '',
  });

  useEffect(() => {
    const initializeMap = () => {
      try {
        const mapContainer = document.getElementById('map');

        if (mapContainer && !mapContainer._leaflet_id) {
          const newMap = L.map(mapContainer, {
            center: [45.1, 16.3],
            zoom: 7,
          });

          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
            maxZoom: 15,
          }).addTo(newMap);

          newMap.on('click', handleMapClick);
          setMap(newMap);
        }
      } catch (error) {
        console.error('Error initializing map:', error);
      }
    };

    initializeMap();
  }, [lng, lat]);

  const handleMapClick = (e) => {
    const latitude = e.latlng.lat;
    const longitude = e.latlng.lng;
    const location = [parseFloat(latitude.toFixed(3)), parseFloat(longitude.toFixed(3))];
    console.log(location);
    console.log(task)
    setLat(latitude);
    setLng(longitude);
    if (!task.startLocation) {
      setTask((prevData) => ({ ...prevData, startLocation: location, endLocation: null }));
      console.log(task);
    } else if (!task.endLocation) {
      setTask((prevData) => ({ ...prevData, endLocation: location }));
    } else {
      setTask({
        ...task,
        startLocation: location,
        endLocation: null,
      });
    }
  };

  return (
    <div className="container">
      <h2>Unesi podatke za novi zadatak:</h2>
      <div>
        <label>Opis zadatka:</label>
        <input type="text" name="taskText" value={task.taskText} onChange={(e) => setTask({ ...task, taskText: e.target.value })} />
      </div>
      <div>
        <label>Ime tragača na zadatku:</label>
        <input type="text" name="username" value={task.username} onChange={(e) => setTask({ ...task, username: e.target.value })} />
      </div>
      <div>
        <label>Životinja:</label>
        <input type="text" name="animalName" value={task.animalName} onChange={(e) => setTask({ ...task, animalName: e.target.value })} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '16px' }}>
      <div id="map" style={{ height: '300px', width: '100%' }}></div>
      {task.startLocation && (
        <div>
          <h4>Start Location:</h4>
          <p>{`Latitude: ${task.startLocation[0]}, Longitude: ${task.startLocation[1]}`}</p>
        </div>
      )}
      {task.endLocation && (
        <div>
          <h4>End Location:</h4>
          <p>{`Latitude: ${task.endLocation[0]}, Longitude: ${task.endLocation[1]}`}</p>
        </div>
        )}
      </div>
      <button onClick={() => console.log(task)}>Log Task</button>
    </div>
  );
};  

export default NoviZadatak;
