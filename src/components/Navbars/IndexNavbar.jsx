import React from "react";
import { Link } from "react-router-dom";
import Register from "components/Register";
// reactstrap components
import {
  Button,
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  NavbarBrand,
  Navbar,
  NavItem,
  Nav,
  Container,
  Row,
  Col,
  Modal,
} from "reactstrap";

class ComponentsNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalRegister: false,
      collapseOpen: false,
      color: "navbar-transparent"
    };
    this.toggleModalRegister = this.toggleModalRegister.bind(this);
  }
  toggleModalRegister(){
    this.setState({
        modalRegister: !this.state.modalRegister
    });
}
  componentDidMount() {
    window.addEventListener("scroll", this.changeColor);
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.changeColor);
  }
  changeColor = () => {
    if (
      document.documentElement.scrollTop > 99 ||
      document.body.scrollTop > 99
    ) {
      this.setState({
        color: "bg-info"
      });
    } else if (
      document.documentElement.scrollTop < 100 ||
      document.body.scrollTop < 100
    ) {
      this.setState({
        color: "navbar-transparent"
      });
    }
  };
  toggleCollapse = () => {
    document.documentElement.classList.toggle("nav-open");
    this.setState({
      collapseOpen: !this.state.collapseOpen
    });
  };
  onCollapseExiting = () => {
    this.setState({
      collapseOut: "collapsing-out"
    });
  };
  onCollapseExited = () => {
    this.setState({
      collapseOut: ""
    });
  };
  scrollToDownload = () => {
    document
      .getElementById("download-section")
      .scrollIntoView({ behavior: "smooth" });
  };
  render() {
    return (
      <Navbar
        className={"fixed-top " + this.state.color}
        color-on-scroll="100"
        expand="lg"
      >
        <Container>
          <div className="navbar-translate">
            <NavbarBrand
              data-placement="bottom"
              to="/home"
              rel="noopener noreferrer"
              title="Designed and Coded by Creative Tim"
              tag={Link}
            >
              <span>nome do sistema• </span>
              Sitema para cotação
            </NavbarBrand>
            <button
              aria-expanded={this.state.collapseOpen}
              className="navbar-toggler navbar-toggler"
              onClick={this.toggleCollapse}
            >
              <span className="navbar-toggler-bar bar1" />
              <span className="navbar-toggler-bar bar2" />
              <span className="navbar-toggler-bar bar3" />
            </button>
          </div>
          <Collapse
            className={"justify-content-end " + this.state.collapseOut}
            navbar
            isOpen={this.state.collapseOpen}
            onExiting={this.onCollapseExiting}
            onExited={this.onCollapseExited}
          >
          <Row>
            <Col>
                <Nav navbar>
                <UncontrolledDropdown nav>
                    <DropdownToggle
                      caret
                      color="default"
                      data-toggle="dropdown"
                      href="/home"
                      nav
                      onClick={e => e.preventDefault()}
                    >
                      <i className="fa fa-cogs d-lg-none d-xl-none" />
                      Menu
                    </DropdownToggle>
                    <DropdownMenu className="dropdown-black">
                      <DropdownItem tag={Link} to="/register-page">
                        <i className="tim-icons icon-bullet-list-67" />
                        Register Page
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                  <NavItem >
                  <Button color="primary" onClick={this.toggleModalRegister}>
                      Criar novo Usuario
                  </Button>
                  <Modal
                    isOpen={this.state.modalRegister}
                    toggle={this.toggleModalRegister}>
                    <Register toggleModalRegister={this.toggleModalRegister}/>
                  </Modal>
                  </NavItem>
                </Nav>
            </Col>
            <Col className="text-right">
            <div className="navbar-collapse-header">
                <Col className="collapse-close text-right">
                  <button
                    aria-expanded={this.state.collapseOpen}
                    className="navbar-toggler"
                    onClick={this.toggleCollapse}
                  >
                    <i className="tim-icons icon-simple-remove" />
                  </button>
                </Col>
            </div>
            </Col>
          </Row>
          </Collapse>
        </Container>
      </Navbar>
    );
  }
}

export default ComponentsNavbar;
