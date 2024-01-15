import React, { useState, useEffect }  from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function NoviZadatak(){
    const navigate = useNavigate();
    const location = useLocation();
    const actionName = location.state?.actionName;
    const [username, setUsername] = useState([]);
    const [animals, setAnimals] = useState([]);
    const [task, setTask] = useState({
        taskText: '',
        animalName: '',
        username: '',
    });

    useEffect(() => {
      fetch('/explorer/action/info/tasks/newTask', {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              actionName: actionName,
          },
      })
      .then((response) => response.json())
      .then((data) => {setUsername(data.users);
                      setAnimals(data.animals);
                      console.log(data);
                  })
      .catch((error) => console.error('Error fetching user data for editing:', error));  
    }, []);


    const handleChange = (e) => {
      const { name, value } = e.target;
      setTask((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleDropdownChange = (e) => {
    const { value } = e.target;
    setTask((prevData) => ({ ...prevData, username: value }));
  };

  const handleDropdownChange2 = (e) => {
    const { value } = e.target;
    setTask((prevData) => ({ ...prevData, animalName: value }));
  };
  
  const handleCancelClick = () => {
      navigate(`/explorer/action/info/tasks`, { state: {actionName: actionName}});
  };

  
    const handleSaveChanges = async () => {
      try {

        if (
          !task.taskText ||
          !task.username || 
          !task.animalName
      ) {
          alert('Popunite sva polja');
          return;
      }

        const response = await fetch(`/explorer/action/info/tasks/newTask`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(task),
        });
  
        if (response.ok) {
          console.log('Task changes saved successfully');
          navigate(`/explorer/action/info/tasks`, { state: {data: task, actionName: actionName}});
        } else {
          console.error('Failed to save task changes');
        }
      } catch (error) {
        console.error('Error saving task changes:', error);
      }
    };
  
  const labelStyle = {
      display: 'block',
      marginBottom: '4px',
      fontWeight: 'bold',
    };

  
    const dropStyle = {
      marginBottom: '8px',
      padding: '8px',
      marginLeft: '15px',
      borderRadius: '6px',
    };

    const inputStyle = {
      marginBottom: '8px',
      padding: '8px',
    };
  
    const buttonContainerStyle = {
      display: 'flex',
      justifyContent: 'space-between', 
      marginTop: '12px',
    };
  
    const buttonStyle = {
      flex: '1', 
      marginLeft: '8px',
      padding: '8px 16px',
      fontSize: '16px',
      marginTop: '12px',
    };
  
    const containerStyle = {
      textAlign: 'left',
    };
  
    const centerStyle = {
      textAlign: 'center', 
    };

  return (
      <div className="container" style={containerStyle}>
        <div style={centerStyle}>
          <h2>Unesi podatke za novi zadatak:</h2>
        </div>
        <div>
          <label style={labelStyle}>Opis zadatka: </label>
          <input type="text" name="taskText" value={task.taskText} onChange={handleChange} style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}> Ime tragača na zadatku:   
          <select id="dropdown" value={task.username} onChange={handleDropdownChange} style={dropStyle}>
              <option value=""></option>
              {username.map((tracker) => (
            <option key={tracker} value={tracker}>
              {tracker}
            </option>
          ))}
          </select>
        </label>
        </div>
        <div>
          <label style={labelStyle}> Životinja:   
          <select id="dropdown" value={animals.animalName} onChange={handleDropdownChange2} style={dropStyle}>
              <option value=""></option>
              {animals.map((animal) => (
            <option key={animal} value={animal}>
              {animal}
            </option>
          ))}
          </select>
        </label>
        </div>
        <div style={buttonContainerStyle}>
          <button style={buttonStyle} onClick={handleSaveChanges}>Stvori zadatak</button>
          <button style={buttonStyle} onClick={handleCancelClick}>Odustani</button>
        </div>
      </div>
    );
      
        
    
}
export default NoviZadatak;