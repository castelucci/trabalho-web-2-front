import React from "react";
import {
  Button,
  Card,
  CardBody,
  Label,
  FormGroup,
  Input,
  Container,
} from "reactstrap";
import { estaAutenticado } from "../auth"
import api from "../services/api"
class AtualizarCesta extends React.Component {

  state = {
    cotacao: {
      user: "",
      cesta: {
        alimentos: {
          alimento1: {
            variedade: [
              { marca: "", preco: 0 },
              { marca: "", preco: 0 },
              { marca: "", preco: 0 },
              { marca: "", preco: 0 },
              { marca: "", preco: 0 }
            ]
          },
          alimento2: {
            variedade: [
              { marca: "", preco: 0 },
              { marca: "", preco: 0 },
              { marca: "", preco: 0 },
              { marca: "", preco: 0 },
              { marca: "", preco: 0 }
            ]
          },
          alimento3: {
            variedade: [
              { marca: "", preco: 0 },
              { marca: "", preco: 0 },
              { marca: "", preco: 0 },
              { marca: "", preco: 0 },
              { marca: "", preco: 0 }
            ]
          },
          alimento4: {
            variedade: [
              { marca: "", preco: 0 },
              { marca: "", preco: 0 },
              { marca: "", preco: 0 },
              { marca: "", preco: 0 },
              { marca: "", preco: 0 }
            ]
          },
          alimento5: {
            variedade: [
              { marca: "", preco: 0 },
              { marca: "", preco: 0 },
              { marca: "", preco: 0 },
              { marca: "", preco: 0 },
              { marca: "", preco: 0 }
            ]
          },
          alimento6: {
            variedade: [
              { marca: "", preco: 0 },
              { marca: "", preco: 0 },
              { marca: "", preco: 0 },
              { marca: "", preco: 0 },
              { marca: "", preco: 0 }
            ]
          },
          alimento7: {
            variedade: [
              { marca: "", preco: 0 },
              { marca: "", preco: 0 },
              { marca: "", preco: 0 },
              { marca: "", preco: 0 },
              { marca: "", preco: 0 }
            ]
          },
          alimento8: {
            variedade: [
              { marca: "", preco: 0 },
              { marca: "", preco: 0 },
              { marca: "", preco: 0 },
              { marca: "", preco: 0 },
              { marca: "", preco: 0 }
            ]
          },
          alimento9: {
            variedade: [
              { marca: "", preco: 0 },
              { marca: "", preco: 0 },
              { marca: "", preco: 0 },
              { marca: "", preco: 0 },
              { marca: "", preco: 0 }
            ]
          },
          alimento10: {
            variedade: [
              { marca: "", preco: 0 },
              { marca: "", preco: 0 },
              { marca: "", preco: 0 },
              { marca: "", preco: 0 },
              { marca: "", preco: 0 }
            ]
          },
          alimento11: {
            variedade: [
              { marca: "", preco: 0 },
              { marca: "", preco: 0 },
              { marca: "", preco: 0 },
              { marca: "", preco: 0 },
              { marca: "", preco: 0 }
            ]
          },
          alimento12: {
            variedade: [
              { marca: "", preco: 0 },
              { marca: "", preco: 0 },
              { marca: "", preco: 0 },
              { marca: "", preco: 0 },
              { marca: "", preco: 0 }
            ]
          },
          alimento13: {
            variedade: [
              { marca: "", preco: 0 },
              { marca: "", preco: 0 },
              { marca: "", preco: 0 },
              { marca: "", preco: 0 },
              { marca: "", preco: 0 }
            ]
          }
        }
      },
      mes: ""
    },
    copy: {},
    color: "primary",
    mensagem: "",
    colorMensagem: ""
  };
  async componentWillMount() { this.teste() }

  async componentDidMount() {
    this.setState({ cotacao: JSON.parse(await localStorage.getItem('item')) })
  }


  teste = async () => {
    if (!(await estaAutenticado())) {
      this.props.history.push("/")
    }
  }
  e = (params, campo, i, e) => {
    let cotacao = this.state.cotacao;
    this.setState({ color: "primary", mensagem: "Cotação Precisa Ser Salva", colorMensagem: "text-info" })
    cotacao.cesta.alimentos[params].variedade[i][campo] = parseFloat(e.target.value)
    this.setState({ cotacao })
    if (!e.target.value) { e.target.value = e.target.placeholder }
    return e
  }
  rows = (params) => {
    let rows = []
    for (let i = 0; i < 5; i++) {
      rows.push(<div className="form-row justify-content-center">
        <Input className="col-md-6" type="text" style={{ margin: 10 }} placeholder={this.state.cotacao.cesta.alimentos[params].variedade[i].marca}
          onInput={(e) => {
            e = this.e(params, "preco", i, e);
          }} />
        <Input className="col-md-5" type="text" style={{ margin: 10 }} placeholder={this.state.cotacao.cesta.alimentos[params].variedade[i].preco}
          onInput={(e) => { e.target.value = e.target.value.normalize('NFD').replace(/([^0-9.])/g, ""); e = this.e(params, "preco", i, e) }} />
      </div>
      )
    }
    return rows
  }
  Atualizar = async () => {
    if (JSON.stringify(this.state.cotacao) === await localStorage.getItem('item')) {

      this.setState({ mensagem: "É necessario alterar quaisquer uns dos campos para fazer a atualização", colorMensagem: "text-danger" })
      return
    }
    await api.put('Cotacao/' + this.state.cotacao._id, this.state.cotacao,
      { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } })
      .then((response) => {
        this.setState({ color: "success", colorMensagem: "text-success", mensagem: "Cotação atualizada" })
      })
      .catch((error) => {
        let erro;
        error.response.data ? erro = error.response.data.toLowerCase() :
          erro = error.response.data.error.toLowerCase()
        this.setState({ mensagem: erro })
      })
  }
  alimentos = () => (
    <>
      {Object.keys(this.state.cotacao.cesta.alimentos).map(a => (<FormGroup><Label>{this.state.cotacao.cesta.alimentos[a].nome}</Label>
        {this.rows(a)}</FormGroup>))}
    </>
  )

  render() {
    return (
      <>
        <div className='section'>
          <Container>
            <Card>
              <CardBody>
                <form>
                  {this.alimentos()}
                  <div className="form-row justify-content-center">
                    <Label>Mes de Referencia</Label>
                    <Input className="text-muted" value={this.state.cotacao.mes} type="select" onInput={(e) => this.setState({
                      cotacao: { ...this.state.cotacao, mes: e.target.value }, color: "primary", mensagem: "Cotação Precisa Ser Salva",
                      colorMensagem: "text-info"
                    })}>
                      <option >Janeiro</option>
                      <option>Fevereiro</option>
                      <option>Março</option>
                      <option>Abril</option>
                      <option>Maio</option>
                      <option>Junho</option>
                      <option>Julho</option>
                      <option>Agosto</option>
                      <option>Setembro</option>
                      <option>Outubro</option>
                      <option>Novembro</option>
                      <option>Dezembro</option>
                    </Input>
                    <Button onClick={this.Atualizar} color={this.state.color}>Atualizar</Button>
                  </div>
                </form>
                <Label className={this.state.colorMensagem}>{this.state.mensagem}</Label>
              </CardBody>
            </Card>
          </Container>
        </div>
      </>
    );
  }
}

export default AtualizarCesta;
