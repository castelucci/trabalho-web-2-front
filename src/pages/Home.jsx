import React from "react";
import classnames from "classnames";
import PerfectScrollbar from "perfect-scrollbar";
import {
  Button,
  /*Card,
  CardHeader,
  CardBody,
  Label,
  FormGroup,
  Form,
  Input,
  FormText,
  NavLink,*/
  Nav,
  Table,
  /* TabContent,
  TabPane,*/
  Container,/*
  Row,
  Col,
  UncontrolledTooltip,
  UncontrolledCarousel*/
  NavItem,
  UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem
} from "reactstrap";
import { estaAutenticado } from "../auth"
import api from "../services/api"
import Tabela from "../components/TabelaDeCotacao"
class Home extends React.Component {

  state = {
    get: [],
    mes:[],
    user:[],
    marca:[],
    disabled:false
  };
  componentWillMount() { this.teste()}
  
  componentDidMount() {
      this.getCotação()
  }
  getCotação = async (filtro) => {console.log(filtro)  
     await api.get("Cotacao/"+filtro,{
          headers:
            { Authorization: 'Bearer ' + localStorage.getItem('token') }
        }).then( (response) =>{ this.setState({get:response.data})
        let mes =[]; let user=[];let marca = []
        response.data.map(i =>{
            mes.push(i.mes)
            user.push(i.user)
            Object.keys(i.cesta.alimentos).map(a =>(
              i.cesta.alimentos[a].variedade.map(v=>(marca.push(v.marca)))
            ))
        })
        user = user.filter(function (a) {
          return !this[JSON.stringify(a)] && (this[JSON.stringify(a)] = true);
        }, Object.create(null))
        this.setState({marca: [...new Set(marca)]})
        this.setState({mes: [...new Set(mes)]})
        this.setState({user:user})
        this.setState({disabled:false})
        if (filtro) {
          this.setState({disabled:true})
        }
      })
        .catch((error)=> {})
  }

  teste = async () => {
    if (!(await estaAutenticado())) {
      this.props.history.push("/")
    }
  }
  paga =() =>{
    if (this.state.get) {
    return (
    <>
      <div className="section">
        <Nav className="justify-content-center">
        <NavItem className="nav-link">
            <Button color="info"
            onClick={e=>this.getCotação()}
            >Tudo</Button>
            </NavItem>
            <NavItem className="nav-link">
              <UncontrolledDropdown>
                  <DropdownToggle disabled={this.state.disabled} caret data-toggle="dropdown" >
                      Mês
                  </DropdownToggle>
                  <DropdownMenu>
                    {this.state.mes.map(i =>(
                    <DropdownItem key={i} onClick={e=>this.getCotação("mes:"+i)}>{i}</DropdownItem>
                    ))}
                  </DropdownMenu>
              </UncontrolledDropdown>
            </NavItem>
            <NavItem className="nav-link">
                <UncontrolledDropdown>
                    <DropdownToggle disabled={this.state.disabled} caret data-toggle="dropdown">
                        Usuario
                    </DropdownToggle>
                    <DropdownMenu>
                      {this.state.user.map(i =>(
                      <DropdownItem key={i._id} onClick={e=>this.getCotação("user:"+i._id)}>{i.nome}</DropdownItem>
                      ))}
                    </DropdownMenu>
                </UncontrolledDropdown>
            </NavItem>
            <NavItem className="nav-link">
            <UncontrolledDropdown>
                    <DropdownToggle disabled={/*this.state.disabled*/true} caret data-toggle="dropdown">
                        Marca
                    </DropdownToggle>
                    <DropdownMenu>
                      {this.state.marca.map(i =>(
                      <DropdownItem onClick={e=>this.getCotação("marca:"+i)}>{i}</DropdownItem>
                      ))}
                    </DropdownMenu>
                </UncontrolledDropdown>
            </NavItem>
            <NavItem className="nav-link">
                
            </NavItem>
        </Nav>
          </div>
        <Tabela get={this.state.get} history={this.props.history}/>
      
    </>
    )
  }
    return ( <div>Erro ao acessar o servidor</div>)
  }
  render() {
    return (<>{this.paga()}</>
      );
  }
}

export default Home;
