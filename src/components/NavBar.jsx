import React, { useEffect } from "react";

import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useTheme } from "styled-components";
import MoonIcon from "../assets/icons/MoonIcon";
import SunIcon from "../assets/icons/SunIcon";
import SiteLogo from "../assets/icons/SiteLogo";

export default function NavBar({ onSearchInput, passSearch, onDarkModeToggle}) {
  const theme = useTheme();
  let location = useLocation();

  function searchInputListener(event) {
    onSearchInput(event.target.value);
  }

  const moonToggleHandler = () => {
    onDarkModeToggle();
  }

  useEffect(() => {}, [location]);

  return (
    <Navbar bg={theme.nav} sticky="top" style={{minWidth: '500px'}}>
      <Container fluid>
        <Navbar.Brand as={NavLink} to="/">
          <SiteLogo width='100' height='40'/>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll" >
          <Nav
            className="me-auto my-2 my-lg-0"
            navbarScroll
          >
            <Nav.Link as={NavLink}
                to="/latest"
                style={({ isActive }) => ({
                  color: isActive ? theme.highlight : theme.text,
                  textDecoration: isActive ? "solid underline" : "inherit",
                })}
                end
              >
                即時
            </Nav.Link>
            <Nav.Link as={NavLink}
                to="/hot"
                style={({ isActive }) => ({
                  color: isActive ? theme.highlight : theme.text,
                  textDecoration: isActive ? "solid underline" : "inherit",
                })}
                end
              >
                最Hit
            </Nav.Link>
          </Nav>
          <div>
          <div onClick={moonToggleHandler} style={{display: 'block'}}>{theme.mode === 'dark' ? <SunIcon /> : <MoonIcon />}</div>
          </div>
          {location.pathname !== "/" && (
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="搜尋新聞"
                className="me-2"
                aria-label="Search"
                value={passSearch}
                onChange={searchInputListener}
                style={{backgroundColor: theme.inputBackground,
                marginLeft: '18px'}}
              />
            </Form>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}