import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Button, Col, Form } from 'react-bootstrap';
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
    perfilId: "",
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
    setValues(response.data)
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
    <Form
    onSubmit={onSubmit}
    className="container form-new"
  >
    <Button block variant="primary" type="button" onClick={backUsers}>
      Voltar
    </Button>
    
    <Form.Row >
      <Form.Group as={Col}>
        <Form.Label className="form-label">Nome</Form.Label>
        <Form.Control
          name="nome"
          value={values.nome}
          onChange={(e)=>inputChange(e)}
          type="text"
          placeholder="digite seu nome completo"
        />
      </Form.Group>
  
      <Form.Group as={Col}>
        <Form.Label className="form-label">Email</Form.Label>
        <Form.Control
          name="email"
          value={values.email}
          onChange={(e)=>inputChange(e)}
          type="email"
          placeholder="seu@email.com"
        />
      </Form.Group>
  
      <Form.Group as={Col}>
        <Form.Label className="form-label">Telefone</Form.Label>
        <Form.Control
          name="telefone"
          value={values.telefone}
          onChange={(e)=>inputChange(e)}
          type="number"
          placeholder="+55"
  
        />
      </Form.Group>
    </Form.Row>
  
    <Form.Row >
      <Form.Group as={Col}>
        <Form.Label className="form-label">Usuário</Form.Label>
        <Form.Control
          name="usuario"
          value={values.usuario}
          onChange={(e)=>inputChange(e)}
          type="text"
          placeholder="digite seu nome de usuário"
  
        />
      </Form.Group>
  
      <Form.Group as={Col}>
        <Form.Label className="form-label">Senha</Form.Label>
        <Form.Control
          name="senha"
          value={values.senha}
          onChange={(e)=>inputChange(e)}
          type="password"
          placeholder="************"
        />
      </Form.Group>
  
      <Form.Group as={Col}>
        <Form.Label className="form-label">Data de nascimento</Form.Label>
        <Form.Control
          name="dataNascimento"
          value={values.dataNascimento}
          onChange={(e)=>inputChange(e)}
          type="text" 
          placeholder="01-01-0001"
        />
      </Form.Group>
  
      <Form.Group as={Col}>
        <Form.Label className="form-label">Idade</Form.Label>
        <Form.Control
          name="idade"
          value={values.idade}
          onChange={(e)=>inputChange(e)}
          type="number" 
        />
      </Form.Group>
    </Form.Row>
  
  
    <Form.Row >
      <Form.Group as={Col} >
        <Form.Label>Sexo</Form.Label>
        <Form.Control
          as="select" 
          name="sexo"
          value={values.sexo}
          onChange={(e)=>inputChange(e)}
          type="text"
        >
          <option>MASCULINO</option>
          <option>FEMININO</option>
        </Form.Control>
        
      </Form.Group>
  
      <Form.Group as={Col} >
        <Form.Label>Perfil</Form.Label>
        <Form.Control
          name="perfilId"
          value={values.perfilId}
          onChange={(e)=>inputChange(e)} 
          type="text"
        >
          {/* <option>Choose...</option> */}
          
          {/* <option>Aluno</option> */}
        </Form.Control>
      </Form.Group>
    </Form.Row>
  
    <Button block variant="primary" type="submit">
      Submit
    </Button>
  </Form>
  );
}

export default Register;
