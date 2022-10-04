//Created by Raghav Khanna

import React from "react";
import useForm from "../components/Forms/useForm";
import validate from "../utils/formValidation/loginValidation";
import API from "../utils/API";
import { Link } from "react-router-dom";

//components for reactstrap
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";

//code for handling login values
const Login = (props) => {
  const loginValues = {
    email: "",
    password: "",
  };

  const { handleChange, handleSubmit, values, errors } = useForm(
    submit,
    loginValues,
    validate
  );
  //code for handling submit button
  async function submit() {
    const response = await API.login(values);
    console.log(response.body);

    if (response.ok) {
      const { token, auth, firstName, lastName } = await response.json();
      localStorage.setItem("accessToken", token);
      localStorage.setItem("auth", auth);
      localStorage.setItem("firstName", firstName);
      localStorage.setItem("lastName", lastName);

      props.setAuthLevel(auth);
      props.setAuth(true);
      //code for handling invalid login status
      if (auth === "admin") {
        props.history.push("/admin");
      } else {
        props.history.push("/index");
      }

      values.email = "";
      values.password = "";
    } else {
      alert("Invalid login");
    }
  }

  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <Form role="form" onSubmit={handleSubmit}>
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Email"
                    name="email"
                    type="email"
                    autoComplete="new-email"
                    value={values.email}
                    onChange={handleChange}
                  />
                </InputGroup>
                {errors.email && (
                  <div style={{ fontSize: 12, color: "red" }}>
                    {errors.email}
                  </div>
                )}
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    value={values.password}
                    onChange={handleChange}
                  />
                </InputGroup>
                {errors.password && (
                  <div style={{ fontSize: 12, color: "red" }}>
                    {errors.password}
                  </div>
                )}
              </FormGroup>
              <div className="custom-control custom-control-alternative custom-checkbox">
                <input
                  className="custom-control-input"
                  id=" customCheckLogin"
                  type="checkbox"
                />
                <label
                  className="custom-control-label"
                  htmlFor=" customCheckLogin"
                >
                  <span className="text-muted">Remember me</span>
                </label>
              </div>
              <div className="text-center">
                <Button className="my-4" color="primary" type="submit">
                  Sign in
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
        <Row className="mt-3">
          {/* forgot password email link */}
          <Col className="text-light" xs="6">
            <Link to="/auth/EmailForgotPassword">
              <small>Forgot password?</small>
            </Link>
          </Col>

          <Col className="text-light" xs="6">
            <Link to="/auth/register">
              <small>Create new account</small>
            </Link>
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default Login;
