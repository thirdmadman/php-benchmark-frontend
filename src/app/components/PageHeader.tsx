import { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { GlobalConstants } from '../../GlobalConstants';

export default class PageHeader extends Component {
  render() {
    const title = GlobalConstants.APP_NAME;
    return (
      <header className="py-3 mb-4 border-bottom">
        <Navbar expand="lg">
          <Container>
            <Navbar.Brand>{title}</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav>
                <Nav.Item>
                  <NavLink
                    to={GlobalConstants.ROUTE_MAIN}
                    className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
                  >
                    Statistic
                  </NavLink>
                </Nav.Item>
                <Nav.Item>
                  <NavLink
                    to={GlobalConstants.ROUTE_CONFIGS}
                    className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
                  >
                    Configs
                  </NavLink>
                </Nav.Item>
                <Nav.Item>
                  <NavLink
                    to={GlobalConstants.ROUTE_ADMIN}
                    className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
                  >
                    Admin
                  </NavLink>
                </Nav.Item>
                <Nav.Item>
                  <NavLink
                    to={GlobalConstants.ROUTE_ABOUT}
                    className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
                  >
                    About
                  </NavLink>
                </Nav.Item>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
    );
  }
}
