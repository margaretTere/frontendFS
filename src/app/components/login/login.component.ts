import { Component } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../data-models/user-type';

@Component({
  selector: 'app-login',
  imports: [FormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  error: String = '';
  userLogin: User = {
    username: '',
    email: '',
    password: '',
    created_at: '',
    updated_at: ''
  };

  constructor(private router: Router, private authService: AuthService){}

  submitForm(form: any) {
    if(form.valid){
      this.authService.login(this.userLogin).subscribe(
        (response) => {
          this.goToEmployeeList();
        },
        (e) => {
          this.error = 'Login failed, please check your credentials';
        }
      );
    }
  }

  goToEmployeeList(){
      this.router.navigate(['employees'])
  }

}
