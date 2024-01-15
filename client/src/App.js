import './App.css';
import React, { useEffect, useState } from 'react';
import ApiService from './ApiService';

function App() {
  const [users, setUsers] = useState([]);
  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {
    // Fetch users
    ApiService.getUsers()
      .then((data) => setUsers(data))
      .catch((error) => console.error('Error getting users:', error));

    // Fetch registrations
    ApiService.getRegistrations()
      .then((data) => setRegistrations(data))
      .catch((error) => console.error('Error getting registrations:', error));
  }, []);

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.Id}>{`${user.Name} ${user.Surname} - Balance: ${user.Balance}`}</li>
        ))}
      </ul>

      <h1>Registrations</h1>
      <ul>
        {registrations.map((registration) => (
          <li key={registration.Id}>{`User ${registration.UserId} - Entry: ${registration.DateEntry}, Exit: ${registration.DateExit}`}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;