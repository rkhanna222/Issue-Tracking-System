import React, { useState, useEffect, useMemo } from "react";
import CreateProject from "../Forms/CreateProject";
import UpdateProject from "../Forms/UpdateProject";
import PaginationComponent from "./PaginationComponent";
import { Link } from "react-router-dom";
import API from "../../utils/API";
import UsersCell from "./UsersCell";

// reactstrap components
import {
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Table,
  Button,
  Row,
  Modal,
  ModalHeader,
  Container,
} from "reactstrap";

const ProjectsTable = () => {
  const [projects, setProjects] = useState([]);
  const [isNewProjectOpen, setIsNewProjectOpen] = useState(false);
  const [isEditProjectOpen, setIsEditProjectOpen] = useState(false);
  const [selectedProjectId, setProjectIdSelected] = useState(null);
  const [selectedProjectData, setSelectedProjectData] = useState([]);

  //pagination
  const [allProjects, setallProjects] = useState(0);
  const [currentProjectPage, setCurrentProjectPage] = useState(1);
  const projectsPerPage = 6;

  const toggleNewProject = () => setIsNewProjectOpen(!isNewProjectOpen);
  const toggleEditProject = () => setIsEditProjectOpen(!isEditProjectOpen);
  const setProjectId = (event) => setProjectIdSelected(event.target.id);
  const resetProjectId = () => setProjectIdSelected(null);

  //Fetching project by ID
  useEffect(() => {
    let isRendered = true;
    async function fetchProjectById() {
      if (selectedProjectId) {
        try {
          const projectData = await API.getProjectById(selectedProjectId);
          if (isRendered === true) {
            setSelectedProjectData(projectData);
          }
        } catch (err) {
          console.log(err);
        }
      }
    }
    fetchProjectById();
    return () => {
      isRendered = false;
    };
  }, [selectedProjectId]);

  //fetch all projects
  useEffect(() => {
    let isRendered = true;
    async function fetchProjects() {
      const projectsData = await API.getProjects();
      if (isRendered === true) setProjects(projectsData);
    }
    fetchProjects();
    return () => {
      isRendered = false;
    };
  }, [isNewProjectOpen, selectedProjectId]);

  //Remove Project
  const removeProject = async (projectId) => {
    try {
      await API.removeProject(projectId);
      await API.getProjects().then((json) => {
        setProjects(json);
      });
    } catch (err) {
      console.log(err);
    }

    console.log("Project Removed!!!");
  };

  //Computing the pagination component
  const projectData = useMemo(() => {
    const computedProjects = projects;

    setallProjects(computedProjects.length);

    return computedProjects.slice(
      (currentProjectPage - 1) * projectsPerPage,
      (currentProjectPage - 1) * projectsPerPage + projectsPerPage
    );
  }, [projects, currentProjectPage]);

  if (projects) {
    return (
      <>
        <Table className="align-items-center table-dark" responsive>
          <Card>
            <CardHeader className="border-4">
              <Row className="ml-2 align-items-center">
                <h1 className="mb-0">Projects</h1>
                <div className="col text-right">
                  <Button color="default" onClick={toggleNewProject} size="sm">
                    Create Project
                  </Button>

                  <Modal
                    className="modal-dialog-centered modal-danger"
                    isOpen={isNewProjectOpen}
                    toggle={toggleNewProject}
                  >
                    <Container className="m-4 align-self-center" fluid>
                      <ModalHeader
                        className="modal-header"
                        toggle={toggleNewProject}
                      >
                        <h1
                          className="modal-title"
                          id="modal-title-notification"
                        >
                          Add New Project
                        </h1>
                      </ModalHeader>
                      <CreateProject
                        toggle={toggleNewProject}
                        setProjects={setProjects}
                      />
                    </Container>
                  </Modal>
                </div>
              </Row>
            </CardHeader>
            <Table className="align-items-center table-dark" responsive>
              <thead className="thead-dark">
                <tr>
                  <th scope="col">Project</th>
                  <th scope="col">Description</th>
                  <th scope="col">Contributors</th>
                </tr>
              </thead>
              <tbody>
                {projectData.map((project) => {
                  return (
                    <tr key={project._id}>
                      <th scope="row">
                        <Link to={`/admin/projects/${project._id}`}>
                          <Media>
                            <span>{project.projectTitle} </span>
                          </Media>
                        </Link>
                      </th>
                      <td
                        style={{
                          whiteSpace: "unset",
                          wordWrap: "break-word",
                        }}
                      >
                        <span>{project.projectDesc}</span>
                      </td>
                      <td>
                        <UsersCell
                          projectId={project._id}
                          selectedProjectId={selectedProjectId}
                        />
                      </td>
                      <td className="text-right">
                        <UncontrolledDropdown>
                          <DropdownToggle
                            className="btn-icon-only text-light"
                            role="button"
                            size="sm"
                            color=""
                            id={project._id}
                            onClick={(e) => setProjectId(e)}
                          >
                            <i className="fas fa-ellipsis-v" />
                          </DropdownToggle>
                          <DropdownMenu className="dropdown-menu-arrow" right>
                            <DropdownItem
                              id={project._id}
                              onClick={toggleEditProject}
                            >
                              Edit Project
                            </DropdownItem>
                            <DropdownItem
                              onClick={() => {
                                removeProject(project._id);
                              }}
                            >
                              Delete Project
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </td>
                    </tr>
                  );
                })}
                <Modal
                  className="modal-dialog-centered modal-danger"
                  isOpen={isEditProjectOpen && selectedProjectData !== null}
                  onClose={toggleEditProject}
                >
                  <Container className="m-4 align-self-center" fluid>
                    <ModalHeader toggle={toggleEditProject}>
                      <h1 className="modal-title" id="modal-title-notification">
                        Edit Project
                      </h1>
                    </ModalHeader>
                    <UpdateProject
                      toggle={toggleEditProject}
                      setProjects={setProjects}
                      resetProjectId={resetProjectId}
                      projectData={selectedProjectData}
                    />
                  </Container>
                </Modal>
              </tbody>
            </Table>
            <CardFooter className="py-3">
              <PaginationComponent
                total={allProjects}
                itemsPerPage={projectsPerPage}
                currentPage={currentProjectPage}
                onPageChange={(page) => setCurrentProjectPage(page)}
              />
            </CardFooter>
          </Card>
        </Table>
      </>
    );
  }

  return (
    <>
      <h1>Loading The Modal....</h1>
    </>
  );
};

export default ProjectsTable;
