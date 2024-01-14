import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function UrediZadatak() {
  const navigate = useNavigate();
  const [selectedAction, setSelectedAction] = useState('');
  const [description, setDescription] = useState('');
  const [actions, setActions] = useState([]);

  //nije gotovo{ 

  const location = useLocation();
  //const [task] = useState(location.state.task);
  const taskId = location.state?.taskId;

  //}

  useEffect(() => {
    const fetchActions = async () => {
      try {
        const response = await fetch('api/explorer/actions');
        if (response.ok) {
          const data = await response.json();
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

  useEffect(() => {
    const fetchTaskDetails = async () => {
      try {
        const response = await fetch(`/api/explorer/Tasks/${taskId}`);
        if (response.ok) {
          const taskData = await response.json();
          setDescription(taskData.description);
          setSelectedAction(taskData.actionId);
        } else {
          console.error('Failed to fetch task details');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchTaskDetails();
  }, [taskId]);

  const handleSubmit = async () => {
    

    try {
      const response = await fetch(`/api/explorer/Tasks/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          description,
          actionId: selectedAction,
        }),
      });

      if (response.ok) {
        alert('Zadatak je ažuriran');
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

  const handleChange = (event) => {
    setDescription(event.target.value);
  };

  const regularButtonStyle = {
    padding: '18px 18px',
    fontSize: 20,
    cursor: 'pointer',
  };

  return (
    <div>
      <h2>Uredi zadatak</h2>
      <form>
        <label>
          Opis zadatka:
          <input type="text" value={description} onChange={handleChange}></input>
        </label>

        <label>
          Akcija:
          <select id="dropdown" value={selectedAction} onChange={handleSelectChange}>
            <option value="">Izaberi...</option>
            {actions.map((action) => (
              <option key={action.id} value={action.id}>
                {action.name}
              </option>
            ))}
          </select>
        </label>
      </form>

      <button onClick={() => handleSubmit()} style={regularButtonStyle}>
        Spremi
      </button>
    </div>
  );
}

export default UrediZadatak;
