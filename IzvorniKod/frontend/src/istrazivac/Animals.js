import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Animals() {
  const navigate = useNavigate();
  const [animalData, setAnimalData] = useState([]);
  const [speciesData, setSpeciesData] = useState([]);
  const [showListSpecies, setShowListSpecies] = useState(false);
  const [showListIndividual, setShowListIndividual] = useState(false);

  useEffect(() => {
    fetch(`/explorer/animals`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => setSpeciesData(data))
      .catch((error) => console.error('Error fetching user data:', error));
  }, []);

  useEffect(() => {
    fetch(`/explorer/animals/species`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        animal: "no animal"
      },
    })
      .then((response) => response.json())
      .then((data) => setAnimalData(data.sort()))
      .catch((error) => console.error('Error fetching user data:', error));
    }, []);


  const regularButtonStyle = {
    padding: '18px 18px',
    fontSize: 20,
    cursor: 'pointer',
    margin: '10px',
    marginTop: '-20px',
    width: '200px',
  };

  const listStyle = {
    position: 'absolute',
    top: '70px',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: '#fff',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    borderRadius: '4px',
    padding: '8px',
    zIndex: '1000',
  };

  const optionStyle = {
    cursor: 'pointer',
    padding: '8px',
    borderBottom: '1px solid #eee',
    transition: 'background-color 0.3s',
  };

  const handleShowListSpecies = () => {
    setShowListSpecies(!showListSpecies);
    setShowListIndividual(false);
  };

  const handleShowListIndividual = () => {
    setShowListIndividual(!showListIndividual);
    setShowListSpecies(false);
  };

  const handleOptionClick = (animal) => {
    console.log(`Clicked on animal: ${animal}`);
    fetch(`/explorer/map/species`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        animal: animal,
      },
    })
    .then((response) => response.json())
    .then((data) => {
        const newAnimal = data;
        navigate(`/explorer/map/animal`, {state: { animal: newAnimal}});
    })
    .catch((error) => console.error('Error fetching user data:', error));

  };

  const handleOptionClick2 = (animal) => {
    console.log(`Clicked on animal: ${animal}`);
    const id = animal.split(': ')[1];

    fetch(`/explorer/map/species/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.json())
    .then((data) => {
        const newAnimal = data;
        navigate(`/explorer/map/animal`, {state: { animal: newAnimal}});
    })
    .catch((error) => console.error('Error fetching user data:', error));

  };

  return (
    <div style={{ textAlign: 'center', marginTop: '-100px', position: 'relative' }}>
      <button onClick={handleShowListSpecies} style={regularButtonStyle}>Karta po vrsti</button>
      {showListSpecies && (
        <div style={listStyle}>
          <div style={{ margin: '0', fontWeight: 'bold' }}></div>
          {speciesData.map((animal) => (
            <div key={animal} style={optionStyle} onClick={() => handleOptionClick(animal)}>
              {animal}
            </div>))}
        </div>)}
      <button onClick={handleShowListIndividual} style={regularButtonStyle}>Karta po jedinci</button>
      {showListIndividual && (
        <div style={listStyle}>
          <div style={{ margin: '0', fontWeight: 'bold' }}></div>
          {animalData.map((animal) => (
            <div key={animal} style={optionStyle} onClick={() => handleOptionClick2(animal)}>
              {animal}
            </div>))}
        </div>)}
    </div>
  );
}

export default Animals;