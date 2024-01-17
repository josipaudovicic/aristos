import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';  
import 'leaflet.heat';
import polyline from '@mapbox/polyline';

function MapT() {
  const location = useLocation();
  const username = location.state?.username;
  const [action, setAction] = useState([]);
  const [map, setMap] = useState(null);
  const [trackers, setTrackers] = useState([]);
  const [tasks, setTasks] = useState([]);
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


    useEffect(() => {
      const initializeMap = () => {
        try {
          const mapContainer = document.getElementById('map');
  
          if (mapContainer && !mapContainer._leaflet_id) {
            const map = L.map(mapContainer, {
              center: [45.1, 16.3],
              zoom: 7,
            });
  
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
              attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
              maxZoom: 15,
            }).addTo(map);

            setMap(map);
          }
        } catch (error) {
          console.error('Error initializing map:', error);
        }
      };
  
      initializeMap();
    }, []);


    useEffect(() => {
      fetch(`/tracker/action/tasks`, {	
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          username: username,
          actionName: action.actionName,
        },
      })
        .then((response) => response.json())
        .then((data) => {setTasks(data);
        console.log(data);})
        .catch((error) => {
          console.error('Error:', error);
        });
      }, [username, action.actionName]);


    const handleTrackers = () => {
      console.log(markers);
      map.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          map.removeLayer(layer);
        }
      });

      map.eachLayer((layer) => {
        if (layer instanceof L.Polyline) {
          map.removeLayer(layer);
        }
      });
      
      console.log(markers);

      fetch(`/tracker/action/trackers`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          username: username,
          actionName: action.actionName,
        },
      })
      .then((response) => response.json())
      .then((data) => {setTrackers(data);
        data.forEach((tracker) => {
          const newMarker = 
          L.marker([tracker.latitude, tracker.longitude], { icon: markerIcon }).addTo(map).bindPopup(tracker.username).openPopup();
        markers.push(newMarker);})})
      .catch((error) => console.error('Error:', error)); 

      console.log(markers);
    };

    const handleClick = (task) => {
      map.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          map.removeLayer(layer);
        }
      });      

      map.eachLayer((layer) => {
        if (layer instanceof L.Polyline) {
          map.removeLayer(layer);
        }
      });

      const marker = L.marker([task.animalLatitude, task.animalLongitude], { icon: markerIcon }).addTo(map).bindPopup(task.animalName).openPopup();
      markers.push(marker);
      console.log(task);
      fetch(`http://router.project-osrm.org/route/v1/${action.vehicle}/${task.startLongitude},${task.startLatitude};${task.endLongitude},${task.endLatitude}?overview=false&steps=true&geometries=polyline`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
          data.routes[0].legs[0].steps.forEach((step) => {
          const decodedPolyline = polyline.decode(step.geometry);
          
          L.polyline(decodedPolyline, { color: 'blue' }).addTo(map);
        })})
      .catch((error) => console.error('Error:', error));

    };

    const handleDoneTask = (task) => {
      map.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          map.removeLayer(layer);
        }
      });
      

      fetch(`/tracker/action/task/post`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          taskId: task.taskId,
        },
      });

      const updatedTasks = tasks.map((t) =>
      t.taskId === task.taskId ? { ...t, completed: true } : t
      );
      setTasks(updatedTasks);
    };


    const pStyle = {
      position: 'fixed',
      top: '35px',
      left: '1px',
      padding: '8px 16px',
  }

  const p2Style = {
    position: 'fixed',
    top: '60px',
    left: '1px',
    padding: '8px 16px',
}

  const h3Style = {
    position: 'fixed',
    top: '0px',
    left: '1px',
    padding: '8px 16px',
}

const buttonStyle = {
  position: 'fixed',
  top: '120px',
  left: '10px',
  padding: '8px 16px',
  backgroundColor: '#5C5C5C',
  color: '#fff',
  borderRadius: '4px',
  cursor: 'pointer',
  width: '190px',
};

const checkboxStyle = {
  position: 'fixed',
  top: '120px',
  right: '10px',
  backgroundColor: 'white',
  borderRadius: '6px',
  width: '180px',
  borderBox: '1px solid black',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  padding: '5px',
};

const bstyle = {
  cursor: 'pointer',
  padding: '1px 4px',
};

const text = {
  listStyle: 'none', 
  display: 'flex',
  alignItems: 'center', 
  textAlign: 'left',
  marginLeft: '-15px',
  span: {
    marginRight: '10px', 
    cursor: 'pointer', 
  },
};

const p3Style = {
  fontWeight: 'bold',
  marginLeft: '-25px',
  marginBottom: '5px',
};

  return (
    <div>
      <div id="map" style={{ height: '150vh', width: '150vh' }} />;
      <h3 style={h3Style}>Ime akcije: {action.actionName}</h3>
      <p style={pStyle}>Tvoj istraživač: {action.explorerName}</p>
      <p style={p2Style}>Tvoje vozilo: {action.vehicleName}</p>
      <button style={buttonStyle} onClick={handleTrackers}>Ostali tragači na akciji</button>
      <div style={checkboxStyle}>
        <ul>
          <p style={p3Style}>Popis zadataka:</p>
          {tasks.map((task) => (
            <li style={{...text, color: task.completed ? 'green' : 'inherit',}} key={task.taskId} onClick={() => handleClick(task)}>
            <span style={text.span}>{task.taskText}</span>
            {!task.completed && (<button onClick={() => handleDoneTask(task)} style={bstyle}>✔</button>)}
            </li>
          ))}
        </ul>
      </div>
    </div>
    );
}

export default MapT;