import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import api from "../../services/api";

function Register() {
  const history = useHistory();

  function backUsers() {
    history.push("/users");
  }

  const camposCadastro = {
    nome: "",
    usuario: "",
    email: "",
    senha: "",
    telefone: "",
    sexo: "",
    dataNascimento: "",
    idade: "",
    perfilTipo: "",
  };

  const [values, setValues] = useState(camposCadastro);

  function inputChange(event) {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  }

  const { id } = useParams();

  useEffect(() => {
    if (id != undefined) {
      editUser(id);
    }
  }, [id]);

  async function editUser(id) {
    const response = await api.get(`/usuarios/${id}`);
    setValues({
      nome: response.data.nome,
      usuario: response.data.usuario,
      email: response.data.email,
      senha: response.data.senha,
      telefone: response.data.telefone,
      sexo: response.data.sexo,
      dataNascimento: response.data.dataNascimento,
      idade: response.data.idade,
      perfilTipo: response.data.perfilTipo,
    });
  }

  async function onSubmit(event) {
    event.preventDefault();
    var token = localStorage.getItem("token");

    token = token.replace('"', "");
    token = token.replace('"', "");

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    if (id !== undefined) {
      await api.put(`/usuarios/${id}`, values, config);
      history.push("/users");
    } else {
      console.log(values);
      await api.post("/usuarios", values, config);
      history.push("/users");
    }
  }

  return (
    <div className="container">
      <form onSubmit={onSubmit}>
        <button type="button" className="btn btn-success" onClick={backUsers}>
          Voltar
        </button>
        <input
          className="form-control"
          type="text"
          placeholder="Nome"
          aria-label="default input example"
          name="nome"
          value={values.nome}
          onChange={inputChange}
        ></input>
        <input
          className="form-control"
          type="text"
          placeholder="Usuário"
          aria-label="default input example"
          name="usuario"
          value={values.usuario}
          onChange={inputChange}
        ></input>
        <input
          className="form-control"
          type="email"
          placeholder="Email"
          aria-label="default input example"
          name="email"
          value={values.email}
          onChange={inputChange}
        ></input>
        <input
          className="form-control"
          type="password"
          placeholder="Senha"
          aria-label="default input example"
          name="senha"
          value={values.senha}
          onChange={inputChange}
        ></input>
        <input
          className="form-control"
          type="int"
          placeholder="Telefone"
          aria-label="default input example"
          name="telefone"
          value={values.telefone}
          onChange={inputChange}
        ></input>
        <input
          className="form-control"
          type="text"
          placeholder="Sexo"
          aria-label="default input example"
          name="sexo"
          value={values.sexo}
          onChange={inputChange}
        ></input>
        <input
          className="form-control"
          type="date"
          placeholder="Data de nacimento"
          aria-label="default input example"
          name="dataNascimento"
          value={values.dataNascimento}
          onChange={inputChange}
        ></input>
        <input
          className="form-control"
          type="int"
          placeholder="Idade"
          aria-label="default input example"
          name="idade"
          value={values.idade}
          onChange={inputChange}
        ></input>
        <input
          className="form-control"
          type="int"
          placeholder="perfilTipo"
          aria-label="default input example"
          name="perfilTipo"
          value={values.perfilTipo}
          onChange={inputChange}
        ></input>
        <button type="submit" className="btn btn-success">
          Salvar
        </button>
      </form>
    </div>
  );
}

export default Register;
