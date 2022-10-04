import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Tables.css";
// reactstrap components
import { Row, Col, Container } from "reactstrap";
import Header from "../components/Headers/Header.js";
import ProjectTeamTable from "../components/Tables/ProjectTeamTable.js";
import SelectedTicket from "../components/Tickets/SelectedTicket";
import ProjectTicketsTable from "../components/Tables/ProjectTicketsTable.js";
import AdminNavBar from "../components/NavBars/AdminNavbar.js";
import API from "../utils/API";

const Project = () => {
  const projectId = useParams().id;

  const [projectList, setProjectData] = useState({});
  const [projectGroup, setProjectTeam] = useState([]);
  const [projectChecks, setProjectTickets] = useState([]);
  const [isNewMemberActive, setIsNewMemberOpen] = useState(false);
  const [isNewTicketActive, setIsNewTicketOpen] = useState(false);
  const [isEditTicketActive, setIsEditTicketOpen] = useState(false);
  const [pickTicketId, setSelectedTicketId] = useState("");
  const [pickTicket, setSelectedTicket] = useState({});
  const [selectedDevs, setAssignedDevs] = useState([]);
  const [comments, setComments] = useState([]);

  const toggleNewPerson = () => setIsNewMemberOpen(!isNewMemberActive);
  const toggleNewTicket = () => setIsNewTicketOpen(!isNewTicketActive);
  const toggleUpdateTicket = () => setIsEditTicketOpen(!isEditTicketActive);

  // update project team
  useEffect(() => {
    const abortController = new AbortController();

    async function fetchTeam() {
      try {
        const projectGroupRes = await API.getProjectUsers(
          projectId,
          abortController
        );

        setProjectTeam(projectGroupRes);
      } catch (err) {
        if (!abortController.signal.aborted) {
          console.log("Error fetching project team data", err);
        }
      }
    }

    fetchTeam();

    return () => {
      abortController.abort();
    };
  }, [projectId, isNewMemberActive]);

  // update project data
  useEffect(() => {
    const abortController = new AbortController();

    async function fetchData() {
      try {
        const projectListRes = await API.getProjectById(
          projectId,
          abortController
        );
        setProjectData(projectListRes);

        const projectChecksRes = await API.getTicketsByProject(
          projectId,
          abortController
        );
        setProjectTickets(projectChecksRes);
      } catch (err) {
        if (!abortController.signal.aborted) {
          console.log(`Error requesting project data: ${err}`);
        }
      }
    }
    fetchData();
    return () => {
      abortController.abort();
    };
  }, [projectId]);

  // update ticket data
  useEffect(() => {
    const abortController = new AbortController();

    async function fetchTicket() {
      try {
        if (pickTicketId) {
          const ticket = await API.getTicketById(pickTicketId, abortController);
          setSelectedTicket(ticket);
          const comments = await API.getTicketComments(
            pickTicketId,
            abortController
          );
          setComments(comments);

          //assignment of Devs
          const selectedDevs = await API.getDevAssignments(
            pickTicketId,
            abortController
          );
          setAssignedDevs(selectedDevs);
        }
      } catch (err) {
        if (!abortController.signal.aborted) {
          console.log(`Error requesting project data: ${err}`);
        }
      }
    }

    fetchTicket();

    return () => {
      abortController.abort();
    };
  }, [pickTicketId, projectId]);

  if (projectList && projectGroup && projectChecks) {
    return (
      <>
        <Col xl="12" className="mt-3">
          <Header />
          <AdminNavBar />
        </Col>
        <Container className="vh-100" fluid>
          <Row className="mt-2" id={projectList.id}>
            <Col>
              <h1 className="text-black d-none d-lg-inline-block">
                {projectList.projectTitle}
              </h1>
            </Col>
            <Col>
              <h2 className="text-black d-none d-lg-inline-block">
                {projectList.projectDesc}
              </h2>
            </Col>
          </Row>
          <Row>
            <Col xl="12" className="mt-3">
              <ProjectTeamTable
                projectGroup={projectGroup}
                setProjectTeam={setProjectTeam}
                toggleNewPerson={toggleNewPerson}
                isNewMemberActive={isNewMemberActive}
                projectId={projectId}
              />
            </Col>
            <Col xl="12" className="mt-3">
              <ProjectTicketsTable
                projectId={projectId}
                projectChecks={projectChecks}
                setProjectTickets={setProjectTickets}
                projectGroup={projectGroup}
                pickTicket={pickTicket}
                setSelectedTicketId={setSelectedTicketId}
                toggleUpdateTicket={toggleUpdateTicket}
                toggleNewTicket={toggleNewTicket}
                isEditTicketActive={isEditTicketActive}
                isNewTicketActive={isNewTicketActive}
                selectedDevs={selectedDevs}
              />
            </Col>
          </Row>
          <Row className="mt-3">
            <Col xl="12">
              <SelectedTicket
                pickTicket={pickTicket}
                selectedDevs={selectedDevs}
                comments={comments}
                setComments={setComments}
              />
            </Col>
          </Row>
        </Container>
      </>
    );
  }

  return <>Loading... </>;
};

export default Project;
