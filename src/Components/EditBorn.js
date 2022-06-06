import React, { useState } from 'react'
import { EDIT_BORN, ALL_AUTHORS } from '../queries'
import { gql, useMutation } from '@apollo/client'
import { AlertaError, AlertaSuccess } from './Alerts';

const EditBorn = ({show, setError}) => {
  const [name, setName] = useState('')
  const [bornTo, setBornTo] = useState('')
  
  const [ editAuthor ] = useMutation(EDIT_BORN, {
    refetchQueries: [ { query: ALL_AUTHORS }],
    onError: (error) => {
      console.log(error.graphQLErrors[0])
        setError(error.graphQLErrors[0].message)
    }
  });

 

  const submit = async (event) => {
    event.preventDefault()
    console.log(name, bornTo)
    editAuthor({  variables: { name, bornTo } }).then((a)=>{
        if(a.data.editAuthor){
          AlertaSuccess("Numero editado correctamente!");
        }
        else{
          AlertaError("Error!");

        }
      })

    console.log('edit number author...')

    setName('');
    setBornTo('');
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          name
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          born
          <input
            value={bornTo}
            onChange={({ target }) => setBornTo(target.value == "" ? 0 : parseInt(target.value))}
          />
        </div>
        <button type="submit">edit born</button>
      </form>
    </div>
  )
}

export default EditBorn
