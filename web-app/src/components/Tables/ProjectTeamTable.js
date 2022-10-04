import React, { useState, useMemo } from "react";
import AddMember from "../Forms/AddMember";
import PaginationComponent from "./PaginationComponent";
import parsePhoneNumber from "libphonenumber-js";
import API from "../../utils/API";



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
  Modal,
  ModalHeader,
  CardFooter,
} from "reactstrap";

function ProjectTeamTable({
  projectGroup,
  setProjectTeam,
  toggleNewPerson,
  isNewMemberActive,
  projectId,
}) {
  //pagination
  const [totalTeamMembers, setTotalTeamMembers] = useState(0);
  const [currentTeamMembersPage, setCurrentTeamMembersPage] = useState(1);
  const teamMembersPerPage = 6;

  //pagination for team table
  const teamMembersData = useMemo(() => {
    let computedTeamMembers = projectGroup;

    setTotalTeamMembers(computedTeamMembers.length);

    //current page slice
    return computedTeamMembers.slice(
      (currentTeamMembersPage - 1) * teamMembersPerPage,
      (currentTeamMembersPage - 1) * teamMembersPerPage + teamMembersPerPage
    );
  }, [projectGroup, currentTeamMembersPage]);

  const removeTeamMember = async (projectId, userId) => {
    await API.removeDevMember(projectId, userId);

    const projectGroupRes = await API.getProjectUsers(projectId);
    setProjectTeam(projectGroupRes);
  };

  return (
    <Card className="shadow">
      <CardHeader className="border-0">
        <Row className="align-items-center">
          <Col>
            <h3 className="mb-0">Team</h3>
          </Col>

          <Col>
            <div className="col text-right">
              <Button color="default" onClick={toggleNewPerson} size="sm">
                New Member
              </Button>

              <Modal className="modal-dialog-centered modal-danger" isOpen={isNewMemberActive} onClose={toggleNewPerson}>
                <ModalHeader className="modal-header" toggle={toggleNewPerson}>

                  <h1 className="modal-title" id="modal-title-notification">
                    Add Member
                  </h1>
                </ModalHeader>
                <AddMember
                  projectId={projectId}
                  toggle={toggleNewPerson}
                  setProjectTeam={setProjectTeam}
                />
              </Modal>
            </div>
          </Col>
        </Row>
      </CardHeader>

      <Table className="align-items-center table-dark" responsive>
        <thead className="thead-dark">
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col" />
          </tr>
        </thead>
        <tbody>
          {teamMembersData.map((user) => {
            return (
              <tr key={user.userId} className="teamRow">
                <th>
                  <Media>
                    {user.firstname} {user.lastname}
                  </Media>
                </th>
                <td>{user.email}</td>
                <td>{parsePhoneNumber(user.phone, "US").formatNational()}</td>
                <td className="text-right">
                  <UncontrolledDropdown>
                    <DropdownToggle
                      className="btn-icon-only text-light"
                      href="#pablo"
                      role="button"
                      size="sm"
                      color=""
                      onClick={(e) => e.preventDefault()}
                    >
                      <i className="fas fa-ellipsis-v" />
                    </DropdownToggle>
                    <DropdownMenu className="dropdown-menu-arrow" right>
                      <DropdownItem
                        onClick={() =>
                          removeTeamMember(projectId, user._id)
                        }
                      >
                        Remove Team Member
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <CardFooter>
        <PaginationComponent
          total={totalTeamMembers}
          itemsPerPage={teamMembersPerPage}
          currentPage={currentTeamMembersPage}
          onPageChange={(page) => setCurrentTeamMembersPage(page)}
        />
      </CardFooter>
    </Card>
  );
}

export default ProjectTeamTable;
