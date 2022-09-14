import { Link } from 'react-router-dom';
import React, {  useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthenticationService from '../services/authentication-service';

function Login() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: { value: '' },
    password: { value: '' },
  });

 

  const [message, setMessage] = useState('You are currently disconnected - Please login.');
  const [backendMessage, setbackendMessage] = useState({
    value: '',
    valid: false
  }
)

  const handleInputChange = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    const newField = { [fieldName]: { value: fieldValue } };

    setForm({ ...form, ...newField});
  }

  const validateForm = () => {
    let newForm= form;

    // Validator username
    if(form.username.value.length < 3) {
      const errorMsg= 'Votre prénom doit faire au moins 3 caractères de long.';
      const newField = { value: form.username.value, error: errorMsg, isValid: false };
      newForm = { ...newForm, ...{ username: newField } };
    } else {
      const newField = { value: form.username.value, error: '', isValid: true };
      newForm = { ...newForm, ...{ username: newField } };
    }

    // Validator password
    if(form.password.value.length < 6) {
      const errorMsg = 'Votre mot de passe doit faire au moins 6 caractères de long.';
      const newField = {value: form.password.value, error: errorMsg, isValid: false};
      newForm = { ...newForm, ...{ password: newField } };
    } else {
      const newField = { value: form.password.value, error: '', isValid: true };
      newForm = { ...newForm, ...{ password: newField } };
    }

    setForm(newForm);

    return newForm.username.isValid && newForm.password.isValid;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const isFormValid = validateForm();
    if(isFormValid) {
       AuthenticationService.fetchToken(form.username.value, form.password.value).then(response => {
        if (typeof response === 'undefined') {
          setMessage('👎Unable to connect ');
            let newField ={
              value: "The username may not exist or you have entered a wrong password. Please try again.",
              valid: true
            }
            setbackendMessage({...backendMessage, ...newField})
        } else {
          setMessage('👉 Connecting ...');
          navigate('/pokemons')
        }
      
      })
    }
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div className="row">
        <div className="col s12 m8 offset-m2">
          <div className="card hoverable">
            <div className="card-stacked">
              <div className="card-content">
                {/* Form message */}
                {message && <div className="form-group">
                  <div className="card-panel grey lighten-5">
                    {message}
                  </div>
                </div>}
                {/* Field username */}
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input id="username" type="text" name="username" className="form-control" value={form.username.value} onChange={e => handleInputChange(e)}></input>
                  {backendMessage.valid &&
                    <div style={{color:"red"}}>
                    {backendMessage.value}
                    </div>
                  }
                  {/* error */}
                  {form.username.error &&
                  <div className="card-panel red accent-1"> 
                   {form.username.error} 
                  </div>} 
                </div>
                {/* Field password */}
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input id="password" type="password" name="password" className="form-control" value={form.password.value} onChange={e => handleInputChange(e)}></input>
                  {/* error */}
                  {form.password.error &&
                  <div className="card-panel red accent-1"> 
                   {form.password.error} 
                  </div>} 
                </div>
                Don't have an account?
                <Link to="/register" >
                 Sign up now! 
                </Link>
              </div>
              <div className="card-action center">
                {/* Submit button */}
                <button type="submit" className="btn">LOGIN</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
 
export default Login;