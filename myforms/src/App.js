import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function App() {

  const [formValues, setFormValues] = useState({email:"", password:"", favClass:"1"});

  const [validationStates, setValidationStates] = useState({emailState:false,passwordState:false});

  let prevState;


  const handleEmailChange = (e) => {
    setFormValues({...formValues, email: e.target.value})
  };

  const handlePasswordChange = (e) => {
    setFormValues({...formValues, password: e.target.value})
    if (formValues.password.length>8)
    {
      setValidationStates({...validationStates, passwordState:true});
    } else
    {
      setValidationStates({...validationStates,passwordState:false})
    }
  };

  const handleSelectChange = (e) => {
    setFormValues({...formValues, favClass: e.target.value})
  };

  const validateEmail = () => {
    //Segun documentación que encontre en internet, el regex que se muestra aqui cumple requisitos de RFC
    if (formValues.email.match(/(?:[a-z0-9+!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i))
    {
      setValidationStates({...validationStates, emailState:true});
      if (validationStates.emailState){
        displayAlert()
      }
    } else {
      setValidationStates({...validationStates, emailState:false});
    };
  };

  useEffect(()=>{
    displayAlert();
  },[validationStates.emailState, validationStates.passwordState]
  );

  const displayAlert = () =>{
    if (validationStates.emailState && validationStates.passwordState){
      setTimeout(()=>{
        alert(JSON.stringify(formValues))
      },100)
    }
  };


const clickSubmit = () =>{
  validateEmail()
};


  return (
    <div>
      <h1>¡Ejemplo de formularios!</h1>

      <Form>
        <Form.Group className='mb-6' controlId = 'formBasicEmail'>
          <Form.Label>Email address</Form.Label>
          <Form.Control required type='email' placeholder='Enter email' onChange={handleEmailChange} value={formValues.email}
          isInvalid={!validationStates.emailState}/>
          { !validationStates.emailState &&<Form.Text className = 'text-muted'>We'll never share your email with anyone else!!!</Form.Text>}
        </Form.Group>

        <Form.Group className='mb-3' controlId='formBasicPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control required type='password' placeholder='Password' onChange={handlePasswordChange} value={formValues.password}
          isInvalid={!validationStates.passwordState}/>
          { !validationStates.passwordState && <Form.Text className="text-muted"> Your password should have numbers and special characters</Form.Text>}
        </Form.Group>

        <Form.Group className='mb-3' controlId='FormBasicCheckbox'>
          <Form.Label>Favorite Class</Form.Label>
          <Form.Select onChange={handleSelectChange}>
            <option value="1">ISIS3710</option>
            <option value ='2'>Programación con tecnolosigas web</option>
          </Form.Select>
        </Form.Group>
        <Button variant='primary' onClick={clickSubmit}>
          Submit 
        </Button>
      </Form>
    </div>
  );
}

export default App;
