import { gql  } from '@apollo/client'


export const ALL_BOOKS = gql`
query AllBooks( $genre: String, $author: String){
    allBooks(genre: $genre, author: $author) {
        title
        author
        genres
  }
}
`