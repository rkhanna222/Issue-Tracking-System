import React, { useState, useEffect } from "react";
import Chart from "react-google-charts";
import API from "../../utils/API.js";

import { Card, CardHeader, Row, CardBody } from "reactstrap";

function TicketGraph() {
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
    ["TicketType", "Count"],
    ["Issue", graphData.TypeIssue],
    ["Bug", graphData.TypeBug],
    ["Error", graphData.TypeError],
    ["Feature", graphData.TypeFeature],
    ["Other", graphData.TypeOther],
  ];

  return (
    <div>
      <Card className="shadow">
        <CardHeader className="bg-transparent">
          <Row className="align-items-center">
            <div className="col">
              <h2 className="mb-0">Tickets by Type</h2>
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

export default TicketGraph;
