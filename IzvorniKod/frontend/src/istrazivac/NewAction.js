import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { BASE_URL } from '../config';

function NewAction() {
    const navigate = useNavigate();
    const location = useLocation();
    const actions = location.state?.actions;
    const username = location.state?.username;
    const [station, setStation] = useState([]);
    const [actionData, setActionData] = useState({
        actionName: '',
        stationId: '',
        username: username,
    });

    useEffect(() => {
        fetch(`${BASE_URL}/explorer/actions/station`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((response) => response.json())
        .then((data) => {setStation(data);
                        console.log(data);
                    })
        .catch((error) => console.error('Error fetching user data for editing:', error));  
      }, []);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setActionData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleDropdownChange = (e) => {
      const { value } = e.target;
      setActionData((prevData) => ({ ...prevData, stationId: value }));
    };
    
    const handleCancelClick = () => {
        console.log(actions);
        navigate(`/explorer/actions`, { state: {actions: actions, username: username }});
    };

    const isActionNameUnique = () => {
      return actions.every((action) => action.actionName !== actionData.actionName);
  };
    
      const handleSaveChanges = async () => {
        try {

          if (
            !actionData.actionName ||
            !actionData.stationId
        ) {
            alert('Popunite sva polja');
            return;
        }

        if (!isActionNameUnique()) {
          alert('Ime akcije već postoji');
          return;
      }

          const response = await fetch(`${BASE_URL}/explorer/actions/newAction`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(actionData),
          });
    
          if (response.ok) {
            console.log('Action changes saved successfully');
            navigate(`/explorer/actions`, { state: {data: actionData, actions: actions, username: username }});
          } else {
            console.error('Failed to save action changes');
          }
        } catch (error) {
          console.error('Error saving action changes:', error);
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
            <h2>Unesi podatke za novu akciju:</h2>
          </div>
          <div>
            <label style={labelStyle}>Ime akcije: </label>
            <input type="text" name="actionName" value={actionData.actionName} onChange={handleChange} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}> Šifra postaje:   
            <select id="dropdown" value={actionData.stationId} onChange={handleDropdownChange} style={dropStyle}>
                <option value=""></option>
                {station.map((action) => (
              <option key={action} value={action}>
                {action}
              </option>
            ))}
            </select>
          </label>
          </div>
          <div style={buttonContainerStyle}>
            <button style={buttonStyle} onClick={handleSaveChanges}>Stvori akciju</button>
            <button style={buttonStyle} onClick={handleCancelClick}>Odustani</button>
          </div>
        </div>
      );
    
}

export default NewAction;  