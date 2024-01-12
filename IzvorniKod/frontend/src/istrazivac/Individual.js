import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function Individual () {
    const [animalData, setAnimalData] = useState({});
    const [anima, setAnima] = useState({});
    const navigate = useNavigate();
    const location = useLocation();
    const animal = location.state?.animal;
    const username = location.state?.username;

    useEffect(() => {
        fetch(`/explorer/animals/species`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            animal: animal,
          },
        })
          .then((response) => response.json())
          .then((data) => setAnimalData(data))
          .catch((error) => console.error('Error fetching user data:', error));
      }, [animal]);
      console.log(animalData)

    
      const handleClick = async (animal) => {
        const parts = animal.split(': ');
        const id = parts[1];
                try {
            const response1 = await fetch(`/explorer/animals/species/${id}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            });
        
            const data1 = await response1.json();

            const response2 = await fetch(`/explorer/animals/species/${id}/comments`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            });
        
            const data2 = await response2.json();
      
            navigate(`/explorer/animals/species/${id}`, {
              state: { animal: data1, username: username, comments: data2 },
            });
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        }

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
      <h2>Jedinke:</h2>
      <ul style={{ listStyleType: 'none', padding: '0' }}>
        {animalData.length > 0 && renderAnimalList()}
      </ul>
    </div>
   ); 
}

export default Individual;