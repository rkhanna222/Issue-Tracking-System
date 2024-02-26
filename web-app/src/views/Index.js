//Created By Raghav Khanna
import React from "react";
import ProjectsTable from "components/Tables/ProjectsTable.js";
import Header from "components/Headers/Header.js";
import AdminNavBar from "components/NavBars/AdminNavbar.js";
import TicketGraph from "components/Charts/TicketGraph.js";
import AdminFooter from "components/Footers/AdminFooter.js";
import { Chart } from 'chart.js';
import { Container, Col, Row } from "reactstrap";
import { chartOptions, parseOptions } from "variables/charts.js";
import TicketChartByPriority from "components/Charts/TicketChartByPriority.js";
import TicketChartByStatus from "components/Charts/TicketChartByStatus.js";

const Index = (props) => {
  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  return (
    <>
      <Col xl="12" className="mt-3">
        <Header />
        <Container className="mt-4">
          <AdminNavBar />
          <ProjectsTable />
          <Row className="mt-5">
            <Col xl="4" className="mb-2">
              <TicketGraph />
            </Col>
            <Col xl="4" className="mb-2">
              <TicketChartByPriority />
            </Col>
            <Col xl="4" className="mb-2">
              <TicketChartByStatus />
            </Col>
          </Row>
        </Container>
        <Container fixed>
          <AdminFooter />
        </Container>
      </Col>
    </>
  );
};

export default Index;
