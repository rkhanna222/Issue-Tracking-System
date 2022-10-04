//Created by Raghav Khanna

import React from "react";

// reactstrap components
import { Container, Row, Col } from "reactstrap";

const AuthFooter = () => {
  return (
    <>
      <footer className="py-5">
        <Container>
          <Row className="align-items-center justify-content-center">
            <Col xl="6">
              <div className="copyright text-center text-muted">
                <a
                  className="font-weight-bold ml-1"
                  href="https://github.com/neu-mis-info6150-spring-2022/final-project-info6150_huskies"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Info Huskies @ITS
                </a>
                © {new Date().getFullYear()}{" "}
              </div>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
};

export default AuthFooter;
