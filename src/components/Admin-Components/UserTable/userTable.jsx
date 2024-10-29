import React, { useEffect, useState } from 'react';
import style from './userTable.module.css';

export const fetchUsers = async (token) => {
  try {
      const response = await fetch("http://34.204.57.249:8081/api/users",{
        method:"GET",
        headers: {
          'Authorization': `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
      }
      const data = await response.json();
      console.log(data.data);
      return data.data; // Asegúrate de que 'data.data' es un array de usuarios
  } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      throw error;
  }
};

export default function UserTable() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('jwt')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchUsers(token); // Asegúrate de llamar a 'fetchUsers'
        console.log("Fetched users:", response);
        setUsers(response); // Asumiendo que response es un array de usuarios
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!users || users.length === 0) {
    return <div>No users found</div>;
  }

  return (
    <div className={style.container}>
      <h2 className={style.Jardin}>Usuarios</h2>
      <table className={style.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name} {user.last_name}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
