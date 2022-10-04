import React, { useState, useEffect } from "react";
import Chart from "react-google-charts";
import API from "../../utils/API.js";

import { Card, CardHeader, Row, CardBody } from "reactstrap";

function TicketChartByPriority() {
  const [graphData, setgraphData] = useState([]);

  //use effect hook to get ticket graph data
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
    ["TicketPriority", "Count"],
    ["Low", graphData.PriorityLow],
    ["Medium", graphData.PriorityMedium],
    ["High", graphData.PriorityHigh],
    ["Immediate", graphData.PriorityImmediate],
  ];

  return (
    <div>
      <Card className="shadow">
        <CardHeader className="bg-transparent">
          <Row className="align-items-center">
            <div className="col">
              <h2 className="mb-0">Tickets by Priority</h2>
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
            colors={["#e0440e", "#e6693e", "#ec8f6e", "#f3b49f", "#f6c7b6"]}
            rootProps={{ "data-testid": "1" }}
          />
        </CardBody>
      </Card>
    </div>
  );
}

export default TicketChartByPriority;
