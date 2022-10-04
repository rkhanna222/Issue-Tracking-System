//Created by Raghav Khanna

import React from "react";
import useForm from "../components/Forms/useForm";
import registerValidation from "../utils/formValidation/registerValidation";
import parsePhoneNumber from "libphonenumber-js";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
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
import API from "utils/API";

const Register = (props) => {
  const initialValues = {
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const { handleChange, handleSubmit, values, errors } = useForm(
    submit,
    initialValues,
    registerValidation
  );

  //Call add user api
  async function submit() {
    let dbPhone = parsePhoneNumber(values.phone, "US").number;
    values.phone = dbPhone;
    const response = await API.addUser({ ...values, auth: "developer" });

    console.log(response.message);

    if (response.message === "User already exists") {
      alert(response.message);
    } else {
      alert("Account Created Successfully!!");
      props.history.push("/login");
    }
  }

  return (
    <>
      <Col lg="6" md="8">
        <Card className="bg-secondary shadow border-2">
          <CardHeader className="bg-transparent">
            <div className="text-muted text-center mt-2 mb-2">
              <h2 className="text-muted text-center mt-2 mb-2">Sign up</h2>
            </div>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            <Form role="form" onSubmit={handleSubmit}>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <InputGroup className="input-group-alternative mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-hat-3" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        id="firstname"
                        placeholder="First Name"
                        name="firstname"
                        type="text"
                        value={values.firstname}
                        onChange={handleChange}
                      />
                    </InputGroup>
                    {errors.firstname && (
                      <div style={{ fontSize: 12, color: "red" }}>
                        {errors.firstname}
                      </div>
                    )}
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <InputGroup className="input-group-alternative mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-hat-3" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        id="lastname"
                        placeholder="Last Name"
                        name="lastname"
                        type="text"
                        value={values.lastname}
                        onChange={handleChange}
                      />
                    </InputGroup>
                    {errors.lastname && (
                      <div style={{ fontSize: 12, color: "red" }}>
                        {errors.lastname}
                      </div>
                    )}
                  </FormGroup>
                </Col>
              </Row>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-mobile-button" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    id="phone"
                    placeholder="Phone Number"
                    name="phone"
                    type="phone"
                    value={values.phone}
                    onChange={handleChange}
                  />
                </InputGroup>
                {errors.phone && (
                  <div style={{ fontSize: 12, color: "red" }}>
                    {errors.phone}
                  </div>
                )}
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    id="email"
                    placeholder="Email"
                    name="email"
                    type="email"
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
                    id="password"
                    name="password"
                    placeholder="Password"
                    type="password"
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
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    type="password"
                    value={values.confirmPassword}
                    onChange={handleChange}
                  />
                </InputGroup>
                {errors.confirmPassword && (
                  <div style={{ fontSize: 12, color: "red" }}>
                    {errors.confirmPassword}
                  </div>
                )}
              </FormGroup>
              <div className="text-center">
                <Button className="mt-4" color="primary" type="submit">
                  Create account
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default Register;
