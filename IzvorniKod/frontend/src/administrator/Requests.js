import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Requests() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users with confirmed attribute set to NULL
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

    fetchUsers();
  }, []); 
  
  const handleConfirm = async (userName) => {
    try {
      const response = await fetch(`/admin/users/${userName}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Update the local state to reflect the change
        setUsers((prevUsers) => prevUsers.filter((user) => user.username !== userName));
      } else {
        console.error('Failed to update user confirmation status');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDecline = async (userName) => {
    try {
      const response = await fetch(`/admin/users/${userName}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Remove the user from the local state
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
            <button style={buttonStyle} onClick={() => handleConfirm(user.username)}>Confirm</button>
            <button style={buttonStyle} onClick={() => handleDecline(user.username)}>Decline</button>
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
