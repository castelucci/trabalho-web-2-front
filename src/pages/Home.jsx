import React from "react";
import classnames from "classnames";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Label,
  FormGroup,
  Form,
  Input,
  FormText,
  NavItem,
  NavLink,
  Nav,
  Table,
  TabContent,
  TabPane,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
  UncontrolledCarousel
} from "reactstrap";
import {estaAutenticado} from "../auth"
import api from "../services/api"
// core components
import Footer from "components/Footer/Footer.jsx";

class ProfilePage extends React.Component {
 
    state = {get:[]

    };
  
  componentWillMount(){this.teste()}

  teste= async()=>{
    if (!(await estaAutenticado())) {
      this.props.history.push("/")
    }
  }

  componentDidMount() {
    this.getCotação()
  }
  componentWillUnmount() {

  }
  getCotação = async ()=>{
   this.setState({get: (await api.get("Cotacao",{headers: 
    {Authorization: 'Bearer '+localStorage.getItem('token')}})).data}) 
    console.log(this.state.get);
    
  }
  render() {
    return (
      <>
        <div>
          {this.state.get.map(item =>(
            <div key={item._id}>
              <p>{item.Cidade}</p>
              <p>{item.user}</p>
              <p>{item.mes}</p>
            </div>
          ))}
        </div>
    </>
    );
  }
}

export default ProfilePage;
