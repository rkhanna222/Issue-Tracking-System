//Created by Raghav Khanna

import React, { useEffect } from "react";
import { useLocation, Route, Switch, Redirect } from "react-router-dom";
// reactstrap components
import { Container } from "reactstrap";
// core components

import AdminFooter from "components/Footers/AdminFooter.js";
import UniversalSidebar from "components/Sidebar/UniversalSidebar.js";

// import { useAuth } from "../contexts/AuthContext";
import routes from "routes.js";

const Admin = (props) => {
  const mainContent = React.useRef(null);
  const location = useLocation();

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, [location]);

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "admin") {
        return (
          <Route
            path={prop.root + prop.path}
            render={() => <prop.component {...props} />}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };

  return (
    <>
      <UniversalSidebar
        {...props}
        routes={routes}
        logo={{
          innerLink: "/admin/index",
          imgSrc: require("../assets/img/brand/ITS.png").default,
          imgAlt: "...",
        }}
      />
      <div className="main-content" ref={mainContent}>
        <Switch>
          {getRoutes(routes)}
          <Redirect from="*" to="/admin/index" />
        </Switch>
        <Container fixed>{/* <AdminFooter /> */}</Container>
      </div>
    </>
  );
};

export default Admin;
