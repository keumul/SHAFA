import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {  
  constructor(private authService:  AuthService, 
              private router: Router) {}
  logout(){
  this.authService.logout()
  this.router.navigate(['login'])
}

  chat(){
    this.router.navigate(['chat'])
  }
}
