import React, { useState, useEffect} from "react";
import { useHistory } from 'react-router-dom';
import api from "../../services/api";
import "./index.css";
// import moment from 'moment';

const Users = () => {
  const history = useHistory();
  const [user, setUser] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    const response = await api.get("/usuarios");
    setUser(response.data.content);
  }

  useEffect(() => {
    loadUsers()
  }, [])

  //function formateDate(dataNascimento) {
    //return moment(dataNascimento).format("DD-MM-YYYY")
  //}

  function handleLogout() {
    localStorage.removeItem('token');
    history.push("/");
  }

  function newUser() {
    history.push("/register");
  }

  function editUser(id) {
    history.push(`/register/${id}`);
  }

  async function deleteUser(id) {
    var token = localStorage.getItem('token')
    token = token.replace('"', "");
    token = token.replace('"', "");

    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    await api.delete(`/usuarios/${id}`, config);
    loadUsers()
  }

  return (
    <div className="container">
      <button type="button" className="bt btn btn-success" onClick={newUser}>
        Novo
      </button>
      <button type="button" className="bt btn btn-dark" onClick={handleLogout}>
        Sair
      </button>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Nome</th>
            <th scope="col">Usuário</th>
            <th scope="col">Telefone</th>
            <th scope="col">Nascimento</th>
            <th scope="col">Email</th>
            <th scope="col">Perfil</th>
            <th scope="col">Ações</th>
          </tr>
        </thead>
        <tbody>
          {user.map((users) => (
            <tr key={users.id}>
              <th scope="row">{users.nome}</th>
              <td>{users.usuario}</td>
              <td>{users.telefone}</td>
              <td>{users.dataNascimento}</td>
              {/* <td>{formateDate(users.dataNascimento)}</td> */}
              <td>{users.email}</td>
              <td>{users.perfilTipo}</td>
              <td>
                <button
                  type="button"
                  className="b btn btn-warning"
                  onClick={() => editUser(users.id)}
                >
                  Editar
                </button>
                <button
                  type="button"
                  className="b btn btn-danger"
                  onClick={() => deleteUser(users.id)}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
