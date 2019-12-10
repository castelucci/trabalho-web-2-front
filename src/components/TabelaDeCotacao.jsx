import React from "react";
import {
  Button,
  Table,
  Container,
} from "reactstrap";
import { estaAutenticado } from "../auth"
import api from "../services/api"

class TabelaDeCotacao extends React.Component {

  state = {
    get: []

  };
  edit = (item)=>{
      localStorage.setItem("item",JSON.stringify(item))
      this.props.history.push("/cesta2")
  }
  deletar = (id)=>{
      console.log(id);
      api.delete("Cotacao/"+id,{
        headers: {Authorization: 'Bearer '+localStorage.getItem('token')}})
        .then((response) =>{this.render()})
        .catch((error)=>{console.log(error)})
  }

  render() {
    return (
      <Container>
          {this.props.get.map(item=> (
            <Table key={item._id}>
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>Marca</th>
                    <th className="text-center">Preço Mínimo</th>
                    <th className="text-right">Preço Médio</th>
                    <th className="text-right">Preço Máximo</th>
                </tr>
            </thead>
            <tbody>
              {Object.keys(item.cesta.alimentos).map(a =>(
                <tr>
                    <td>{item.cesta.alimentos[a].nome}</td>
                    <td>{item.cesta.alimentos[a].variedade.map(v=>{return v.marca+", "})}</td>
                    <td className="text-center">{item.cesta.alimentos[a].valorMin}</td>
                    <td className="text-right">{item.cesta.alimentos[a].valorMedio}</td>
                    <td className="text-right">{item.cesta.alimentos[a].valorMax}</td>
               </tr>
              ))}
            </tbody>
            <tfoot /*style={{float: "right"}}*/ >
            <tr>
              <td>Feito por {item.user.nome}</td>
              <td>mês referente a {item.mes}</td>
              <td className="text-right">
                <Button onClick={e=>this.edit(item)} className="btn-round" color="success" size="sm">
                  <i className="tim-icons icon-pencil"/>Editar
               </Button>
              </td>
              <td className="text-right">
                <Button onClick={e=>this.deletar(item._id)} className="btn-round" color="danger" size="sm">
                  <i className="tim-icons icon-simple-remove"/>Deletar
               </Button>
              </td>
            </tr>
          </tfoot>
        </Table>
          ))}
      </Container>
    );
  }
}

export default TabelaDeCotacao;
