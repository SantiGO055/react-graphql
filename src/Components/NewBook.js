import React, { useState } from 'react'
import { ADD_BOOKS, ALL_BOOKS } from '../queries'
import { gql, useMutation } from '@apollo/client'
import { AlertaError, AlertaSuccess } from './Alerts';

const NewBook = ({show, setError}) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState(0)
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])
  
  const [ createBooks ] = useMutation(ADD_BOOKS, {
    refetchQueries: [ { query: ALL_BOOKS }],
    onError: (error) => {
      console.log(error.graphQLErrors[0])
        setError(error.graphQLErrors[0].message)
    }
  });

  if (!show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    if(published != 0){
      createBooks({  variables: { title, author, published, genres } }).then((a)=>{
        if(a.data){
          AlertaSuccess("Libro agregado correctamente!");
        }
      })
    }
    else{
      AlertaError("Debe ingresar año de publicación!")
    }

    console.log('add book...')

    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => {
              console.log(target.value)
              setPublished(target.value === "" ? 0 : parseInt( target.value))
          }
        }
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook
