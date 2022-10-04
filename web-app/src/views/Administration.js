import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Tables.css";
import AdminNavBar from "components/NavBars/AdminNavbar.js";

// core components
import Header from "components/Headers/Header.js";

import parsePhoneNumber, { AsYouType } from "libphonenumber-js";
import API from "../utils/API";

// reactstrap components
import {
  Card,
  CardHeader,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  ListGroup,
  ListGroupItem,
  Container,
  Row,
  Col,
} from "reactstrap";

const Administration = () => {
  const [members, setmembers] = useState([]);
  const [selectedMember, setselectedMember] = useState({
    id: "",
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
    auth: "",
  });
  const [values, setValues] = useState({});

  //phone number format handling
  const asYouType = new AsYouType("US");
  const parseDigits = (string) => (string.match(/\d+/g) || []).join("");

  useEffect(() => {
    setValues(selectedMember);
  }, [selectedMember]);

  //Fetching all users
  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const users = await API.getUsers();

        setmembers(users);
      } catch (err) {
        if (!DOMException) {
          console.log(err);
        }
      }
    };

    fetchAllUsers();

    return () => {};
  }, []);

  //Function to remove the user
  const removeMember = async () => {
    if (window.confirm("Are you sure you want to remove user?")) {
      try {
        const removedUser = await API.removeMember(selectedMember._id);

        toast.error("User information updated", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        const users = await API.getUsers();
        setmembers(users);
      } catch (err) {
        console.log("User deletion failed ");
      }
    } else {
      console.log("Deletion aborted");
    }
  };

  const handleChange = (e) => {
    let value = e.target.value;
    let name = e.target.name;

    setValues({ ...values, [name]: value });
  };

  //Function called on Submit button
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedValues = {
      firstname: values.firstname,
      lastname: values.lastname,
      phone: parsePhoneNumber(values.phone, "US").number,
      auth: values.auth,
    };

    try {
      await API.updateUser(selectedMember._id, formattedValues);

      toast.success("User information updated", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      //Calling the user api after updation
      const users = await API.getUsers();
      setmembers(users);
      setselectedMember(selectedMember);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Col xl="12" className="mt-3">
        <Header />
        {/* Page content */}
        <Container className="mt-4">
          <AdminNavBar />
          <Row>
            <Col md="6" className="mb-9">
              <Card className="shadow">
                <CardHeader className="mb-2">Organization</CardHeader>
                <ListGroup className="m-4">
                  {members.map((dev, key) => {
                    return (
                      <ListGroupItem
                        className="listItem"
                        as="li"
                        key={key}
                        id={dev._id}
                        onClick={() => {
                          setselectedMember(dev);
                        }}
                        active={dev._id === selectedMember._id}
                      >
                        {dev.firstname} {dev.lastname}
                      </ListGroupItem>
                    );
                  })}
                </ListGroup>
              </Card>
            </Col>
            <Col md="6">
              <Card className="shadow">
                <CardHeader className="mb-2">Edit User Information</CardHeader>
                {selectedMember._id ? (
                  <div>
                    <Row className="m-4 ">
                      <Col md="12">
                        <h2 className="text-primary">
                          {selectedMember.firstname} {selectedMember.lastname}
                        </h2>
                      </Col>
                    </Row>

                    <Row className="m-4 ">
                      <Col md="12" className="mb-0">
                        <Form>
                          <Row>
                            <Col md="6" className="m-0">
                              <FormGroup>
                                <Label for="firstname" className="text-muted">
                                  First Name
                                </Label>
                                <Input
                                  type="text"
                                  name="firstname"
                                  id="firstname"
                                  value={values.firstname}
                                  onChange={handleChange}
                                />
                              </FormGroup>
                            </Col>
                            <Col md="6" className="m-0">
                              <FormGroup>
                                <Label for="lastname" className="text-muted">
                                  Last Name
                                </Label>
                                <Input
                                  type="text"
                                  name="lastname"
                                  id="lastname"
                                  value={values.lastname}
                                  onChange={handleChange}
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row>
                            <Col md="6">
                              <FormGroup>
                                <Label for="phone" className="text-muted">
                                  Phone
                                </Label>
                                <Input
                                  type="phone"
                                  name="phone"
                                  id="phone"
                                  value={asYouType.input(
                                    parseDigits(values.phone).substr(0, 11)
                                  )}
                                  onChange={handleChange}
                                />
                              </FormGroup>
                            </Col>
                            <Col md="6">
                              <FormGroup>
                                <Label for="auth" className="text-muted">
                                  Authorization Level
                                </Label>
                                <Input
                                  type="select"
                                  name="auth"
                                  id="auth"
                                  value={values.auth}
                                  onChange={handleChange}
                                >
                                  <option value="admin">Admin</option>
                                  <option value="project manager">
                                    Project Manager
                                  </option>
                                  <option value="developer">Developer</option>
                                </Input>
                              </FormGroup>
                            </Col>
                          </Row>

                          <FormGroup>
                            <Label for="email" className="text-muted">
                              Email
                            </Label>
                            <Input
                              type="text"
                              name="email"
                              id="email"
                              value={values.email}
                              onChange={handleChange}
                              disabled
                            />
                          </FormGroup>
                          <Row>
                            <Col md="6">
                              <Button
                                color="success"
                                type="submit"
                                onClick={handleSubmit}
                              >
                                Submit
                              </Button>
                            </Col>
                            <Col md="6" className="text-right">
                              <Button
                                color="danger"
                                type="button"
                                onClick={removeMember}
                              >
                                Remove User
                              </Button>
                            </Col>
                          </Row>
                        </Form>
                      </Col>
                    </Row>
                  </div>
                ) : (
                  <div>
                    <Row className="m-4 ">
                      <h4>No Member Selected</h4>
                    </Row>
                  </div>
                )}
              </Card>
            </Col>
          </Row>
          <ToastContainer />
        </Container>
      </Col>
    </>
  );
};

export default Administration;
