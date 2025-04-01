import {gql} from 'apollo-angular'

export const DELETE_EMPLOYEE_BY_ID = gql`
    mutation deleteEmployeeByEid($id: String!) {
    deleteEmployeeByEid(eid: $id) {
      first_name
      last_name
      email
    }
  }
`;

export const ADD_EMPLOYEE = gql`
    mutation addEmployee(
        $first_name: String!,
        $last_name: String!,
        $email: String!,
        $gender: String!,
        $designation: String!,
        $department: String!,
        $salary: Float!,
        $date_of_joining: String!
    ) {
    addEmployee(
      first_name: $first_name
      last_name: $last_name
      email: $email
      gender: $gender
      designation: $designation
      department: $department
      salary: $salary
      date_of_joining: $date_of_joining
    ) {
      first_name
      last_name
      email
    }
  }
`;

export const UPDATE_EMPLOYEE = gql`
mutation updateEmployeeByEid(
        $eid: String!,
        $first_name: String!,
        $last_name: String!,
        $email: String!,
        $gender: String!,
        $designation: String!,
        $salary: Float!,
        $date_of_joining: String!
        $department: String!,
    ) {
    updateEmployeeByEid(
      eid: $eid,
      first_name: $first_name
      last_name: $last_name
      email: $email
      gender: $gender
      designation: $designation
      salary: $salary
      date_of_joining: $date_of_joining
      department: $department
    ) {
      first_name
      last_name
      email
      salary
      department
    }
  }
`;