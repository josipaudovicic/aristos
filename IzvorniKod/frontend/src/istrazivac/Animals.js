import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Animals() {
  const navigate = useNavigate();
  const [showListSpecies, setShowListSpecies] = useState(false);
  const [showListIndividual, setShowListIndividual] = useState(false);

  const redirectToPage = async (path) => {
      try {
      let response;
      if (path === "/explorer/map/species") {
        response = await fetch(`/explorer/map/species`);
      } else {
        response = await fetch(`/explorer/map/individual`);
      }

      const data = await response.json();
      navigate(`/${path}`, {state: {data: data}});

    } catch (error) {
      console.error(`Error fetching`, error.message);
    }
  };

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
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px', position: 'relative' }}>
      <button onClick={handleShowListSpecies} style={regularButtonStyle}>
        Karta po vrsti
      </button>
      {showListSpecies && (
        <div style={listStyle}>
          <div style={{ margin: '0', fontWeight: 'bold' }}>Animals:</div>
          {['a', 'b', 'c', 'd'].map((animal) => (
            <div key={animal} style={optionStyle} onClick={() => handleOptionClick(animal)}>
              {animal}
            </div>
          ))}
        </div>
      )}

      <button onClick={handleShowListIndividual} style={regularButtonStyle}>
        Karta po jedinci
      </button>
      {showListIndividual && (
        <div style={listStyle}>
          <div style={{ margin: '0', fontWeight: 'bold' }}>Animals:</div>
          {['e', 'f', 'g', 'h'].map((animal) => (
            <div key={animal} style={optionStyle} onClick={() => handleOptionClick(animal)}>
              {animal}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Animals;