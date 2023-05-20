import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  currentUserRole: any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  goToLogin(){
    this.router.navigate(['/register']);
  }
  chat(){
    this.router.navigate(['chat'])
  }
  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.authService.login(this.loginForm)
      .subscribe(
        (response) => {
          this.currentUserRole = this.authService.getCurrentUserId()?.roleId;

          if (this.currentUserRole === 2) {
            this.router.navigate(['/user-profile']);
            this.toastr.success('Logged in as user.', 'Success');
          } else if (this.currentUserRole === 1) {
            this.router.navigate(['/admin-panel']);
            this.toastr.success('Logged in as admin.', 'Success');
          }
        },
        (error) => {
          this.toastr.error('Invalid email or password.', 'Error');
          console.error(error);
        }
      );
  }
}
