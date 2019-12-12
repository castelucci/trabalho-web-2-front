import React from "react";
import classnames from "classnames";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardImg,
  CardTitle,
  Label,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
} from "reactstrap";
import api from "../services/api"
class Signup extends React.Component {

  state = {
    token: "",
    adm: false
  };
  alterar = async (vetor, campo, erro) => {
    if (erro) {
      vetor.forEach(element => {
        if (new RegExp(element.toLowerCase()).test(erro)) {
          element = campo + element
          this.setState({ [element]: "has-danger" })
        }
      })
      return
    }
    vetor.forEach(element => {
      element = campo + element
      this.setState({ [element]: "has-success" })
    })
  }

  index = async () => {

    await api.get('user/' + this.state.email,
      { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } })
      .then((response) => {
        this.setState({ senha: response.data.senha, nome: response.data.nome })
      })
      .catch((error) => {
        this.setState({ corP: "text-danger" });
        this.setState({ mensagem: error.data })
      })

  }
  cadastrar = async () => {
    if (this.state.email && this.state.senha == null && this.state.nome == null) {
      this.index(); return
    }
    await api.post('user', {
      email: this.state.email,
      senha: this.state.senha, nome: this.state.nome, adm: this.state.adm
    },
      { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } })
      .then((response) => {
        this.setState({ corP: "text-success", mensagem: "Novo Usuario Criado" })
        this.alterar(["Nome", "Email", "Senha"], "input")
      })
      .catch((error) => {

        this.setState({ corP: "text-danger" });
        let erro;
        error.response.data ? erro = error.response.data.toLowerCase() :
          erro = error.response.data.error.toLowerCase()
        this.alterar(["Nome", "Email", "Senha"], "input", erro)
        this.setState({ mensagem: erro })
      })
  }
  render() {
    return (
      <Card style={{ margin: 0 }} className="card-register">
        <CardHeader>
          <CardImg
            src={require("assets/img/square1.png")}
          />
          <CardTitle tag="h1">Regitrar</CardTitle>
        </CardHeader>
        <CardBody>
          <Form className="form">
            <InputGroup
              className={classnames({
                "input-group-focus": this.state.fullNameFocus
              }), this.state.inputNome}
            >
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="tim-icons icon-single-02" />
                </InputGroupText>
              </InputGroupAddon>
              <Input
                placeholder="Nome Completo"
                type="text"
                value={this.state.nome}
                onFocus={e =>
                  this.setState({ fullNameFocus: true })
                }
                onBlur={e =>
                  this.setState({ fullNameFocus: false })
                }
                onInput={(e) => this.setState({ nome: e.target.value })}
              />
            </InputGroup>
            <InputGroup
              className={classnames({
                "input-group-focus": this.state.emailFocus
              }), this.state.inputEmail}
            >
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="tim-icons icon-email-85" />
                </InputGroupText>
              </InputGroupAddon>
              <Input
                placeholder="Email"
                type="text"
                value={this.state.email}
                onFocus={e => this.setState({ emailFocus: true })}
                onBlur={e => this.setState({ emailFocus: false })}
                onInput={(e) => this.setState({ email: e.target.value })}
              />
            </InputGroup>
            <InputGroup
              className={classnames({
                "input-group-focus": this.state.passwordFocus
              }), this.state.inputSenha}
            >
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="tim-icons icon-lock-circle" />
                </InputGroupText>
              </InputGroupAddon>
              <Input
                placeholder="Senha"
                type="password"
                value={this.state.senha}
                onFocus={e =>
                  this.setState({ passwordFocus: true })
                }
                onBlur={e =>
                  this.setState({ passwordFocus: false })
                }
                onInput={(e) => this.setState({ senha: e.target.value })}

              />
            </InputGroup>
            <FormGroup check className="text-left">
              <Label check>
                <Input type="checkbox"
                  value={this.state.adm}
                  onInput={() => this.setState({ adm: !this.state.adm })}
                />
                <span className="form-check-sign" />Usuario Administrador{" "}
              </Label>
            </FormGroup>
            <p className={this.state.corP}>{this.state.mensagem}</p>
          </Form>
        </CardBody>
        <CardFooter>
          <Button onClick={this.cadastrar} className="btn-round animation-on-hover" color="info" size="lg">
            Criar
                        </Button>
          <Button onClick={this.props.toggleModalRegister} className="btn-round" color="danger">
            Sair
                        </Button>
        </CardFooter>
      </Card>
    );
  }
}

export default Signup;