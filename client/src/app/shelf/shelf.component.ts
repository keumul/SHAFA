import { Component, OnInit } from '@angular/core';
import { ShelfService } from '../services/shelf.service';
import { AuthService } from '../services/auth.service';
import { FormControl } from '@angular/forms';

interface Shelf {
  id: number;
  name: string;
  user: User;
  category: Category;
}

interface User {
  id: number;
  userName: string
}

interface Category {
  id: number;
  name: string;
}

interface SharedAccess {
  sharedAccess: any;
}

interface ShelfResponse {
  shelf: Shelf;
}

interface ErrorResponse {
  error: string;
}

interface SuccessResponse {
  message: string;
}

@Component({
  selector: 'app-shelf',
  templateUrl: './shelf.component.html',
  styleUrls: ['./shelf.component.css']
})
export class ShelfComponent implements OnInit{
  newId: number = 0;
  newShelfName: string = '';
  currentUserId: number = 0;
  shelvesForm = new FormControl();
  selectedCategoryId: number = 0;

  shelfId: number = this.selectedShelfId?.id ?? 0;
  shelfName: string = this.selectedShelfId?.name ?? '';
  userId: number = this.selectedShelfId?.user?.id ?? 0;
  catId: number = this.selectedShelfId?.category?.id ?? 0;
  

  constructor(private shelfService: ShelfService, private authService: AuthService) {}

  ngOnInit() {
    this.getCurrentUserId();
    console.log(this.currentUserId);
    this.getAllShelves();
    this.loadCategories();
  }
  loadCategories() {
    this.shelfService.getAllCategories().subscribe((data: Category[]) => {
      this.cat = data.map((category: any) => ({
        id: category.id,
        name: category.name
      }));
      console.log(this.cat);
    });
  }

  getAllShelves() {
    this.shelfService.getAllShelves().subscribe(
      (data: Shelf[]) =>{
        this.shelves = data;
        console.log(this.shelves);
        
      },
      (error: any) => {
        console.error(error);
      }
    );    
  }

  createShelf() {
    this.shelfService.createShelf(this.newShelfName, this.currentUserId, this.selectedCategoryId).subscribe(
      (response: any) => {
        console.log('Shelf created successfully!', response);
        this.getAllShelves();
        // this.resetInputFields();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  updateShelf() {

    this.shelfService.updateShelf(this.shelfId, this.shelfName, this.userId, this.catId).subscribe(
      (response: any) => {
        console.log('Shelf updated successfully!', response);
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
        console.log('Shelf deleted successfully!', response);
        this.getAllShelves();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  sharedAccess() {
    this.shelfService.sharedAccess(this.newId, this.currentUserId).subscribe(
      (response: any) => {
        console.log('Shared access created successfully!', response);
        this.getAllShelves();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  setShelveId(shelf: Shelf){
    this.selectedShelfId = shelf;
    this.shelfId = this.selectedShelfId?.id ?? 0;
    this.shelfName = this.selectedShelfId?.name ?? '';
    this.userId = this.selectedShelfId?.user?.id ?? 0;
    this.catId = this.selectedShelfId?.category?.id ?? 0;
    console.log(this.selectedShelfId);
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
  users?: User;
  selectedShelfId?: Shelf;
  shelves?: Shelf[]
  cat?: Category[]
}
