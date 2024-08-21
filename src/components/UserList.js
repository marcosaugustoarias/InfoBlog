import React, { useState, useEffect } from 'react';

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('https://dummyapi.online/api/users')
      .then(response => response.json())
      .then(data => setUsers(data));
  }, []);

  return (
    <div>
      <h2>Users</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            <img src={user.picture} alt={user.name} />
            {user.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;