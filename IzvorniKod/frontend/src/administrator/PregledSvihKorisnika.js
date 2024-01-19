import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../config';

function PregledSvihKorisnika() { //dobivam json sa domagojeve stranice o podatcima svih korisnika
  const location = useLocation()
  const users = location.state.users;
  console.log(users);
  const navigate = useNavigate(); //služi za preusmjeravanje na stranicu pojedinačnog korisnika

  const handleClick = async (user) => {  //klik na korisnika iz prikazane liste
    try {
      console.log(user);
      // Fetch detailed user information from the database using the username ----> imam ih već u users argumentu
      
      // Redirect to a new page with detailed user information
      navigate(`/user/${user.username}`, { state: {user: user, users: users}}); //podatke šaljem na stranicu pojedinačnog korisnika

    } catch (error) {
      console.error('Error fetching user details:', error.message);
    }
  };

  const buttonStyle = {
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
    <div className='container' style={{ textAlign: 'center', marginTop: '20px' }}>
      <h2>Lista registriranih korisnika:</h2>
      <ul style={{ listStyleType: 'none', padding: '0' }}>
        {users ? users.map((user) => (
          <li
            key={user.username}
            onClick={() => handleClick(user)}
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
            <strong>korisničko ime:</strong> {user.username}, <strong>uloga:</strong> {user.role}
          </li>
        )) : <p>Nema korisnika.</p>}
      </ul>
      <div>
      <Link to="/admin">
        <button style={buttonStyle}>Početna</button>
      </Link>
    </div>
    </div>
  );
}

export default PregledSvihKorisnika;