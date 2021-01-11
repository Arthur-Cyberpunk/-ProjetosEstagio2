import React, { useState, useContext } from "react";
import StoreContext from "../../components/Store/Context";
import { useHistory } from "react-router-dom";
import api from "../../services/api";
import "./index.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setToken } = useContext(StoreContext);
  const history = useHistory();

  async function onSubmit(event) {
    event.preventDefault();
    const response = await api.post("/autenticacao", {
      usuario: username,
      senha: password,
    });
    setToken(response.data.token);
    history.push("/users");
  }

  return (
    <div className="user-login">
      <h1 className="user-login__title">Acessar o Sistema</h1>
      <form autoComplete="nope" onSubmit={onSubmit}>
        <div className="user-login__form-control">
          <label htmlFor="username">Usuário</label>
          <input
            id="username"
            type="text"
            name="username"
            autoComplete="off"
            value={username}
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
        </div>
        <div className="user-login__form-control">
          <label htmlFor="password">Senha</label>
          <input
            id="password"
            type="password"
            name="password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </div>
        <button
          type="submit"
          theme="contained-green"
          className="user-login__submit-button"
          rounded
        >
          Entrar
        </button>
      </form>
    </div>
  );
};

export default Login;
