//Created by Bhavin Bhatia

export default async function validate(values) {
  let errors = {};

  //Email validation
  if (values.hasOwnProperty("email")) {
    if (!values.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "Email is invalid";
    }
  }
  //password validation
  if (values.hasOwnProperty("password")) {
    if (!values.password) {
      errors.password = "Password is required";
    }
  }

  return errors;
}
