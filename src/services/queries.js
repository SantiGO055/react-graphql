import { gql  } from '@apollo/client'

export const ALL_PERSONS = gql`
query {
  allPersons  {
    name
    phone
    id
  }
}
`
export const FIND_PERSON = gql`
query findPersonByName($nameToSearch: String!){
  findPerson(name: $nameToSearch) {
      name
      phone 
      id
      address {
        street
        city
      }
    }
}
`

export const CREATE_PERSON = gql`
mutation addPerson($name: String!, $phone: String, $street: String!, $city: String!){
  addPerson(
      name: $name,
      phone: $phone
      street: $street,
      city: $city
  ){
      name
      phone
      id
      address{
          street
          city
      }
  }
}
`