import React from 'react';
import { useNavigate } from 'react-router-dom';

function PregledSvihKorisnika({ users }) { //dobivam json sa domagojeve stranice o podatcima svih korisnika
  const navigate = useNavigate(); //služi za preusmjeravanje na stranicu pojedinačnog korisnika

  const handleClick = async (user) => {  //klik na korisnika iz prikazane liste
    try {
      // Fetch detailed user information from the database using the username ----> imam ih već u users argumentu
      
      // Redirect to a new page with detailed user information
      navigate(`/user/${user.username}`, { user }); //podatke šaljem na stranicu pojedinačnog korisnika

    } catch (error) {
      console.error('Error fetching user details:', error.message);
    }
  };

  return (
    <div>
      <h2>Lista registriranih korisnika:</h2>
      <ul>
        {users.map((user) => (
          <li key={user.username} onClick={() => handleClick(user)} style={{ cursor: 'pointer' }}>
            <strong>korisničko ime:</strong> {user.username}, <strong>uloga:</strong> {user.role}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PregledSvihKorisnika;