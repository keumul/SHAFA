import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
interface User {
  id: number;
  userName: string;
  email: string;
  roleId: number;
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users: User[] = [];
  selectedUserId: number = 0;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers()
      .subscribe(
        response => {
          this.users = Object.values(response.user);
          console.log(this.users);
        },
        error => {
          console.error(error);
          // Handle error
        }
      );
  }

  // getUserRole(id: number): void {
  //   this.userService.getUserRole(id)
  //     .subscribe(
  //       response => {
  //         this.userRole = response.role;
  //       },
  //       error => {
  //         console.error(error);
  //         // Handle error
  //       }
  //     );
  // }

  deleteUser(id: number): void {
    this.userService.deleteUser(id)
      .subscribe(
        response => {
          this.getUsers(); 
        },
        error => {
          console.error(error);
          // Handle error
        }
      );
  }
}
