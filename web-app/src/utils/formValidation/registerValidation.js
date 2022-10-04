//Created by Raghav Khanna

import API from "../API";
import { isValidPhoneNumber } from "libphonenumber-js";

export default async function registerValidation(values) {
  let errors = {};

  //Name validation
  if (values.hasOwnProperty("firstname") && !values.firstname) {
    errors.firstname = "First name is required";
  }

  if (values.hasOwnProperty("lastname") && !values.lastname) {
    errors.lastname = "Last name is required";
  }

  //phone validation
  if (values.hasOwnProperty("phone")) {
    if (!values.phone) {
      errors.phone = "Phone number is required";
    } else if (!isValidPhoneNumber(values.phone, "US")) {
      errors.phone = "Please enter valid phone number";
    }
  }

  //Email validation
  if (values.hasOwnProperty("email")) {
    if (!values.email) {
      errors.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "Email address is invalid";
    } else {
      try {
        const res = await API.getUserByEmail({ email: values.email });

        if (res.length > 0) {
          errors.email = "Email already exists";
        }
      } catch (err) {
        console.log(err, "Error looking up email in database");
      }
    }
  }

  // Password validation
  if (values.hasOwnProperty("password")) {
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 8) {
      errors.password = "Password needs to be 8 or more characters";
    }

    if (values.password !== values.confirmPassword) {
      errors.confirmPassword = "Passwords entered do not match";
    }
  }

  return errors;
}
