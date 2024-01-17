import React, { useState, useEffect } from 'react';
//import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useNavigate, useLocation } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const NoviZadatak = () => {
  let startLocation = null;
  let endLocation = null;
  const location = useLocation();
  const navigate = useNavigate();
  const actionName = location.state?.actionName || '';
  const username = location.state?.username || '';
  const [users, setUsers] = useState([]);
  const [animals, setAnimals] = useState([]);
  const [done, setDone] = useState(false);
  const [task, setTask] = useState({
    taskText: '',
    username: '',
    animalName: '',
    startLocation: '',
    endLocation: '',
  });
  let i = 0;
  let markers = [];

  const markerIcon = new L.Icon({
    iconUrl: 'https://leafletjs.com/examples/custom-icons/leaf-red.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
    iconColor: 'red'
  });

  useEffect(() => {
    fetch('/explorer/action/info/tasks/newTask', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        actionName: actionName,
      },
    })
    .then((response) => response.json())
    .then((data) => {setUsers(data.users);
                    setAnimals(data.animals);
                    console.log(data);
                    console.log(data.users);
                })
    .catch((error) => console.error('Error fetching user data for editing:', error));
  }, []);

  useEffect(() => {
    const initializeMap = () => {
      try {
        const mapContainer = document.getElementById('map');
        
        

        if (mapContainer && !mapContainer._leaflet_id) {
          const newMap = L.map(mapContainer, {
            center: [45.1, 16.3],
            zoom: 6,
          });

          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
            maxZoom: 15,
          }).addTo(newMap);

          newMap.on('click', function(e) {
            const marker = L.marker([e.latlng.lat, e.latlng.lng], { icon: markerIcon }).addTo(newMap);
            markers.push(marker);

            const latitude = e.latlng.lat;
            const longitude = e.latlng.lng;
            const loc = [latitude.toFixed(3), longitude.toFixed(3)];
            
            if (startLocation === null && endLocation === null && i < 2) {
              setTask((prevData) => ({ ...prevData, startLocation: loc, endLocation: null }));
              startLocation = loc;
              i++;
            } else if (endLocation === null && i < 2) {
              setTask((prevData) => ({ ...prevData, endLocation: loc }));
              i++;
              setDone(true);
            } else if (i === 2) {
              startLocation = null;
              endLocation = null;
              task.startLocation = '';
              task.endLocation = '';
              markers.forEach(marker => marker.remove());
              markers = [];
              setDone(false);
              i = 0;
            }
          });
        }
      } catch (error) {
        console.error('Error initializing map:', error);
      }
    };
  
    initializeMap();
    console.log(task.startLocation);
    console.log(task.endLocation);
    console.log(task);
  }, [task]);

  const handleSave = () => {
    console.log(markers.length);
    console.log(done);
    if (!done) {
      alert('Popunite sva polja na mapi');
      return;
    }
  
    if (
      !task.taskText ||
      !task.username ||
      !task.animalName ||
      !task.startLocation ||
      !task.endLocation
    ) {
      alert('Popunite sva obavezna polja');
      return;
    }
  
    try {
      fetch(`/explorer/action/info/tasks/newTask`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          actionName: actionName,
        },
        body: JSON.stringify({
          taskText: task.taskText,
          username: task.username,
          animalName: task.animalName,
          startLocationLat: task.startLocation[0],
          startLocationLng: task.startLocation[1],
          endLocationLat: task.endLocation[0],
          endLocationLng: task.endLocation[1],
        }),
      });
    } catch (error) {
      console.error('Error saving task:', error);
    }
    navigate(`/explorer/action/info/tasks`, { state: { actionName: actionName, username: username } });
  };

  return (
    <div className="container">
      <h2>Unesi podatke za novi zadatak:</h2>
      <div>
        <label>Opis zadatka:</label>
        <input type="text" name="taskText" value={task.taskText} onChange={(e) => setTask({ ...task, taskText: e.target.value })} />
      </div>
      <div>
        <label>Ime tragača na zadatku:
          <select id="dropdown" value={task.username} onChange={(e) => setTask({ ...task, username: e.target.value })}>
                <option value=""></option>
                {users.map((action) => (
              <option key={action} value={action}>
                {action}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div>
        <label>Životinja:
        <select id="dropdown" value={task.animalName} onChange={(e) => setTask({ ...task, animalName: e.target.value })}>
                <option value=""></option>
                {animals.map((action) => (
              <option key={action} value={action}>
                {action}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '16px' }}>
      <div id="map" style={{ height: '300px', width: '100%' }}></div>
      </div>
      <button onClick={handleSave}>Dodaj zadatak</button>
    </div>
  );
};  

export default NoviZadatak;
