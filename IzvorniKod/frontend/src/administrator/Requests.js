import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Requests() {
  const [users, setUsers] = useState([]);
  const [selectedStation, setSelectedStation] = useState('');
  const [stationData, setStationData] = useState([]); 

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/admin/toConfirm');
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setUsers(data);
        } else {
          console.error('Failed to fetch users');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
    
    const fetchStations = async () => {
      try {
        const response = await fetch('/admin/getAllStations');
        if (response.ok) {
          const stationData = await response.json();
          console.log(stationData);
          setStationData(stationData); 
        } else {
          console.error('Failed to fetch stations');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchUsers();
    fetchStations();
  }, []); 

  const handleConfirm = async (user) => {
    // station managers
    if (user.role === 'Voditelj postaje') {
      if (selectedStation) {
        console.log(`Confirmed for manager: ${user.username}, Station: ${selectedStation}`);
        try {
          const response = await fetch(`/admin/users/${user.username}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              confirmed: true,
              station: selectedStation,
            }),
          });

          if (response.ok) {
            console.log('Manager confirmation sent to the backend successfully.');

            setUsers((prevUsers) => prevUsers.filter((u) => u.username !== user.username));
          } else {
            console.error('Failed to send manager confirmation to the backend.');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      } else {
        console.error('Please choose a station for manager confirmation.');
      }
    } else {
      // druge uloge
      try {
        const response = await fetch(`/admin/users/${user.username}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            confirmed: true,
          }),
        });

        if (response.ok) {

          setUsers((prevUsers) => prevUsers.filter((u) => u.username !== user.username));
        } else {
          console.error('Failed to update user confirmation status');
        }
      } catch (error) {
        console.error('Error:', error);
      }

      console.log(`Confirmed for user: ${user.username}`);
    }
  };

  const handleDecline = async (userName) => {
    try {
      const response = await fetch(`/admin/users/${userName}`, {
        method: 'DELETE',
      });

      if (response.ok) {

        setUsers((prevUsers) => prevUsers.filter((user) => user.username !== userName));
      } else {
        console.error('Failed to delete user');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const buttonStyle = {
    flex: '1', 
    marginLeft: '8px',
    padding: '8px 16px',
    fontSize: '16px',
    marginTop: '12px',
  };

  const listStyle = {
    paddingLeft: '0',
    listStyleType: 'none',
  };

  const bStyle = {
    position: 'fixed',
    top: '10px',
    left: '10px',
    padding: '8px 16px',
    backgroundColor: '#5C5C5C',
    color: '#fff',
    borderRadius: '4px',
    cursor: 'pointer',
  };

  return (
    <div className='container'>
      <h2>Requests</h2>
      <ul style={listStyle}>
        {users.map((user) => (
          <li key={user.username}>
            {user.username} - {user.role}
            
            {/* Conditionally render dropdown for managers */}
            {user.role === 'Voditelj postaje' && (
              <select
                value={selectedStation}
                onChange={(e) => setSelectedStation(e.target.value)}
              >
                <option value="" disabled>
                  Izaberi stanicu
                </option>
                {stationData.map((station) => (
                  <option key={station.station_id} value={station.station_name}>
                    {station.station_name}
                  </option>
                ))}
              </select>
            )}
  
            <button style={buttonStyle} onClick={() => handleConfirm(user)}>
              Potvrdi
            </button>
            <button style={buttonStyle} onClick={() => handleDecline(user.username)}>
              Odbij
            </button>
          </li>
        ))}
      </ul>
      <div>
        <Link to="/admin">
          <button style={bStyle}>Početna</button>
        </Link>
      </div>
    </div>
  );
}

export default Requests;
