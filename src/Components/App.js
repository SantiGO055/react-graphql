
import './App.css';
import React, { useState } from 'react'
import { gql, useQuery } from '@apollo/client';
import {Persons} from './Persons';
import PersonForm from './PersonForm';
import {ALL_PERSONS} from '../services/queries';
import { AlertaError } from './Alerts';
import PhoneForm from './PhoneForm';

function App() {
  const result = useQuery(ALL_PERSONS);
  const [errorMessage, setErrorMessage] = useState(null)

  if(result.loading){
    return <div>Loading ...</div>
  }
  const notify = (message) => {
    setErrorMessage(message)
    console.log(message)
    AlertaError(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }
  return (
    <div className="App">
      {/* <Notify errorMessage={errorMessage}></Notify> */}
      <Persons persons = {result.data.allPersons}></Persons>
      <PersonForm setError={notify}></PersonForm>
      <PhoneForm></PhoneForm>
    </div>
  );
}
const Notify = ({errorMessage}) => {
  if ( !errorMessage ) {
    return null
  }
  return (
    <div style={{color: 'red'}}>
    {errorMessage}
    </div>
  )
}

export default App;
