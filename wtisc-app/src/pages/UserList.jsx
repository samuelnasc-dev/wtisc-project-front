import axios from 'axios';
import React, { useEffect, useState } from 'react';

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/users')
      .then(response => setUsers(response.data))
      .catch(error => console.error('Erro ao buscar usuários:', error));
  }, []);

  return (
    <div>
      <h1>Lista de Usuários</h1>
      <ul>
        {users.map(user => (
          <li key={user.userId}>{user.name} {user.surname}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
