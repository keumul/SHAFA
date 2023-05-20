import { Component, OnInit } from '@angular/core';
import { ShelfService } from '../services/shelf.service';
import { AuthService } from '../services/auth.service';
import { FormControl } from '@angular/forms';
import { UserService } from '../services/user.service';
import { ToastrService } from 'ngx-toastr';

interface Shelf {
  id: number;
  name: string;
  user: User;
  category: Category;
  sharedUsers: User[];
  sharedAccess: boolean;
}

interface User {
  id: number;
  userName: string;
}

interface Category {
  id: number;
  name: string;
}


@Component({
  selector: 'app-shelf',
  templateUrl: './shelf.component.html',
  styleUrls: ['./shelf.component.css']
})
export class ShelfComponent implements OnInit{
  newId: number = 0;
  newShelfName: string = '';

  currentUserId!: number;
  accessUserId!: number;
  shelvesForm = new FormControl();
  usersForm = new FormControl();

  selectedCategoryId: number = 0;
  selectedUserId: number = 0;

  shelfId: number = this.selectedShelfId?.id ?? 0;
  shelfName: string = this.selectedShelfId?.name ?? '';
  userId: number = this.selectedShelfId?.user?.id ?? 0;
  catId: number = this.selectedShelfId?.category?.id ?? 0;
  

  constructor(private shelfService: ShelfService, 
              private authService:  AuthService, 
              private userService:  UserService,
              private toastr: ToastrService) {}

  ngOnInit() {
    this.currentUserId = this.authService.getCurrentUserId()?.id;       
    this.getAllShelves();
    this.loadCategories();
    this.loadUsers();
  }
  loadCategories() {
    this.shelfService.getAllCategories().subscribe((data: Category[]) => {
      this.cat = data.map((category: any) => ({
        id: category.id,
        name: category.name
      }));
    });
  }

  loadUsers() {
    this.userService.getAllUsers().subscribe((data: {user: User[]}) => {
      console.log(data); 
        this.users = data.user.map((user: any) => ({
          id: user.id,
          userName: user.userName
        })); 
        console.log(this.users);
      });
  }

  getAllShelves() {
    this.shelfService.getAllShelves(this.currentUserId).subscribe(
      (data: Shelf[]) => {
        this.shelves = data.map((shelf: Shelf) => ({
          ...shelf,
          // sharedAccess: shelf.sharedUsers.length > 0
        }));
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
  

  createShelf() {
    this.shelfService.createShelf(this.shelfName, this.currentUserId, this.selectedCategoryId).subscribe(
      (response: any) => {
        this.getAllShelves();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  updateShelf() {

    this.shelfService.updateShelf(this.shelfId, this.shelfName, this.userId, this.catId).subscribe(
      (response: any) => {
        this.getAllShelves();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  deleteShelf() {
    this.shelfService.deleteShelf(this.shelfId).subscribe(
      (response: any) => {
        this.getAllShelves();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  sharedAccess() {
    console.log(this.selectedUserId, this.selectedShelfId!.id);
    this.shelfService.sharedAccess(this.selectedUserId, this.selectedShelfId!.id).subscribe(
      (response) => {
        this.toastr.success('User added to shelf successfully', 'Success');
      },
      (error) => {
        this.toastr.error('Failed to add user to shelf:', error);
      }
    );
  }

  setShelveId(shelf: Shelf){
    this.selectedShelfId = shelf;
    this.shelfId = this.selectedShelfId?.id ?? 0;
    this.shelfName = this.selectedShelfId?.name ?? '';
    this.userId = this.selectedShelfId?.user?.id ?? 0;
    this.catId = this.selectedShelfId?.category?.id ?? 0;
  }
  users?: User[]
  selectedShelfId?: Shelf
  shelves?: Shelf[]
  cat?: Category[]
}
