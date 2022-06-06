import { useState } from 'react'
import { ALL_AUTHORS, ALL_BOOKS } from '../queries'
import Authors from './Authors'
import Books from './Books'
import NewBook from './NewBook'
import { gql, useQuery } from '@apollo/client';
import { AlertaError } from './Alerts';


const App = () => {
  const resultBooks = useQuery(ALL_BOOKS);
  const resultAuthors = useQuery(ALL_AUTHORS);
  const [page, setPage] = useState('authors')
  const [errorMessage, setErrorMessage] = useState(null)


  if(resultBooks.loading){
    return <div>Loading ...</div>
  }
  if(resultAuthors.loading){
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
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Authors setError={notify} authors={resultAuthors.data.allAuthors} show={page === 'authors'} />

      <Books books={resultBooks.data.allBooks} show={page === 'books'} />

      <NewBook  show={page === 'add'} />
    </div>
  )
}

export default App
