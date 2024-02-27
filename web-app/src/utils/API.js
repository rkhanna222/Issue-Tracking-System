//Created by Raghav Khanna
import dotenv from 'dotenv'; // Import dotenv
dotenv.config();

const apiUrl = process.env.REACT_APP_API_URL;

const API = {
  //Login
  login: function (userInfo) {
    return fetch("${apiUrl}/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("accessToken"),
      },
      body: JSON.stringify(userInfo),
    });
  },
  //create new user
  addUser: function (userData) {
    return fetch("${apiUrl}/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("accessToken"),
      },
      body: JSON.stringify(userData),
    }).then((res) => res.json());
  },

  //Update user details

  updateUser: function (userid, values) {
    return fetch(`${apiUrl}/api/users/${userid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("accessToken"),
      },
      body: JSON.stringify(values),
    }).then((res) => res.json());
  },

  //Create new project
  createProject: function (projectdata) {
    return fetch("${apiUrl}/api/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("accessToken"),
      },
      body: JSON.stringify(projectdata),
    }).then((res) => res.json());
  },
  // Gets all projects
  getProjects: function () {
    return fetch("${apiUrl}/api/projects", {
      headers: {
        "x-auth-token": localStorage.getItem("accessToken"),
      },
    }).then((res) => res.json());
  },

  // Gets project by id
  getProjectById: function (projectId) {
    return fetch(`${apiUrl}/api/projects/${projectId}`, {
      headers: {
        "x-auth-token": localStorage.getItem("accessToken"),
      },
    }).then((res) => res.json());
  },
  // Gets all users projects
  getUsersProjects: function () {
    return fetch("${apiUrl}/api/usersProjects", {
      headers: {
        "x-auth-token": localStorage.getItem("accessToken"),
      },
    }).then((res) => res.json());
  },
  // Gets all users
  getUsers: function () {
    return fetch("${apiUrl}/api/users/", {
      headers: {
        "x-auth-token": localStorage.getItem("accessToken"),
      },
    }).then((res) => res.json());
  },
  //Add developer to team
  addProjectDevs: function (projectId, userId) {
    return fetch(
      "${apiUrl}/api/usersProjects/" + projectId + "/" + userId,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.getItem("accessToken"),
        },
      }
    ).then((res) => res.json());
  },
  //Remove Developer from team
  removeDevMember: function (projectId, userId) {
    return fetch(
      `${apiUrl}/api/usersProjects/${projectId}/${userId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.getItem("accessToken"),
        },
      }
    );
  },
  //Remove Project
  removeProject: function (projectId) {
    return fetch(`${apiUrl}/api/projects/${projectId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("accessToken"),
      },
    });
  },
  //To get project users
  getProjectUsers: function (projectId) {
    console.log("in getProject users check 0");
    console.log("access token", localStorage.getItem("accessToken"));
    return fetch("${apiUrl}/api/usersProjects/" + projectId, {
      headers: {
        "x-auth-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  },

  //Remove member from a project
  removeTeamMember: function (projectId, userId) {
    console.log("inside the remove team member in project ticket");
    return fetch("${apiUrl}/api/usersProjects/" + projectId, {
      headers: {
        "x-auth-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
      method: "DELETE",
      body: JSON.stringify({ userId: userId }),
    }).then((res) => res.json());
  },
  //To get available users
  getAvailableUsers: function (projectId, abortController) {
    let signal = null;
    if (abortController) signal = abortController.signal;
    return fetch("${apiUrl}/api/users", {
      signal,
      headers: {
        "x-auth-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  },
  //To create a new ticket
  createNewTicket: function (projectId, data) {
    return fetch("${apiUrl}/api/tickets/" + projectId, {
      headers: {
        "x-auth-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    }).then((res) => res.json());
  },
  //Get Tickets by project
  getTicketsByProject: function (projectId) {
    return fetch("${apiUrl}/api/tickets/" + projectId, {
      headers: {
        "x-auth-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
      method: "GET",
    }).then((res) => res.json());
  },
  //To get tickets
  getTicketsByUser: function () {
    return fetch("${apiUrl}/api/tickets/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("accessToken"),
      },
    });
  },
  //Assigning developers to ticket
  assignDevsToTickets: function (id, devId) {
    return fetch(
      "${apiUrl}/api/tickets/assigndevs/" + id + "/" + devId + "/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.getItem("accessToken"),
        },
        body: JSON.stringify({ id: devId }),
      }
    ).then((res) => res.json());
  },
  //Removing a ticket
  removeTicket: function (ticketId) {
    return fetch("${apiUrl}/api/tickets/" + ticketId, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("accessToken"),
      },
    }).then((res) => res.json());
  },
  //Getting the ticket Pie chart data
  getChartData: function () {
    return fetch("${apiUrl}/api/charts/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("accessToken"),
      },
    }).then((res) => res.json());
  },

  //Removing a user/developer
  removeMember: function (userid) {
    return fetch(`${apiUrl}/api/users/${userid}`, {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("accessToken"),
        "Access-Control-Allow-Origin": "*",
      },
    }).then((res) => res.json());
  },
  //Updateproject
  updateProject: function (projectid, values) {
    return fetch(`${apiUrl}/api/projects/${projectid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("accessToken"),
      },
      body: JSON.stringify(values),
    }).then((res) => res.json());
  },

  //Get ticket by ID
  getTicketById: function (ticketId, abortController) {
    let signal = null;
    if (abortController) signal = abortController.signal;
    return fetch("${apiUrl}/api/tickets/singleTicket/" + ticketId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("accessToken"),
      },
      signal,
    }).then((res) => res.json());
  },
  //Get ticket comments
  getTicketComments: function (ticketId, abortController) {
    let signal = null;
    if (abortController) signal = abortController.signal;
    return fetch("${apiUrl}/api/tickets/comments/" + ticketId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("accessToken"),
      },
      signal,
    }).then((res) => res.json());
  },
  //get developer assignment
  getDevAssignments: function (ticketId, abortController) {
    let signal = null;
    if (abortController) signal = abortController.signal;
    return fetch("${apiUrl}/api/tickets/assignes/" + ticketId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("accessToken"),
      },
      signal,
    }).then((res) => res.json());
  },
  //To add a comment
  createComment: function (ticketId, commentText) {
    return fetch("${apiUrl}/api/tickets/comments/" + ticketId, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("accessToken"),
      },
      body: JSON.stringify({ commentText: commentText }),
    }).then((res) => res.json());
  },
  //To remove a comment
  removeComment: function (ticketId, commentId) {
    return fetch(
      "${apiUrl}/api/tickets/comments/" +
        ticketId +
        "/" +
        commentId,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.getItem("accessToken"),
        },
      }
    ).then((res) => res.json());
  },
  //Send Forgot password link
  sendLink: function (email) {
    return fetch("${apiUrl}/api/auth/requestResetPassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("accessToken"),
      },
      body: JSON.stringify(email),
    });
  },
  //To update password
  updatePassword: function (password, userid) {
    return fetch(`${apiUrl}/api/auth/resetPassword/${userid}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("accessToken"),
      },
      body: JSON.stringify(password),
    });
  },
  //Get user by email
  getUserByEmail: function (email) {
    return fetch(`${apiUrl}/api/users/email/${email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("accessToken"),
      },
    }).then((res) => res.json());
  },
  //To reset password
  resetPassword: function (userId, token, password) {
    return fetch(`${apiUrl}/api/auth/resetPassword/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("accessToken"),
      },

      body: JSON.stringify({ id: userId, token, password }),
    });
  },
  //Update Ticket
  updateTicketData: function (ticketid, values) {
    return fetch(`${apiUrl}/api/tickets/${ticketid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("accessToken"),
      },
      body: JSON.stringify(values),
    }).then((res) => res.json());
  },
};

export default API;
