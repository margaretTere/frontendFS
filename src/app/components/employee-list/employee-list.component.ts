import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../data-models/employee-type';
import { Router } from '@angular/router';
import { NgFor } from '@angular/common';


@Component({
  selector: 'app-employee-list',
  imports: [NgFor],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent implements OnInit {
  error: String = '';
  employees: Employee[] = [];

  constructor(private employeeService: EmployeeService, private router: Router) {}

  ngOnInit() {
    this.getEmployees();
  }

  getEmployees() {
    this.employeeService.getEmployees().subscribe({
      next: (employees: Employee[]) => {
        this.employees = employees;
      },
      error: (err) => {
        this.error = 'Error fetching employees:';
      }
  });
  }

  addEmployee(): void {
    this.router.navigate(['/employee-details', 'nil', 'add']);
  }

  deleteEmployee(id: String): void {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(id).subscribe({
        next: () => {
          this.getEmployees();
        },
        error: (err) => {
          this.error = 'Error deleting employee:';
        }
      });
    }
  }

  viewDetails(id: String): void {
    this.router.navigate(['/employee-details', id, 'view']);
  }
  
  updateEmployee(id: String): void {
    this.router.navigate(['/employee-details', id, 'edit']);
  }
}
