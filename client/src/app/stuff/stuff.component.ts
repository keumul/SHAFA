import { Component, OnInit } from '@angular/core';
import { StuffService } from '../services/stuff.service';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { ShelfService } from '../services/shelf.service';
import { LabelService } from '../services/label.service';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

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
interface Label {
  id: number;
  description: string;
  texture: string;
  color: string;
  size: string;
  price: number;
  brand: string;
}
interface Shelf{
  id: number
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
              private authService: AuthService,
              private shelfService: ShelfService,
              private labelService:LabelService,
              private router: Router) {}
  ngOnInit() {
    this.currentUserId = this.authService.getCurrentUserId()  
         
    this.getAllStuffs();
    this.loadShelves()
    //this.getAllLabels();
    console.log(this.currentUserId);
    // this.getAllUsers();
  }


  currentUserId!: number;
  getAllStuffs() {
    this.stuffService.getAllStuffs(this.currentUserId).subscribe(
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

  loadShelves() {
    this.shelfService.getAllShelves(this.currentUserId).subscribe((
      data: Shelf[]) => {
      this.shelves = data
      console.log(this.shelves);
    });
  }

    createStuff() {
      this.stuffService.createStuff({name: this.stuffName, 
                                    labelId: this.labelId,
                                    userId: this.currentUserId,
                                    shelfId: this.shelfId,
                                    isAvailable: true}).subscribe(
        (response: any) => {
          console.log('Stuff created successfully!', response);
          this.ngOnInit();
        },
        (error) => {
          console.error(error);
        }
      );
    }

    updateStuff() {
      this.stuffService.updateStuff(this.stuffId, {name: this.stuffName, 
                                                  labelId: this.labelId,
                                                  userId: this.currentUserId,
                                                  shelfId: this.shelfId,
                                                  isAvailable: true}).subscribe(
        (response: any) => {
          console.log('Shelf updated successfully!', response);
          this.ngOnInit();
          this.getAllStuffs();
        },
        (error) => {
          console.error(error);
        }
      );
    }

  deleteStuff() {
    this.stuffService.deleteStuff(this.stuffId).subscribe(
      (response: { message: string }) => {
        console.log('Stuff deleted successfully!', response.message);
        this.getAllStuffs();
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
  
  logout(){
    this.authService.logout()
    this.router.navigate(['login'])
  }

setStuffId(stuff: Stuff){
    this.selectedStuff = stuff;
    this.stuffId = this.selectedStuff?.id ?? 0;
    this.labelId = this.selectedStuff?.id ?? 0;
    this.stuffName = this.selectedStuff?.name ?? "";
    this.userId = this.selectedStuff?.user?.id ?? 0;
    this.shelfId = this.selectedStuff?.shelf?.id ?? 0;
    console.log(this.selectedStuff);
}
getAllLabels() {
  this.labelService.getAllLabels().subscribe(
    (data: { labels: Label[] }) => {
      this.labels = data.labels;
      console.log(this.labels);
    },
    (error: any) => {
      console.error(error);
    }
  );
}

createLabel() {
  const newLabel: Label = {
    id: 0,
    description: 'Example Description',
    texture: 'Example Texture',
    color: 'Example Color',
    size: 'Example Size',
    price: 0,
    brand: 'Example Brand',
    name: ''
  };

  this.labelService.createLabel(newLabel).subscribe(
    (response: { label: Label }) => {
      console.log('Label created successfully!', response.label);
      this.getAllLabels();
    },
    (error: any) => {
      console.error(error);
    }
  );
}

updateLabel(label: Label) {
  const updatedLabel: Label = {
    id: label.id,
    description: 'Updated Description',
    texture: 'Updated Texture',
    color: 'Updated Color',
    size: 'Updated Size',
    price: label.price,
    brand: 'Updated Brand',
    name: ''
  };

  this.labelService.updateLabel(updatedLabel.id, updatedLabel).subscribe(
    (response: { message: string }) => {
      console.log('Label updated successfully!', response.message);
      this.getAllLabels();
    },
    (error: any) => {
      console.error(error);
    }
  );
}

deleteLabel(label: Label) {
  this.labelService.deleteLabel(label.id).subscribe(
    (response: { message: string }) => {
      console.log('Label deleted successfully!', response.message);
      this.getAllLabels();
    },
    (error: any) => {
      console.error(error);
    }
  );
}
  shelves?:Shelf[]
  selectedShelvesId!: number;
  selectedStuff!: Stuff;
  shelvesForm = new FormControl();
  shelvesForm_upd = new FormControl();
  labelForm = new FormControl();
  newStuffName!: string;

  
  stuffId: number = this.selectedStuff?.id ?? 0;
  labelId: number = this.selectedStuff?.id ?? 0;
  stuffName: string = this.selectedStuff?.name ?? '';
  userId: number = this.selectedStuff?.user?.id ?? 0;
  shelfId: number = this.selectedStuff?.shelf?.id ?? 0;
}