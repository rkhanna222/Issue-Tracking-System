import React, { useState, useMemo } from "react";
import "../../views/Tables.css";
import UpdateTicket from "../Forms/UpdateTicket.js";

// reactstrap components
import {
  Card,
  CardHeader,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Table,
  Button,
  Row,
  Col,
  Container,
  Modal,
  ModalHeader,
  CardFooter,
} from "reactstrap";

import PaginationComponent from "./PaginationComponent";
import CreateTicket from "../Forms/CreateTicket";
import API from "../../utils/API";

const ProjectTicketsTable = ({
  projectId,
  projectChecks,
  setProjectTickets,
  projectGroup,
  pickTicket,
  setSelectedTicketId,
  toggleUpdateTicket,
  toggleNewTicket,
  isEditTicketActive,
  isNewTicketActive,
  selectedDevs,
}) => {
  //pagination
  const [totalTickets, setTotalTickets] = useState(0);
  const [currentTicketPage, setCurrentTicketPage] = useState(1);
  const ticketsPerPage = 6;

  //pagination for tickets table
  const ticketsData = useMemo(() => {
    let computedTickets = projectChecks;

    setTotalTickets(computedTickets.length);

    //current page slice
    return computedTickets.slice(
      (currentTicketPage - 1) * ticketsPerPage,
      (currentTicketPage - 1) * ticketsPerPage + ticketsPerPage
    );
  }, [projectChecks, currentTicketPage]);

  const removeTicket = async (ticketId) => {
    await API.removeTicket(ticketId);

    const projectChecksRes = await API.getTicketsByProject(projectId);
    setProjectTickets(projectChecksRes);
  };

  return (
    <Card className="shadow">
      <CardHeader>
        <Row className="align-items-center">
          <Col>
            <h3 className="mb-0">Tickets</h3>
          </Col>
          <Col>
            <div className="col text-right">
              <Button color="default" onClick={toggleNewTicket} size="sm">
                New Ticket
              </Button>

              <Modal
                className="modal-dialog-centered modal-danger"
                isOpen={isNewTicketActive}
                toggle={toggleNewTicket}
              >
                <Container className="m-4 align-self-center" fluid>
                  <ModalHeader
                    className="modal-header"
                    toggle={toggleNewTicket}
                  >
                    <h1 className="modal-title" id="modal-title-notification">
                      Create Ticket
                    </h1>
                  </ModalHeader>
                  <CreateTicket
                    devs={projectGroup}
                    toggle={toggleNewTicket}
                    setProjectTickets={setProjectTickets}
                  />
                </Container>
              </Modal>
            </div>
          </Col>
        </Row>
      </CardHeader>

      <Table className="align-items-center table-dark" responsive>
        <thead className="thead-dark">
          <tr>
            <th scope="col">Ticket Title</th>
            <th scope="col">Description</th>
            <th scope="col">Ticket Author</th>
            <th scope="col" />
          </tr>
        </thead>
        <tbody>
          {ticketsData.map((ticket) => {
            return (
              <tr
                key={ticket._id}
                id={ticket._id}
                className="ticketRow"
                onClick={() => {
                  setSelectedTicketId(ticket._id);
                }}
              >
                <th>
                  <Media>{ticket.ticketTitle}</Media>
                </th>
                <td
                  style={{
                    whiteSpace: "unset",
                    wordWrap: "break-word",
                  }}
                >
                  {ticket.ticketDescription}
                </td>
                <td key={ticket.ticketAuthor}>
                  {ticket.firstname} {ticket.lastname}
                </td>
                <td className="text-right">
                  <UncontrolledDropdown>
                    <DropdownToggle
                      className="btn-icon-only text-light"
                      role="button"
                      size="sm"
                      color=""
                      onClick={() => {
                        setSelectedTicketId(ticket._id);
                      }}
                    >
                      <i className="fas fa-ellipsis-v" />
                    </DropdownToggle>
                    <DropdownMenu className="dropdown-menu-arrow" right>
                      <DropdownItem onClick={toggleUpdateTicket}>
                        Edit Ticket
                      </DropdownItem>

                      <DropdownItem
                        onClick={() => {
                          removeTicket(ticket._id);
                        }}
                      >
                        Remove Ticket
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </td>
              </tr>
            );
          })}

          <Modal
            className="modal-dialog-centered modal-danger"
            isOpen={isEditTicketActive}
            toggle={toggleUpdateTicket}
          >
            <Container className="m-4 align-self-center" fluid>
              <ModalHeader toggle={toggleUpdateTicket}>
                <h1 className="modal-title" id="modal-title-notification">
                  Edit Ticket
                </h1>
              </ModalHeader>

              {/* Need to import component for updating the ticket */}
              <UpdateTicket
                team={projectGroup}
                ticketData={pickTicket}
                toggle={toggleUpdateTicket}
                setProjectTickets={setProjectTickets}
                selectedDevs={selectedDevs}
              />
            </Container>
          </Modal>
        </tbody>
      </Table>
      <CardFooter>
        <PaginationComponent
          total={totalTickets}
          itemsPerPage={ticketsPerPage}
          currentPage={currentTicketPage}
          onPageChange={(page) => setCurrentTicketPage(page)}
        />
      </CardFooter>
    </Card>
  );
};

export default ProjectTicketsTable;
