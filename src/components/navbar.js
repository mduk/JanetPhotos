import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

export default class extends React.Component {
  render() {
    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#/">Janet Photos</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <NavDropdown title="By Year" id="year-nav-dropdown">
              <NavDropdown.Item href="#/year/0000">0000</NavDropdown.Item>
              <NavDropdown.Item href="#/year/2004">2004</NavDropdown.Item>
              <NavDropdown.Item href="#/year/2013">2013</NavDropdown.Item>
              <NavDropdown.Item href="#/year/2014">2014</NavDropdown.Item>
              <NavDropdown.Item href="#/year/2015">2015</NavDropdown.Item>
              <NavDropdown.Item href="#/year/2016">2016</NavDropdown.Item>
              <NavDropdown.Item href="#/year/2017">2017</NavDropdown.Item>
              <NavDropdown.Item href="#/year/2018">2018</NavDropdown.Item>
              <NavDropdown.Item href="#/year/2019">2019</NavDropdown.Item>
              <NavDropdown.Item href="#/year/2020">2020</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="By Tag" id="tag-nav-dropdown">
              <NavDropdown.Item href="#/tag/Dougie">Dougie</NavDropdown.Item>
              <NavDropdown.Item href="#/tag/LaiLai">LaiLai</NavDropdown.Item>
              <NavDropdown.Item href="#/tag/Garden">Garden</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#/untagged">Untagged</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}
