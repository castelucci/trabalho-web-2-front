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
class CriarCesta extends React.Component {

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
      mes: "Janeiro"
    }, mensagem: "",
    alimentos: ["Carne", "Leite", "Feijão", "Arroz", "Farinha", "Batata", "Legumes (Tomate)", "Pão Francês", "Café em pó", "Frutas (Banana)", "Açucar", "Banha/Óleo", "Manteiga"]
  };
  componentWillMount() { this.teste() }

  async componentDidMount() {
    this.setState({ cotacao: { ...this.state.cotacao, user: (JSON.parse(await localStorage.getItem('user')))._id } })
  }


  teste = async () => {
    if (!(await estaAutenticado())) {
      this.props.history.push("/")
    }
  }
  rows = (params) => {
    let rows = []
    for (let i = 0; i < 5; i++) {
      rows.push(<div className="form-row justify-content-center">
        <Input className="col-md-6" type="text" style={{ margin: 10 }} placeholder="marca"
          onInput={(e) => {
            let cotacao = this.state.cotacao;
            cotacao.cesta.alimentos["alimento" + (params + 1)].variedade[i].marca = e.target.value
            this.setState({ cotacao })
          }} />
        <Input className="col-md-5" type="text" onkeypress='return event.charCode >= 48 && event.charCode <= 57' style={{ margin: 10 }} placeholder="Preço (Com '.' se necessário)"
          onInput={(e) => {
            e.target.value = e.target.value.normalize('NFD').replace(/([\u0300-\u036f]|[^0-9])/g, '')
            let cotacao = this.state.cotacao;
            cotacao.cesta.alimentos["alimento" + (params + 1)].variedade[i].preco = e.target.value
            this.setState({ cotacao })
          }} />
      </div>
      )
    }
    return rows
  }
  criar = async () => {
    let valido = false
    Object.keys(this.state.cotacao.cesta.alimentos).filter(i => (
      this.state.cotacao.cesta.alimentos[i].variedade.filter(i => (
        i.marca != "" && i.preco != 0 ? valido = true : false
      ))
    ))
    if (valido) {
      await api.post('user', this.state.cotacao,
        { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } })
        .then((response) => { this.props.history.push("/home") })
        .catch((error) => { })
    } else { this.setState({ mensagem: "É necessario pelo menos preencher uma marca com seu respectivo preço" }) }
  }
  alimentos = () => (
    <>
      {this.state.alimentos.map((a, index) => (<FormGroup><Label style={{ border: 3 }} >{a}</Label>{this.rows(index)}</FormGroup>))}
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
                    <Input className="text-muted" type="select" onInput={(e) => this.setState({ cotacao: { ...this.state.cotacao, mes: e.target.value } })}>
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
                    <Button onClick={this.criar} color="primary">Criar</Button>
                  </div>
                </form>
                <Label className="text-danger">{this.state.mensagem}</Label>
              </CardBody>
            </Card>
          </Container>
        </div>
      </>
    );
  }
}

export default CriarCesta;
