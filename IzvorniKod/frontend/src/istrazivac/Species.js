import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function Species () {
    const [animalData, setAnimalData] = useState({});
    const navigate = useNavigate();
    const location = useLocation();
    const username = location.state?.username;

    useEffect(() => {
        fetch(`/explorer/animals`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((response) => response.json())
          .then((data) => setAnimalData(data))
          .catch((error) => console.error('Error fetching user data:', error));
      }, []);
      console.log(animalData)
    
      const handleClick = (animal) => {
        console.log(username);
        navigate('/explorer/animals/species', {state : {animal : animal, username: username}});
      };

      const renderAnimalList = () => {
        const elements = [];
        for (let i = 0; i < animalData.length; i++) {
          const animalName = animalData[i];
          elements.push(
            <li
              key={i}
              onClick={() => handleClick(animalName)}
              style={{
                cursor: 'pointer',
                marginBottom: '10px',
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '5px',
                transition: 'background-color 0.3s ease-in-out',
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#f0f0f0')}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              {animalName}
            </li>
          );
        }
        return elements;
    };

   return(
    <div className='container' style={{ textAlign: 'center', marginTop: '20px' }}>
      <h2>Vrste životinja:</h2>
      <ul style={{ listStyleType: 'none', padding: '0' }}>
        {animalData.length > 0 && renderAnimalList()}
      </ul>
    </div>
   ); 
}

export default Species;