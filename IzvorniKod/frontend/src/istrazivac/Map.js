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
    const actions = location.state?.actions;
    const sentRequest = location.state?.sentRequest;
    const [trackers, setTrackers] = useState();
    const [map, setMap] = useState(null);
    const [heatLayer, setHeatLayer] = useState(null);
    const [vehicles, setVehicles] = useState();
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isHovered, setIsHovered] = useState(false);

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

    const handleAnimals  = () => {
        navigate('/explorer/map');
    }

    const handleInfo = () => {
      console.log(sentRequest);
        navigate(`/explorer/action/${actionName}/info`, {state : {actionName: actionName, username: username, actions: actions, sentRequest: sentRequest}});
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
        right: '40px',
        padding: '8px 16px',
    }

    const buttonStyle = {
        position: 'fixed',
        top: '45px',
        right: '15px',
        padding: '8px 16px',
        color: '#fff',
        borderRadius: '4px',
        cursor: 'pointer',
        width: '180px',
    };

    const button2Style = {
        position: 'fixed',
        top: '85px',
        right: '15px',
        padding: '8px 16px',
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
        width: '100px',
        fontSize: '20px',
        backgroundColor: isHovered ? '#024D44' : 'beige', 
        color: isHovered ? 'beige' : '#024D44', 
        cursor: 'pointer', 
    };

    const handleOptionClick = (option) => {
      map.eachLayer((layer) => {
        if (layer instanceof L.CircleMarker) {
          map.removeLayer(layer);
        }
      });
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
    
                if (mapContainer) {
                    const markers = data.map((marker) => ({
                        latitude: marker.latitude,
                        longitude: marker.longitude,
                        vehicleId: marker.vehicleId,
                    }));
            
                    const heatmapData = markers.map((marker) => [marker.latitude, marker.longitude, 100]);
                    if (map) {
                      const newHeatLayer = L.heatLayer(heatmapData, {
                          radius: markers[0].vehicleId * 8
                      }).addTo(map);

                      setHeatLayer(newHeatLayer);

                      console.log(data[0].latestLatitude);
                      console.log(data[0].latestLongitude);
                      L.circleMarker([data[0].latestLatitude, data[0].latestLongitude], {
                        color: 'black',
                        fillColor: 'grey',
                        fillOpacity: 1,
                        radius: 5
                      }).addTo(map);
                    } else {
                      alert('Map not initialized');
                    }
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
    
                if (mapContainer) {
                  const markers = data.map((marker) => ({
                      latitude: marker.latitude,
                      longitude: marker.longitude,
                      vehicleId: marker.vehicleId,
                  }));
          
                  const heatmapData = markers.map((marker) => [marker.latitude, marker.longitude, 100]);
                    if (map) {
                      const newHeatLayer = L.heatLayer(heatmapData, {
                          radius: markers[0].vehicleId * 8
                      }).addTo(map);

                    setHeatLayer(newHeatLayer);
                  } else {
                    alert('Map not initialized');
                  }
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
          right: '8px',
          backgroundColor: '#fff',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          borderRadius: '4px',
          padding: '8px',
          zIndex: '1000',
          border: '1px solid #ddd',
          minWidth: '180px',
          maxWidth: '180px',
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
          map.eachLayer((layer) => {
            if (layer instanceof L.CircleMarker) {
              map.removeLayer(layer);
            }
          });
          setSelectedOption(null);

          if (map && heatLayer) {
            map.removeLayer(heatLayer);
            setHeatLayer(null);
          }
        };
      
        return (
          <div style={dropdownStyle}>
            {selectedOption ? (<>
                <p style={selectedOptionStyle}>Odabrano: {selectedOption}</p>
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
            {location.state?.action.actionActive === "true" && (
            <button onClick={handleInfo} style={b2Style} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>Info</button>)}
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
