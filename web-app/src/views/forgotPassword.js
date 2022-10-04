////Created by Bhavin Bhatia
import React from "react";
import useForm from "../components/Forms/useForm";
import validate from "../utils/formValidation/loginValidation";
import API from "../utils/API";

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
  Col,
} from "reactstrap";

//Setting intial values for forgot password
const ForgotPassword = (props) => {
  const initialLoginValues = {
    email: "",
    password: "",
    confirmpassword: "",
  };

  const { handleChange, handleSubmit, values, errors } = useForm(
    submit,
    initialLoginValues,
    validate
  );

  //Calling reset password api on submit click
  async function submit() {
    const paramsString = props.location.search;
    let searchParams = new URLSearchParams(paramsString);

    const token = searchParams.get("token");
    const id = searchParams.get("id");

    const res = await API.resetPassword(id, token, values.password);
    alert("Reset password successfull");
    props.history.push("/login");
  }
  return (
    <>
      <Col lg="6" md="8">
        <Card className="bg-secondary shadow border-2">
          <CardHeader className="bg-transparent">
            <div className="text-muted text-center mt-2 mb-2">
              <h2 className="text-muted text-center mt-2 mb-2">
                Reset Password
              </h2>
            </div>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            <Form role="form" onSubmit={handleSubmit}>
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
                  Submit
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default ForgotPassword;
