import { Component } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../data-models/user-type';

@Component({
  selector: 'app-signup',
  imports: [FormsModule, NgIf],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  newUser: User = {
    username: '',
    email: '',
    password: '',
    updated_at: '',
    created_at: ''
  };

  constructor(private router: Router, private authService: AuthService){}

  error: String = '';

  submitForm(form: any) {
    if(form.valid){
      this.authService.addUser(this.newUser).subscribe(
        (response) => {
          this.goToRoot();
        },
        (eS) => {
          this.error = 'Sign Up failed. Please check with admin';
        }
      );
    }
  }

  goToRoot(){
    this.router.navigate(['']);
  }
}
