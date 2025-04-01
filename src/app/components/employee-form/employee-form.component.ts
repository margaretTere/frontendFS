import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Employee } from '../../data-models/employee-type';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-form',
  imports: [FormsModule, NgIf, RouterLink],
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {
  error: String = '';
  startDate: Date = new Date();
  endDate: Date = new Date();
  minDate: String = '';
  maxDate: String = '';

  employee: Employee = {
    _id: '',
    // eid: '',
    first_name: '',
    last_name: '',
    email: '',
    gender: '',
    designation: '',
    salary: 0,
    date_of_joining: '',
    department: '',
    employee_photo: '',
    created_at: '',
    updated_at: ''
  };
  operation: 'add' | 'edit' | 'view' = 'add';
  isSubmitting = false;

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService, 
    private router: Router
  ) {

    this.startDate.setDate(this.endDate.getDate() - 10)
  
    this.maxDate = this.formatDate(this.endDate);
    this.minDate = this.formatDate(this.startDate);
  }

  ngOnInit(): void {
    const employeeId = this.route.snapshot.paramMap.get('id');
    this.operation = this.route.snapshot.paramMap.get('op') as 'add' | 'edit' | 'view';
    console.log(this.operation);
    if (employeeId && this.operation !== 'add') {
      this.fetchEmployee(employeeId);
    }
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);  // Ensure two digits
    const day = ('0' + date.getDate()).slice(-2);  // Ensure two digits
    return `${year}-${month}-${day}`;
  }

  formatJSDate(timestamp: number): string {
    const date = new Date(timestamp);
    
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    
    return `${year}-${month}-${day}`; 
  }

  fetchEmployee(id: string): void {
    this.employeeService.getEmployeeById(id).subscribe(
      (data) => {
        this.employee = {...data};
        this.employee.date_of_joining = this.formatJSDate(+data.date_of_joining);
      },
      (error) => {
        this.error = 'Error fetching employee';
      }
    );
  }

  onSubmit(form: any): void {
    if (form.valid && this.operation !== 'view') {
      this.isSubmitting = true;
      if (this.operation === 'add') {
        this.employeeService.addEmployee(this.employee).subscribe(
          (response) => {
            this.router.navigate(['/employees']);
          },
          (err) => {
            this.error = 'Error adding employee';
            this.isSubmitting = false;
          }
        );
      } else if (this.operation === 'edit') {
        this.employeeService.updateEmployee(this.employee).subscribe(
          (response) => {
            this.router.navigate(['/employees']);
          },
          (err) => {
            console.log(err);
            this.error = 'Error updating employee';
            this.isSubmitting = false;
          }
        );

        this.router.navigate(['/employees']);
      }
    }
  }
}
