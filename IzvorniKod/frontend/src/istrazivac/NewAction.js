import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function NewAction() {
    const navigate = useNavigate();
    const location = useLocation();
    const actions = location.state?.actions;
    const [station, setStation] = useState([]);
    const [actionData, setActionData] = useState({
        actionName: '',
        username: '',
        stationId: '',
    });

    useEffect(() => {
        fetch('/explorer/actions/station', {
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
    
    const handleCancelClick = () => {
        console.log(actions);
        navigate(`/explorer/actions`, { state: {actions: actions }});
    };
    
      const handleSaveChanges = async () => {
        try {
          const response = await fetch(`/explorer/actions/newAction`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(actionData),
          });
    
          if (response.ok) {
            console.log('Action changes saved successfully');
            navigate(`/explorer/actions`, { state: {data: actionData, actions: actions }});
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
            <label style={labelStyle}>Ime istraživača: </label>
            <input type="text" name="username" value={actionData.username} onChange={handleChange} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Šifra postaje: </label>
            <input type="text" name="stationId" value={actionData.stationId} onChange={handleChange} style={inputStyle} />
          </div>
          <div style={buttonContainerStyle}>
            <button style={buttonStyle} onClick={handleSaveChanges}>Stvori akciju</button>
            <button style={buttonStyle} onClick={handleCancelClick}>Odustani</button>
          </div>
        </div>
      );
    
}

export default NewAction;  