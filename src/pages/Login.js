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
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col
} from "reactstrap";

import api from "../services/api"


class Login extends React.Component {
  state = {
    squares1to6: "",
    squares7and8: "",
  };
  componentDidMount() {
    document.body.classList.toggle("register-page");
    document.documentElement.addEventListener("mousemove", this.followCursor);
  }
  componentWillUnmount() {   
    document.body.classList.toggle("register-page");
    document.documentElement.removeEventListener(
      "mousemove",
      this.followCursor
    );
  }
  followCursor = event => {
    let posX = event.clientX - window.innerWidth / 2;
    let posY = event.clientY - window.innerWidth / 6;
    this.setState({
      squares1to6:
        "perspective(500px) rotateY(" +
        posX * 0.05 +
        "deg) rotateX(" +
        posY * -0.05 +
        "deg)",
      squares7and8:
        "perspective(500px) rotateY(" +
        posX * 0.02 +
        "deg) rotateX(" +
        posY * -0.02 +
        "deg)"
    });
  };

  logar = async ()=>{//this.setState({mensagem:
      await api.post('aut',{email:this.state.email,
        senha:this.state.senha}).then(
      (response) =>{localStorage.setItem("token",response.data.token)
      
      localStorage.setItem("user",JSON.stringify(response.data.user))
      console.log(localStorage.getItem('user'));
      this.props.history.push("/home")}).catch((error)=> {
        if (new RegExp("email").test(error.response.data.error.toLowerCase())) {
         this.setState({inputEmail:"has-danger"})
        }
        if (new RegExp("senha").test(error.response.data.error.toLowerCase())) {
          this.setState({inputEmail:"has-success"})
          this.setState({inputSenha:"has-danger"})
        }
        console.log();
        
       
        this.setState({mensagem:error.response.data.error})
      })
  }

  render() {
    return (
      <div className="wrapper">
          <div className="page-header">
            <div className="page-header-image" />
            <div className="content">
            <Container>
                <Row>
                  <Col className="offset-lg-0 offset-md-3" lg="5" md="6">
                    <div
                      className="square square-7"
                      id="square7"
                      style={{ transform: this.state.squares7and8 }}
                    />
                    <div
                      className="square square-8"
                      id="square8"
                      style={{ transform: this.state.squares7and8 }}
                    />
                    <Card className="card-register">
                      <CardHeader>
                        <CardImg
                          alt="..."
                          src={require("assets/img/square-purple-1.png")}
                        />
                        <CardTitle tag="h4">Logar</CardTitle>
                      </CardHeader>
                      <CardBody>
                        <Form className="form">
                          <InputGroup
                            className={classnames({
                              "input-group-focus": this.state.emailFocus
                            }),this.state.inputEmail}
                          >
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="tim-icons icon-email-85" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder="Email"
                              type="email"
                              onFocus={e => this.setState({ emailFocus: true })}
                              onBlur={e => this.setState({ emailFocus: false })}
                              onInput={(e) => this.setState({email: e.target.value})}
                            />
                          </InputGroup>
                          <InputGroup
                            className={classnames({
                              "input-group-focus": this.state.passwordFocus
                            }),this.state.inputSenha}
                          >
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="tim-icons icon-lock-circle" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder="Senha"
                              type="password"
                              onFocus={e =>this.setState({ passwordFocus: true })}
                              onBlur={e =>this.setState({ passwordFocus: false })}
                              onInput={(e) => this.setState({senha: e.target.value})}
                            />
                          </InputGroup>
                            <p className="text-danger">{this.state.mensagem}</p>
                          
                        </Form>
                      </CardBody>
                      <CardFooter>
                        <Button onClick={this.logar} className="btn-round" color="primary" size="lg">
                          Get Started
                        </Button>
                      </CardFooter>
                    </Card>
                  </Col>
                </Row>
                {/*<div className="register-bg" />*/}
                <div
                  className="square square-1"
                  id="square1"
                  style={{ transform: this.state.squares1to6 }}
                />
                <div
                  className="square square-2"
                  id="square2"
                  style={{ transform: this.state.squares1to6 }}
                />
                <div
                  className="square square-3"
                  id="square3"
                  style={{ transform: this.state.squares1to6 }}
                />
                <div
                  className="square square-4"
                  id="square4"
                  style={{ transform: this.state.squares1to6 }}
                />
                <div
                  className="square square-5"
                  id="square5"
                  style={{ transform: this.state.squares1to6 }}
                />
                <div
                  className="square square-6"
                  id="square6"
                  style={{ transform: this.state.squares1to6 }}
                />
              </Container>
        </div>
          </div>
        </div>
    );
  }
}

export default Login;
