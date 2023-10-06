import { gql } from '@apollo/client';

export const CREATE_EMPLOYEE = gql`
mutation createEmployee($input: CreateEmployeeInput!) {
    createEmployee(input: $input) {
    id
    dateEntry
    documentTypeId
    document
    name
    surname
    gender
    birthPlace
    birthDate 
    programmingLanguages{
      id
      name
    }
  }
}
`;

export const DELETE_EMPLOYEE = gql`
mutation deleteEmployee($id:ID!){
  deleteEmployee(id: $id){
    message
  }
}
`;

export const DOCUMENT_TYPES = gql`
query {
    documentTypes{
        id
        name
    }
    }
`;

export const GET_EMPLOYEE = gql`
query getEmployee($id:ID!){
    employee(id: $id){
    id
    dateEntry
    documentTypeId
    document
    name
    surname
    gender
    birthPlace
    birthDate
    created_at
    updated_at
    programmingLanguages{
      id
      name
      active
    }
    }
}`;

export const GET_EMPLOYEES = gql`
query getEmployees($name:String,$first:Int!,$page:Int!){
  employees(name: $name, first: $first, page: $page) {
    paginatorInfo {
      count
      currentPage
      firstItem
      hasMorePages
      lastItem
      lastPage
      perPage
      total
    }
    data {
      id
      dateEntry
      documentTypeId
      document
      name
      surname
      gender
      birthPlace
      birthDate
      created_at
      updated_at
      programmingLanguages{
      id
      name
      active
    }
    }
  }
}

`;

export const PROGRAMMING_LANGUAGES = gql`
query{
  programmingLanguages{
    id
    name
    active
  }
}
`;

export const UPDATE_EMPLOYEE = gql`
mutation updateEmployee($id:ID!,$input: UpdateEmployeeInput!) {
    updateEmployee(id: $id, input: $input){
    id
    dateEntry
    documentTypeId
    document
    name
    surname
    gender
    birthPlace
    birthDate
    created_at
    updated_at
    documentType{
      id
    }
    programmingLanguages{
      id
    }
  }
  }

`;

