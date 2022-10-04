//Created by Raghav Khanna

import React from "react";

// reactstrap components
import { Row, Col } from "reactstrap";

const Footer = () => {
  return (
    <footer className="py-5">
      <Row className="align-items-center justify-content-xl-between">
        <Col xl="6">
          <div className="copyright text-center text-muted">
            <a
              className="font-weight-bold ml-1"
              href="https://github.com/neu-mis-info6150-spring-2022/final-project-info6150_huskies"
              rel="noopener noreferrer"
              target="_blank"
            >
              Info Huskies Admin @ITS
            </a>
            © {new Date().getFullYear()}{" "}
          </div>
        </Col>
      </Row>
    </footer>
  );
};

export default Footer;
