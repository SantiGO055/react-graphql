import { gql  } from '@apollo/client'


export const ALL_BOOKS = gql`
query AllBooks( $genre: String, $author: String){
    allBooks(genre: $genre, author: $author) {
      id
        title
        author
        genres
        published
  }
}
`
export const ALL_AUTHORS = gql`
  query allAuthors{
    allAuthors {
      name
      born
      bookCount
    }
  }
`
export const ADD_BOOKS = gql`
  mutation AddBooks($title: String!, $author: String!, $published: Int!, $genres: [String]) {
    addBook(title: $title, author: $author, published: $published, genres: $genres) {
      title
      author
    }
  }
`
export const EDIT_BORN = gql`
  mutation editAuthor($name: String!, $bornTo: Int!) {
    editAuthor(name: $name, setBornTo: $bornTo) {
      name
      born
      bookCount
    }
  }
`
