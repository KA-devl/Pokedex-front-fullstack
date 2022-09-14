import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../services/user-service";

function RegisterForm() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: { value: "" },
    password: { value: "" },
  });

  const [message, setMessage] = useState(
    "Welcome to the POKEDEX collection app : create a new account to gain access."
  );
  const [backendMessage, setbackendMessage] = useState({
    value: '',
    valid: false,
  });

  const handleInputChange = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    const newField = { [fieldName]: { value: fieldValue } };

    setForm({ ...form, ...newField });
  };

  const validateForm = () => {
    let newForm = form;
    let PasswordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

    // Validator username
    if (form.username.value.length < 6) {
      const errorMsg =
        "The username must have at least 6 letters, have at least one letter and and cannot have any special characters.";
      const newField = {
        value: form.username.value,
        error: errorMsg,
        isValid: false,
      };
      newForm = { ...newForm, ...{ username: newField } };
    } else {
      const newField = { value: form.username.value, error: "", isValid: true };
      newForm = { ...newForm, ...{ username: newField } };
    }

    // Validator password
    if (form.password.value.length < 6) {
      const errorMsg = "The password must have a minimum length of 6";
      const newField = {
        value: form.password.value,
        error: errorMsg,
        isValid: false,
      };
      newForm = { ...newForm, ...{ password: newField } };
    } else if (PasswordRegex.test(form.password.value) == false) {
      const errorMsg =
        "The password must fit the right format: 1- a minimum length of 6 2- must have at least one letter and one number ";
      const newField = {
        value: form.password.value,
        error: errorMsg,
        isValid: false,
      };
      newForm = { ...newForm, ...{ password: newField } };
    } else {
      const newField = { value: form.password.value, error: "", isValid: true };
      newForm = { ...newForm, ...{ password: newField } };
    }

    setForm(newForm);

    return newForm.username.isValid && newForm.password.isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isFormValid = validateForm();
    if (isFormValid) {
      const user = {
        username: form.username.value,
        password: form.password.value,
      };
      UserService.createUser(user).then((response) => {
        if (response.ok) {
          setMessage("👉 Redirecting to login page ...");
          navigate("/register");
        }else {
          const newField = {
            value:
              "The username or password is not correct. Please follow the right format in order to create a new account.",
            valid: true,
          }
          setbackendMessage({ ...backendMessage, ...newField });
          console.log(backendMessage.value)
        }
      });
    }
  };
  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div className="row">
        <div className="col s12 m8 offset-m2">
          <div className="card hoverable">
            <div className="card-stacked">
              <div className="card-content">
                {/* Form message */}
                {message && (
                  <div className="form-group">
                    <div className="card-panel grey lighten-5">{message}</div>
                  </div>
                )}
                {/* Field username */}
                <div className="form-group">
                  <label htmlFor="username">Create a username</label>
                  <input
                    id="username"
                    type="text"
                    name="username"
                    className="form-control"
                    value={form.username.value}
                    onChange={(e) => handleInputChange(e)}
                  ></input>
                  {/* error */}
                  {form.username.error && (
                    <div className="card-panel red accent-1">
                      {form.username.error}
                    </div>
                  )}
                </div>
                {/* Field password */}
                <div className="form-group">
                  <label htmlFor="password">Create a password</label>
                  <input
                    id="password"
                    type="password"
                    name="password"
                    className="form-control"
                    value={form.password.value}
                    onChange={(e) => handleInputChange(e)}
                  ></input>
                  {/* error */}
                  {form.password.error && (
                    <div className="card-panel red accent-1">
                      {form.password.error}
                    </div>
                  )}
                </div>
                {backendMessage.valid && (
                  <div style={{color:"red"}}>
                    {backendMessage.value}
                  </div>
                )}
              </div>
              <div className="card-action center">
                {/* Submit button */}
                <button type="submit" className="btn">
                  CREATE ACCOUNT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default RegisterForm;
