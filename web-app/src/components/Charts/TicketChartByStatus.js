import React, { useState, useEffect } from "react";
import Chart from "react-google-charts";
import API from "../../utils/API.js";

import { Card, CardHeader, Row, CardBody } from "reactstrap";

function TicketChartByStatus() {
  const [graphData, setgraphData] = useState([]);

  //use effect hook
  useEffect(() => {
    async function fetchChartData() {
      try {
        const chartData = await API.getChartData();
        setgraphData(chartData);
      } catch (err) {
        console.log("Error fetching graph data", err);
      }
    }
    fetchChartData();
  }, []);

  const data = [
    ["TicketStatus", "Count"],
    ["New", graphData.StatusNew],
    ["Open", graphData.StatusOpen],
    ["InProgress", graphData.StatusInProgress],
    ["Resolved", graphData.StatusResolved],
    ["AdditionalInfo", graphData.StatusAdditionalInfo],
  ];

  return (
    <div>
      <Card className="shadow">
        <CardHeader className="bg-transparent">
          <Row className="align-items-center">
            <div className="col">
              <h2 className="mb-0">Tickets by Status</h2>
            </div>
          </Row>
        </CardHeader>
        <CardBody>
          <Chart
            width={"100%"}
            height={"100%"}
            chartType="PieChart"
            loader={<div>Loading Chart</div>}
            data={data}
            rootProps={{ "data-testid": "1" }}
          />
        </CardBody>
      </Card>
    </div>
  );
}

export default TicketChartByStatus;
