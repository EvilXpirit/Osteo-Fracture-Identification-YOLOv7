import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-scroll';

function Header({ handleSectionChange }) {
  return (
    <header className="App-header">
      <Navbar expand="lg" className="fixed-top navbar">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="navbar-dark">
            <Link
                to="home"
                spy={true}
                smooth={true}
                duration={500}
                offset={-70}
                className="nav-link"
                style={{cursor: 'pointer'}}
              >
                Home
              </Link>
              {/* <Nav.Link onClick={() => handleSectionChange('home')}>Home</Nav.Link> */}
              <Nav.Link href="http://localhost:8501/">Detect</Nav.Link>
              <Link
                to="instructions"
                spy={true}
                smooth={true}
                duration={500}
                offset={-70}
                className="nav-link"
                style={{cursor: 'pointer'}}
              >
                Instructions
              </Link>
              <Link
                to="info"
                spy={true}
                smooth={true}
                duration={500}
                offset={-70}
                className="nav-link"
                style={{cursor: 'pointer'}}
              >
                Info
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
