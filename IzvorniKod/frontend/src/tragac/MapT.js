import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./styles.css";
import L from 'leaflet';

const MapT = () => {
  const navigate = useNavigate();
  const [action, setAction] = useState(null);
  const [username, setUsername] = useState('');
  const [animals, setAnimals] = useState([]);
  const [searchers, setSearchers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [checkedTasks, setCheckedTasks] = useState([]);
  const [selectedAnimals, setSelectedAnimals] = useState([]);
  const [selectedSearchers, setSelectedSearchers] = useState([]);
  const [map, setMap] = useState(null);
  const [animalPositions, setAnimalPositions] = useState([]);
  const [searcherPositions, setSearcherPositions] = useState([]);

  useEffect(() => {

    const { action: actionData, username: usernameData } = navigate?.location?.state || {};

    setAction(actionData);
    setUsername(usernameData);


    const fetchAnimals = async () => {
      try {
        const response = await fetch(`/action/${actionData.actionId}/animals`);
        const data = await response.json();
        setAnimals(data);
      } catch (error) {
        console.error('Error fetching animals:', error);
      }
    };

    const fetchSearchers = async () => {
      try {
        const response = await fetch(`/action/${actionData.actionId}/searchers`);
        const data = await response.json();
        setSearchers(data);
      } catch (error) {
        console.error('Error fetching searchers:', error);
      }
    };

    const fetchTasks = async () => {
      try {
        const response = await fetch(`/action/${actionData.actionId}/tasks`);
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchAnimals();
    fetchSearchers();
    fetchTasks();
  }, [navigate]);

  useEffect(() => {
    const refreshPositions = async () => {
      try {
        const animalResponse = await fetch(`/action/${action.actionId}/animalPositions`);
        // trenutne pozicije svake životinje na akciji
        const animalPositionsData = await animalResponse.json();

        const searcherResponse = await fetch(`/action/${action.actionId}/searcherPositions`);
        // trenutne pozicije svakog tragača na akciji
        const searcherPositionsData = await searcherResponse.json();

        setAnimalPositions(animalPositionsData);
        setSearcherPositions(searcherPositionsData);
      } catch (error) {
        console.error('Error fetching positions:', error);

      }
    };

    const intervalId = setInterval(refreshPositions, 5000);

    return () => clearInterval(intervalId);
  }, [action]);

  useEffect(() => {
    // Initialize map and update markers when AnimalPositions or SearcherPositions change
    if (!map && animalPositions.length > 0 && searcherPositions.length > 0) {
      const usernameToFind = username;
      const desiredUserPosition = searcherPositions.find(position => position.user.username === usernameToFind);

      if (desiredUserPosition) {
        const latitude = desiredUserPosition.latitude;
        const longitude = desiredUserPosition.longitude;

        console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
        const newMap = L.map(mapContainerRef.current).setView([latitude, longitude], 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors'
        }).addTo(newMap);

        // Add markers for selected animals
        selectedAnimals.forEach(animalId => {
          const selectedAnimalPosition = animalPositions.find(position => position.animal.animalId === animalId);
          if (selectedAnimalPosition) {
            L.marker([selectedAnimalPosition.latitude, selectedAnimalPosition.longitude])
              .addTo(newMap)
              .bindPopup(selectedAnimalPosition.animal.animalName);
          }
        });

        // Add markers for selected searchers
        selectedSearchers.forEach(searcherUsername => {
          const selectedSearcherPosition = searcherPositions.find(position => position.user.username === searcherUsername);
          if (selectedSearcherPosition) {
            L.marker([selectedSearcherPosition.latitude, selectedSearcherPosition.longitude])
              .addTo(newMap)
              .bindPopup(selectedSearcherPosition.user.username);
          }
        });

        setMap(newMap);
      }
    } else if (map) {

      map.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          layer.remove();
        }
      });

      selectedAnimals.forEach(animalId => {
        const selectedAnimalPosition = animalPositions.find(position => position.animal.animalId === animalId);
        if (selectedAnimalPosition) {
          L.marker([selectedAnimalPosition.latitude, selectedAnimalPosition.longitude])
            .addTo(map)
            .bindPopup(selectedAnimalPosition.animal.animalName);
        }
      });

      selectedSearchers.forEach(searcherUsername => {
        const selectedSearcherPosition = searcherPositions.find(position => position.user.username === searcherUsername);
        if (selectedSearcherPosition) {
          L.marker([selectedSearcherPosition.latitude, selectedSearcherPosition.longitude])
            .addTo(map)
            .bindPopup(selectedSearcherPosition.user.username);
        }
      });
    }
  }, [map, animalPositions, searcherPositions, selectedAnimals, selectedSearchers]);


  const handleAnimalButtonClick = (animalId) => {
    setSelectedAnimals((prevSelectedAnimals) => {
      if (prevSelectedAnimals.includes(animalId)) {
        return prevSelectedAnimals.filter((id) => id !== animalId);
      } else {
        return [...prevSelectedAnimals, animalId];
      }
    });
  };


  const handleSearcherButtonClick = (searcherUsername) => {
    setSelectedSearchers((prevSelectedSearchers) => {
      if (prevSelectedSearchers.includes(searcherUsername)) {
        return prevSelectedSearchers.filter((username) => username !== searcherUsername);
      } else {
        return [...prevSelectedSearchers, searcherUsername];
      }
    });
  };

  // Check if all tasks are checked
  const allTasksChecked = tasks.every((task) => checkedTasks.includes(task.taskId));

  // Render component
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Left side with buttons for animals and searchers */}
      <div style={{ width: '15%', padding: '10px', boxSizing: 'border-box' }}>
        <h2>Animals</h2>
        {/* Render animal buttons */}
        {animals.map((animal) => (
          <button
            key={animal.animalId}
            onClick={() => handleAnimalButtonClick(animal.animalId)}
            style={{ width: '100%', marginBottom: '10px', backgroundColor: selectedAnimals.includes(animal.animalId) ? 'lightgreen' : 'inherit' }}
          >
            {animal.name}
          </button>
        ))}
        <h2>Searchers</h2>
        {/* Render searcher buttons */}
        {searchers.map((searcher) => (
          <button
            key={searcher.username}
            onClick={() => handleSearcherButtonClick(searcher.username)}
            style={{ width: '100%', marginBottom: '10px', backgroundColor: selectedSearchers.includes(searcher.username) ? 'lightblue' : 'inherit' }}
          >
            {searcher.name}
          </button>
        ))}
      </div>
      {/* Map */}
      <div ref={mapContainerRef} style={{ height: '400px', width: '70%' }}></div>

      {/* Right side with tasks and checkboxes */}
      <div style={{ width: '15%', padding: '10px', boxSizing: 'border-box' }}>
        <h2>Tasks</h2>
        {/* Render tasks with checkboxes */}
        {tasks.map((task) => (
          <div key={task.taskId}>
            <label>
              <input
                type="checkbox"
                checked={checkedTasks.includes(task.taskId)}
                onChange={() => handleCheckboxChange(task.taskId)}
              />
              {task.taskText}
            </label>
          </div>
        ))}
        {/* Display message when all tasks are checked */}
        {allTasksChecked && <p>Svi zadatci završeni. Može se završiti akcija.</p>}
      </div>
    </div>
  );
};

export default MapT;
