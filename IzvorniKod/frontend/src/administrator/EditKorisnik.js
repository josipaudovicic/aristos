import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const EditKorisnik = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const formerUser = location.state?.user;
  const formerUsername = location.state?.user.username;
  console.log(formerUsername)

  
  const [userData, setUserData] = useState({
    username: '',
    name: '',
    surname: '',
    email: '',
    password: '',
    role: '',
    file: '',
  });
  const [selectedStation, setSelectedStation] = useState('');
  const [stationData, setStationData] = useState([]); 

  useEffect(() => {
    console.log(formerUsername);
    if (formerUsername !== undefined){
      fetch('/profile', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              username: formerUsername, 
            },
          })
            .then((response) => response.json())
            .then((data) => {setUserData(data);
          console.log(data);})
            .catch((error) => console.error('Error fetching users data for editing:', error));

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
            fetchStations();
            console.log(stationData);
    }

  }, [formerUsername]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCancelClick = () => {
    console.log(formerUsername);
    navigate(`/user/${formerUsername}`, { state: {user: formerUser }});
  };

  const handleSaveChanges = async () => {
    if (userData.role === 'Voditelj postaje') {
      if (selectedStation) {
        userData.station = selectedStation;
        console.log(`Confirmed for manager: ${userData.username}, Station: ${selectedStation}`);
        try {
          const response = await fetch(`/admin/changeUserData/${userData.username}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
          });

          if (response.ok) {
            console.log('User data changed sucessfully.');
            navigate("/admin", { state: {username: userData.username }});
          } else {
            console.error('Failed to change user data.');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      } else {
        window.alert('Please choose a station for manager.');
      }
    } else {
        try {
        const response = await fetch(`/admin/changeUserData/${userData.username}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            username: formerUsername,
          },
          body: JSON.stringify(userData),
        });

        if (response.ok) {
          console.log('Profile changes saved successfully');
          navigate(`/admin`, { state: {username: userData.username }});
        } else {
          console.error('Failed to save profile changes');
        }
      } catch (error) {
        console.error('Error saving profile changes:', error);
      }
    };
  }

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
        <h2>Uredi podatke - korisnik {userData.username}</h2>
      </div>
      <div>
        <label style={labelStyle}>Ime: </label>
        <input type="text" name="name" value={userData.name} onChange={handleChange} style={inputStyle} />
      </div>
      <div>
        <label style={labelStyle}>Prezime: </label>
        <input type="text" name="surname" value={userData.surname} onChange={handleChange} style={inputStyle} />
      </div>
      <div>
        <label style={labelStyle}>Email: </label>
        <input type="text" name="email" value={userData.email} onChange={handleChange} style={inputStyle} />
      </div>
      <div>
        <label style={labelStyle}>Lozinka: </label>
        <input type="password" name="password" value={userData.password} onChange={handleChange} style={inputStyle} />
      </div>
      <div>
        <label style={labelStyle}>Uloga: </label>
        <select
          name="role"
          value={userData.role}
          onChange={handleChange}
          style={inputStyle}
        >
          <option value="Tragač">Tragač</option>
          <option value="Istraživač">Istraživač</option>
          <option value="Voditelj postaje">Voditelj postaje</option>
        </select>
        {/* Conditionally render dropdown for managers */}
        {userData.role === 'Voditelj postaje' && (
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
      </div>
      <div style={buttonContainerStyle}>
        <button style={buttonStyle} onClick={handleSaveChanges}>
          Spremi promjene
        </button>
        <button style={buttonStyle} onClick={handleCancelClick}>
          Odustani
        </button>
      </div>
    </div>
  );
}

export default EditKorisnik;
