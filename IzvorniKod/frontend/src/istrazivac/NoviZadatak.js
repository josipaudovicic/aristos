import React, { useState, useEffect }  from 'react';
import { useNavigate } from 'react-router-dom';

function NoviZadatak(){

    const navigate = useNavigate();
    const [description, setDescription] = useState([]);
    const [selectedAction, setSelectedAction] = useState('');
    const [actions, setActions] = useState([]);

    useEffect(() => { 
        const fetchActions = async () => { //dohvaca akcije od istrazivaca za dropdown
            try {
              const response = await fetch('api/explorer/actions');
              if (response.ok) {
                const data = await response.json();
                console.log(data);
                setActions(data);
              } else {
                console.error('Failed to fetch actions');
              }
            } catch (error) {
              console.error('Error:', error);
            }
          };
          fetchActions();
          }, []);

          const handleSubmit = async () => {
            
    
            try {
                const response = await fetch(`/api/explorer/Tasks`, {
                  method: 'PUT',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                });
          
                if (response.ok) {
                  alert('Zadatak je napravljen');
                  navigate('/explorer/allTasks');
                } else {
                  console.error('Failed');
                }
              } catch (error) {
                console.error('Error', error.message);
              }
          }; 
    
          const handleSelectChange = (event) => {
            setSelectedAction(event.target.value);
          };
    
          const handleChange=(event) => {
            setDescription(event.target.value)
          }
    
        const regularButtonStyle = {
            padding: '18px 18px',
            fontSize: 20,
            cursor: 'pointer',
          };
        
    return (
        <div>
            <h2>Novi zadatak</h2>
            <form>
              <label>
                opis zadatka:
                <input type="text" value={description} onChange={handleChange}></input>
              </label>
    
              <label>
                akcija:
                <select id="dropdown" value={selectedAction} onChange={handleSelectChange}>
                    <option value="">izaberi...</option>
                    {actions.map(action => (
                        <option key={action.id} value={action.id}>
                            {action.name}
                        </option>
                    ))}
                </select>
              </label>
            </form>
    
            <button onClick={() => handleSubmit()} style={regularButtonStyle}>Spremi</button>
        </div>
        );
}
export default NoviZadatak;