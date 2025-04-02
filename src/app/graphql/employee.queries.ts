import {gql} from 'apollo-angular'

export const GET_ALL_EMPLOYEES = gql`
query {
  getAllEmployees {
    _id
    first_name
    last_name
    email
  }
}`;

export const SEARCH_EMPLOYEE_BY_ID = gql`
query searchEmployeeByEid($id: String!) {
    searchEmployeeByEid(eid: $id) {
      _id
      first_name
      last_name
      email
      gender
      designation
      salary
      date_of_joining
      department
    }
  }
`;

export const SEARCH_EMPLOYEE_BY_DESIGNATION_OR_DEPARTMENT = gql`
query searchEmployeeByDesignationOrDepartment(
  $designation: String, 
  $department: String
  ) {
  searchEmployeeByDesignationOrDepartment(
    designation: $designation,
    department: $department
    ) {
    _id
    first_name
    last_name
    email
  }
}
`;