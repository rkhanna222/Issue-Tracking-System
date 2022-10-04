//Created by Raghav Khanna

import React, { useState } from "react";
import { NavLink as NavLinkRRD, Link } from "react-router-dom";

// reactstrap components
import {
  Button,
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
} from "reactstrap";

const AdminSidebar = (props) => {
  const [open, setopen] = useState();

  // collapse state open/closed
  const toggleCollapse = () => {
    setopen((data) => !data);
  };
  // closes the collapse
  const close = () => {
    setopen(false);
  };
  // creates the links that appear in the Sidebar
  const createLinks = (routes) => {
    if (
      props.authLevel === "admin" ||
      localStorage.getItem("auth") === "admin"
    ) {
      return routes.map((prop, key) => {
        if (prop.layout === "admin" && prop.display) {
          return (
            <NavItem key={key}>
              <NavLink
                to={prop.root + prop.path}
                tag={NavLinkRRD}
                onClick={close}
                activeClassName="active"
              >
                <i className={prop.icon} />
                {prop.name}
              </NavLink>
            </NavItem>
          );
        }
      });
    } else {
      return routes.map((prop, key) => {
        if (prop.layout === "general" && prop.display) {
          return (
            <NavItem key={key}>
              <NavLink
                to={prop.path}
                tag={NavLinkRRD}
                onClick={close}
                activeClassName="active"
              >
                <i className={prop.icon} />
                {prop.name}
              </NavLink>
            </NavItem>
          );
        }
      });
    }
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    props.setAuth(false);
    props.setAuthLevel("");
  };

  const { routes, logo } = props;
  let navbarBrandProps;
  if (logo && logo.innerLink) {
    navbarBrandProps = {
      to: logo.innerLink,
      tag: Link,
    };
  } else if (logo && logo.outterLink) {
    navbarBrandProps = {
      href: logo.outterLink,
      target: "_blank",
    };
  }

  return (
    <Navbar
      className="navbar-vertical fixed-left navbar-light bg-transparent"
      expand="md"
      id="sidenav-main"
    >
      <Container fluid>
        {/* Toggler */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleCollapse}
        >
          <span className="navbar-toggler-icon" />
        </button>
        {/* Brand */}
        {logo ? (
          <NavbarBrand className="pt-0" {...navbarBrandProps}>
            <img
              alt={logo.imgAlt}
              className="navbar-brand-img"
              src={logo.imgSrc}
            />
          </NavbarBrand>
        ) : null}
        {/* Collapse */}
        <Collapse navbar isOpen={open}>
          {/* Collapse header */}
          <div className="navbar-collapse-header d-md-none">
            <Row>
              {logo ? (
                <Col className="collapse-brand" xs="6">
                  {logo.innerLink ? (
                    <Link to={logo.innerLink}>
                      <img alt={logo.imgAlt} src={logo.imgSrc} />
                    </Link>
                  ) : (
                    <a href={logo.outterLink}>
                      <img alt={logo.imgAlt} src={logo.imgSrc} />
                    </a>
                  )}
                </Col>
              ) : null}
              <Col className="collapse-close" xs="6">
                <button
                  className="navbar-toggler"
                  type="button"
                  onClick={toggleCollapse}
                >
                  <span />
                  <span />
                </button>
              </Col>
            </Row>
          </div>
          {/* Navigation */}
          <Nav navbar>{createLinks(routes)}</Nav>
          {/* Divider */}
          <hr className="my-2" />
          <Row className="justify-content-center">
            <Button color="danger" onClick={logout}>
              Logout
            </Button>
          </Row>
        </Collapse>
      </Container>
    </Navbar>
  );
};

export default AdminSidebar;
