////Created by Bhavin Bhatia
import React from "react";
import useForm from "../components/Forms/useForm";
import validate from "../utils/formValidation/loginValidation";

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
import API from "utils/API";

//Setting payload login values
const EmailForgotPassword = (props) => {
  const initialLoginValues = {
    email: "",
  };

  const { handleChange, handleSubmit, values, errors } = useForm(
    submit,
    initialLoginValues,
    validate
  );

  //Submit button send link api call
  async function submit() {
    try {
      const response = await API.sendLink(values);
      alert("Link has been sent to your registered email address");
    } catch (error) {
      alert("Email address does not exist in the system!!");
    }
  }
  return (
    <>
      <Col lg="6" md="8">
        <Card className="bg-secondary shadow border-2">
          <CardHeader className="bg-transparent">
            <div className="text-muted text-center mt-2 mb-2">
              <h2 className="text-muted text-center mt-2 mb-2">
                Email Verification
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
              <div className="text-center">
                <Button className="mt-4" color="primary" type="submit">
                  Send Link
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};
export default EmailForgotPassword;
