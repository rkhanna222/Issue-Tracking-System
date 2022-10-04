import React from "react";

// reactstrap components
import {
  Card,
  CardBody,
  CardTitle,
  Row
} from "reactstrap";

const Header = () => {

  return (
    <>
      <Card color="default" className="card-profile-stats mb-4 mb-xl-0">
        <CardBody>
          <Row>
            <div className="col">
              <CardTitle
                tag="h1"
                className="text-uppercase text-monospace text-muted mb-0"
              >
                Issue Tracking System
              </CardTitle>
            </div>
          </Row>
        </CardBody>
      </Card>
    </>
  )
};

export default Header;