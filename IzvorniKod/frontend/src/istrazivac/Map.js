import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';  
import 'leaflet.heat';

const Map = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const actionName = location.state?.action.actionName || '';
    const username = location.state?.username || '';
    const [trackers, setTrackers] = useState();
    const [vehicles, setVehicles] = useState();
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);

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
            }
          } catch (error) {
            console.error('Error initializing map:', error);
          }
        };
    
        initializeMap();
      }, []);

    const handleAnimals  = () => {
        navigate('/explorer/map', {state : {actionName: actionName}});
    }

    const handleInfo = () => {
        navigate(`/explorer/action/${actionName}/info`, {state : {actionName: actionName}});
    }

    const handleTrackers = () => {
        fetch(`/explorer/action/${actionName}/trackers`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setTrackers(data.trackers);
                setVehicles(data.vehicles);
                setShowDropdown(true);
            })
            .catch((error) => console.error('Error fetching user data:', error));
    };

    const pStyle = {
        position: 'fixed',
        top: '0px',
        left: '1px',
        padding: '8px 16px',
    }

    const buttonStyle = {
        position: 'fixed',
        top: '45px',
        left: '20px',
        padding: '8px 16px',
        backgroundColor: '#5C5C5C',
        color: '#fff',
        borderRadius: '4px',
        cursor: 'pointer',
        width: '180px',
    };

    const button2Style = {
        position: 'fixed',
        top: '85px',
        left: '20px',
        padding: '8px 16px',
        backgroundColor: '#5C5C5C',
        color: '#fff',
        borderRadius: '4px',
        cursor: 'pointer',
        width: '180px',
    };

    const b2Style = {
        position: 'fixed',
        bottom: '20px',
        left: '20px',
        padding: '6px 16px',
        width: '70px',
        fontSize: '20px',
    };

    const handleOptionClick = (option) => {
        setSelectedOption(option);

        const fetchData = async () => {
            try {
                const response = await fetch(`/explorer/action/${actionName}/tracker`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        username: option,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }

                const data = await response.json();
                console.log(data);

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

                    const markers = data.map((marker) => ({
                        latitude: marker.latitude,
                        longitude: marker.longitude,
                        vehicleId: marker.vehicleId,
                    }));
            
                    const heatmapData = markers.map((marker) => [marker.latitude, marker.longitude, marker.vehicleId * 5]);

                    L.heatLayer(heatmapData, {
                        radius: 25
                    }).addTo(map);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    };

    const handleOptionClick2 = (option) => {
        setSelectedOption(option);

        const fetchData = async () => {
            try {
                const response = await fetch(`/explorer/action/${actionName}/vehicle`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        vehicle: option,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }

                const data = await response.json();
                console.log(data);

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

                    const markers = data.map((marker) => ({
                        latitude: marker.latitude,
                        longitude: marker.longitude,
                        vehicleId: marker.vehicleId,
                    }));
            
                    const heatmapData = markers.map((marker) => [marker.latitude, marker.longitude, marker.vehicleId * 5]);

                    L.heatLayer(heatmapData, {
                        radius: 25
                    }).addTo(map);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    };

    const Dropdown = () => {
        const dropdownStyle = {
          position: 'absolute',
          top: '165px',
          left: '8px',
          backgroundColor: '#fff',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          borderRadius: '4px',
          padding: '8px',
          zIndex: '1000',
          border: '1px solid #ddd',
          minWidth: '180px',
        };
      
        const optionStyle = {
          cursor: 'pointer',
          padding: '8px',
          borderBottom: '1px solid #eee',
          transition: 'background-color 0.3s',
          Width: '180px',
        };
      
        const selectedOptionStyle = {
          ...optionStyle,
          backgroundColor: '#f0f0f0',
          fontWeight: 'bold',
          Width: '180px',
        };
      
        const backButtonStyle = {
          cursor: 'pointer',
          padding: '8px',
          backgroundColor: '#f0f0f0',
          borderRadius: '4px',
          marginTop: '8px',
          textAlign: 'center',
          color: '#333',
          Width: '180px',
        };
      
        const handleBackToList = () => {
          setSelectedOption(null);
        };
      
        return (
          <div style={dropdownStyle}>
            {selectedOption ? (<>
                <p style={selectedOptionStyle}>Odabrano: {selectedOption.username || selectedOption.vehicleName}</p>
                <div style={backButtonStyle} onClick={handleBackToList}>
                  Natrag na listu
                </div></>) : (<>
                {trackers && (
                  <div>
                    <p style={{ margin: '0', fontWeight: 'bold' }}>Trackers:</p>
                    {trackers.map((tracker) => (
                      <div key={tracker.username} style={optionStyle} onClick={() => handleOptionClick(tracker.username)}>
                        {tracker.username}
                      </div>))}
                  </div>)}
                {vehicles && (
                  <div>
                    <p style={{ margin: '0', fontWeight: 'bold' }}>Vehicles:</p>
                    {vehicles.map((vehicle) => (
                      <div key={vehicle.vehicleId} style={optionStyle} onClick={() => handleOptionClick2(vehicle.vehicleName)}>
                        {vehicle.vehicleName}
                      </div>))}
                  </div>)}</>)}
          </div>
        );
      };

    return (
        <div>
            <div id="map" style={{ height: '150vh', width: '150vh' }} />;
            <p style={pStyle}>Prikaži na karti: </p>
            <button onClick={handleTrackers} style={buttonStyle}>Tragače</button>
            <button onClick={handleAnimals} style={button2Style}>Životinje</button>
            {showDropdown && <Dropdown />}
            <button onClick={handleInfo} style={b2Style}>Info</button>
        </div>
    );
};

const App = () => {
    return (
        <div className="App">
            <Map />
        </div>
    );
};

export default App;
