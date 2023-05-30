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
  isDataLoaded: boolean = false

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
            this.isDataLoaded = true;
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
            this.isDataLoaded = true;
          },
          error => {
            console.error(error);
            // Handle error
          }
        );
    }
    // ngOnInit(): void {
    //   this.initializeData();
    // }
    
    // async initializeData() {
    //   await this.getUsers();
    //   console.log(this.users);
    //   this.getAllStuffs();
    // }
    
    // async getUsers(): Promise<void> {
    //   try {
    //     const response = await this.userService.getUsers().toPromise();
    //     this.users = Object.values(response.user);
    //     console.log(this.users);
    //     this.isDataLoaded = true;
    //   } catch (error) {
    //     console.error(error);
    //     // Handle error
    //   }
    // }
    
    // async getAllStuffs(): Promise<void> {
    //   try {
    //     const response = await this.shafaService.getAllStuffs().toPromise();
    //     this.stuffs = response.stuffs;
    //     this.isDataLoaded = true;
    //   } catch (error) {
    //     console.error(error);
    //     // Handle error
    //   }
    // }


    // getUsers(): Promise<void> {
    //   return new Promise<void>((resolve, reject) => {
    //     this.userService.getUsers()
    //       .subscribe(
    //         response => {
    //           this.users = Object.values(response.user);
    //           this.isDataLoaded = true; // Установка флага isDataLoaded в true
    //           resolve();
    //         },
    //         error => {
    //           console.error(error);
    //           reject(error);
    //         }
    //       );
    //   });
    // }
    
    // getAllStuffs(): void {
    //   this.shafaService.getAllStuffs()
    //     .subscribe(
    //       (response) => {
    //         this.stuffs = response.stuffs;
    //         this.isDataLoaded = true; // Установка флага isDataLoaded в true
    //       },
    //       (error) => {
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
        this.ngOnInit();
        },
        error => {
          console.error(error);
          // Handle error
        }
      );
  }
}
