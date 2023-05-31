import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { ShafaService } from '../services/shafa.service';

interface Stuff {
  id: number;
  name: string;
  labelId: number;
  user: User;
  shelf: Shelf;
  userId: User;
  shelfId: number;
  isAvailable: boolean;
}

interface Shelf {
  id: number;
  name: string;
  user: User;
}

interface User {
  id: number;
  userName: string;
  email: string;
  roleId: number;
  stuffs: Stuff[];
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users: User[] = [];
  selectedUserId: number = 0;
  stuffs: Stuff[] = [];
  minStuffCount: number = 0;
  constructor(private userService: UserService, 
    private shafaService: ShafaService) { }
    ngOnInit(): void {
      this.getUsers();
      this.getAllStuffs();
    }

    hasMinimumStuff(user: User, minCount: number): boolean {
      return user.stuffs.length === minCount;
    }
    
  
    getAllStuffs(): void {
      this.shafaService.getAllStuffs()
        .subscribe(
          (response) => {
            this.stuffs = response.stuffs;
            this.minStuffCount = this.calculateMinStuffCount();
          },
          (error) => {
            console.error(error);
            // Handle error
          }
        );
    }
    
    getUsers(): void {
      this.userService.getAllUsers()
        .subscribe(
          response => {
            this.users = response.user;
            this.minStuffCount = this.calculateMinStuffCount();
          },
          error => {
            console.error(error);
            // Handle error
          }
        );
    }
    calculateMinStuffCount(): number {
      return Math.min(...this.users.map(user => user.stuffs.length)); // Calculate minimum stuff count among users
    }
  deleteUser(id: number): void {
    this.userService.deleteUser(id)
      .subscribe(
        response => {
        this.getUsers();
        this.ngOnInit();
        },
        error => {
          console.error(error);
          // Handle error
        }
      );
  }
}
