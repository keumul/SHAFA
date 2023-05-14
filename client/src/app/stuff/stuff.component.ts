import { Component, OnInit } from '@angular/core';
import { StuffService } from '../services/stuff.service';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
interface Stuff {
  id: number;
  name: string;
  labelId: number;
  user: User;
  shelf: Shelf;
  label: Label;
  userId: number;
  shelfId: number;
  isAvailable: boolean;
}

interface Shelf{
  name: string
}

interface Label {
  id: number;
  name: string;
}

interface User {
  id: number;
  userName: string;
}

@Component({
  selector: 'app-stuff',
  templateUrl: './stuff.component.html',
  styleUrls: ['./stuff.component.css']
})
export class StuffComponent implements OnInit {
  stuffs: Stuff[] = [];
  labels: Label[] = [];
  users: User[] = [];

  constructor(private stuffService: StuffService,
              private userService: UserService,
              private authService: AuthService) {}

  ngOnInit() {
    this.getAllStuffs();
    // this.getCurrentUserId();
    //this.getAllLabels();
    // this.getAllUsers();
  }
  getCurrentUserId(){
    this.authService.getCurrentUserId().subscribe(
      (userId: number) => {
        this.currentUserId = userId;
        console.log(this.currentUserId)
      },
      (error: any) => {
        console.error(error);
      }
    );
  
  }

  currentUserId!: number;
  getAllStuffs() {
    this.stuffService.getAllStuffs().subscribe(
      (data: any) => {
        this.stuffs = data.stuffs;
        console.log(this.stuffs);
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  // getAllLabels() {
  //   this.stuffService.getAllLabels().subscribe(
  //     (data: Label[]) => {
  //       this.labels = data;
  //       console.log(this.labels);
  //     },
  //     (error: any) => {
  //       console.error(error);
  //     }
  //   );
  // }

  getAllUsers() {
    this.userService.getAllUsers().subscribe(
      (data: User[]) => {
        this.users = data;
        console.log(this.users);
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  // createStuff() {
  //   const newStuff: Stuff = {
  //     id: 0,
  //     name: 'Example Stuff',
  //     labelId: 1,
  //     userId: 1,
  //     shelfId: 1,
  //     isAvailable: true
  //   };

  //   this.stuffService.createStuff(newStuff).subscribe(
  //     (response: { stuff: Stuff }) => {
  //       console.log('Stuff created successfully!', response.stuff);
  //       this.getAllStuffs();
  //     },
  //     (error: any) => {
  //       console.error(error);
  //     }
  //   );
  // }

  // updateStuff(stuff: Stuff) {
  //   const updatedStuff: Stuff = {
  //     id: stuff.id,
  //     name: 'Updated Stuff',
  //     labelId: stuff.labelId,
  //     userId: stuff.userId,
  //     shelfId: stuff.shelfId,
  //     isAvailable: stuff.isAvailable
  //   };

  //   this.stuffService.updateStuff(updatedStuff.id, updatedStuff).subscribe(
  //     (response: { message: string }) => {
  //       console.log('Stuff updated successfully!', response.message);
  //       this.getAllStuffs();
  //     },
  //     (error: any) => {
  //       console.error(error);
  //     }
  //   );
  // }

  deleteStuff(stuff: Stuff) {
    this.stuffService.deleteStuff(stuff.id).subscribe(
      (response: { message: string }) => {
        console.log('Stuff deleted successfully!', response.message);
        this.getAllStuffs();
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
  setStuffId(stuffId: Stuff){}

}
