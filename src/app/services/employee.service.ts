import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable} from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Employee } from '../data-models/employee-type';
import { 
  GET_ALL_EMPLOYEES,
  SEARCH_EMPLOYEE_BY_ID,
  SEARCH_EMPLOYEE_BY_DESIGNATION_OR_DEPARTMENT
} from '../graphql/employee.queries';
import { 
  DELETE_EMPLOYEE_BY_ID,
  ADD_EMPLOYEE, 
  UPDATE_EMPLOYEE
} from '../graphql/employee.mutations';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  error: string = '';
 
  constructor(private apollo: Apollo) { }

  getEmployees(): Observable<Employee[]> {
    return this.apollo.watchQuery<{ getAllEmployees: Employee[] }>({
      query: GET_ALL_EMPLOYEES,
      fetchPolicy: 'no-cache'
    }).valueChanges.pipe(
      map((result) => result.data.getAllEmployees) 
    );
  }

  getEmployeeById(id: String): Observable<Employee> {
    return this.apollo.query<{ searchEmployeeByEid: Employee }>({
      query: SEARCH_EMPLOYEE_BY_ID,
      fetchPolicy: 'no-cache',
      variables: { id }
    }).pipe(
      map(result => result.data.searchEmployeeByEid)
    );
  }
  getEmployeesByDesignationOrDepartment(
    designation: String, 
    department: String): Observable<Employee[]> {
      let vars = {};
      if (designation && department)
        vars = {designation, department};
      else if (designation)
        vars = {designation};
      else if (department)
        vars = {department}

      return this.apollo.watchQuery<{ searchEmployeeByDesignationOrDepartment: Employee[] }>({
        query: SEARCH_EMPLOYEE_BY_DESIGNATION_OR_DEPARTMENT,
        fetchPolicy: 'no-cache',
        variables: vars
      }).valueChanges.pipe(
        map((result) => {
          return result.data.searchEmployeeByDesignationOrDepartment;
        }) 
      );
  }


  addEmployee(employee: Employee): Observable<any> {
    return this.apollo.mutate({
      mutation: ADD_EMPLOYEE,
      variables: employee,
      refetchQueries: [{ query: GET_ALL_EMPLOYEES }],
      fetchPolicy: 'no-cache'
    });
  }

  updateEmployee(employee: Employee): Observable<any> {
    return this.apollo.mutate({
      mutation: UPDATE_EMPLOYEE,
      variables: {
        eid: employee._id,
        first_name: employee.first_name,
        last_name: employee.last_name,
        email: employee.email,
        gender: employee.gender,
        designation: employee.designation,
        salary: employee.salary,
        date_of_joining: employee.date_of_joining,
        department: employee.department
      },
      refetchQueries: [{ query: GET_ALL_EMPLOYEES }],
      fetchPolicy: 'no-cache'
    });
  }

  deleteEmployee(id: String): Observable<any> {
    return this.apollo.mutate({
      mutation: DELETE_EMPLOYEE_BY_ID,
      variables: { id },
      refetchQueries: [{ query: GET_ALL_EMPLOYEES }]
    });
  }
}
