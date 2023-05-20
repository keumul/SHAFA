import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent {
  constructor( private router: Router, private authService: AuthService) {}
  logout(){
    this.authService.logout();
    this.router.navigate(['login'])
  }
}
