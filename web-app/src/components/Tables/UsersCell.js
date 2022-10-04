import React, { useState, useEffect } from "react";
import API from "../../utils/API";
import { Row } from "reactstrap";

const UsersCell = (props) => {
  let [projectUsers, setProjectUsers] = useState([]);

  //Fetching Project Members
  useEffect(() => {
    let isRendered = true;
    async function fetchProjects() {
      const projectsData = await API.getProjectUsers(props.projectId);
      if (isRendered === true) setProjectUsers(projectsData);
    }
    fetchProjects();
    return () => {
      isRendered = false;
    };
  }, [props.projectId, props.selectedProjectId]);

  if (projectUsers && projectUsers.length) {
    return (
      <>
        {projectUsers.map((user) => {
          return (
            <Row key={user._id}>
              <span>
                {user.firstname} {user.lastname}
              </span>
            </Row>
          );
        })}
      </>
    );
  }

  return (
    <>
      <Row>
        <span>No Users Assigned</span>
      </Row>
    </>
  );
};

export default UsersCell;
