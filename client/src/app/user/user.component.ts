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

  constructor(private userService: UserService, 
    private shafaService: ShafaService) { }

  ngOnInit(): void {
    this.getUsers();
  this.getAllStuffs();
  }

  getAllStuffs(): void {
    this.shafaService.getAllStuffs()
      .subscribe(
        (response) => {
          this.stuffs = response.stuffs;
        },
        (error) => {
          console.error(error);
          // Handle error
        }
      );
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
  hasMinimumStuff(user: User): boolean {
    const minStuffCount = 5; // Минимальное количество стафа
    const userStuffCount = this.stuffs.filter(stuff => stuff.user.id === user.id).length;
    return userStuffCount < minStuffCount;
  }
  

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
