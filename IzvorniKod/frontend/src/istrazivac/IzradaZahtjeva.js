import React, { useState, useEffect }  from 'react';
import { useNavigate } from 'react-router-dom';

function IzradaZahtjeva(){
    const navigate = useNavigate();
    const [actions, setActions] = useState([]);
    const [description, setDescription] = useState([]);
    const [selectedAction, setSelectedAction] = useState('');    

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
    
    
      const handleSubmit = async() => {
        alert('Zahtjev je poslan');

        try {
            const response = await fetch(`/api/manager/requests`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
            });
      
            if (response.ok) {
              navigate('/explorer/info');
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
        <h2>Izrada Zahtjeva</h2>
        <form>
          <label>
            opis tragača:
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

        <button onClick={() => handleSubmit()} style={regularButtonStyle}>Pošalji zahtjev</button>
    </div>
    );
}

export default IzradaZahtjeva;