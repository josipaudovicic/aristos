import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';  
import 'leaflet.heat';

const Map = () => {
    const [map, setMap] = useState(null);
    const [heatLayer, setHeatLayer] = useState(null);
    const [showDropdown1, setShowDropdown1] = useState(false);
    const [showDropdown2, setShowDropdown2] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [animalData, setAnimalData] = useState([]);
    const [speciesData, setSpeciesData] = useState([]);

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
        fetch(`/explorer/animals`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          })
            .then((response) => response.json())
            .then((data) => {setAnimalData(data);
                console.log(data);
                setShowDropdown2(false);
                setShowDropdown1(true);
            })
            .catch((error) => console.error('Error fetching user data:', error));

    }

    const handleSpecies = () => {
          fetch(`/explorer/animals/species`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              animal: "no animal"
            },
          })
            .then((response) => response.json())
            .then((data) => {setSpeciesData(data.sort());
                console.log(data);
                setShowDropdown1(false);
                setShowDropdown2(true);
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


    const handleOptionClick = (option) => {
        setSelectedOption(option);
        console.log(option);

        const fetchData = async () => {
            try {
                const response = await fetch(`/explorer/map/species`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        animal: option,
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
                    }));
            
                    const heatmapData = markers.map((marker) => [marker.latitude, marker.longitude, 100]);
                    if (map) {
                      const newHeatLayer = L.heatLayer(heatmapData, {
                          radius: 25
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

    const handleOptionClick2 = (option) => {
        setSelectedOption(option);

        const fetchData = async () => {
            try {
                const id = option.split(': ')[1];
                const response = await fetch(`/explorer/map/species/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
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
                  }));
          
                  const heatmapData = markers.map((marker) => [marker.latitude, marker.longitude, 100]);
                    if (map) {
                      const newHeatLayer = L.heatLayer(heatmapData, {
                          radius: 25
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

    const Dropdown1 = () => {
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
          textAlign: 'center',
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

          if (map && heatLayer) {
            map.removeLayer(heatLayer);
            setHeatLayer(null);
          }
        };
      
        console.log(animalData);

        return (
          <div style={dropdownStyle}>
            {selectedOption ? (<>
                <p style={selectedOptionStyle}>{selectedOption}</p>
                <div style={backButtonStyle} onClick={handleBackToList}>
                  Natrag na listu
                </div></>) : (<>
                {animalData && (
                  <div>
                    <p style={{ margin: '0', fontWeight: 'bold' }}>Vrste:</p>
                    {animalData.map((animal) => (
                      <div key={animal} style={optionStyle} onClick={() => handleOptionClick(animal)}>
                        {animal}
                      </div>))}
                  </div>)}
                </>)}
          </div>
        );
      };

      const Dropdown2 = () => {
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
          textAlign: 'center',
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

          if (map && heatLayer) {
            map.removeLayer(heatLayer);
            setHeatLayer(null);
          }
        };

        console.log(speciesData);
      
        return (
          <div style={dropdownStyle}>
            {selectedOption ? (<>
                <p style={selectedOptionStyle}>{selectedOption}</p>
                <div style={backButtonStyle} onClick={handleBackToList}>
                  Natrag na listu
                </div></>) : (<>
                {speciesData && (
                  <div>
                    <p style={{ margin: '0', fontWeight: 'bold' }}>Jedinke:</p>
                    {speciesData.map((species) => (
                      <div key={species} style={optionStyle} onClick={() => handleOptionClick2(species)}>
                        {species}
                      </div>))}
                  </div>)}</>)}
          </div>
        );
      };

    return (
        <div>
            <div id="map" style={{ height: '150vh', width: '150vh' }} />;
            <p style={pStyle}>Prikaži na karti: </p>
            <button onClick={handleAnimals} style={buttonStyle}>Po vrsti</button>
            <button onClick={handleSpecies} style={button2Style}>Po jedinci</button>
            {showDropdown1 && <Dropdown1 />}
            {showDropdown2 && <Dropdown2 />}
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
