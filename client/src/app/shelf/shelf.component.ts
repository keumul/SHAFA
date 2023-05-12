import { Component } from '@angular/core';
import { ShelfService } from '../services/shelf.service';

@Component({
  selector: 'app-shelf',
  templateUrl: './shelf.component.html',
  styleUrls: ['./shelf.component.css']
})
export class ShelfComponent {
  shelves: any[] = [];

  newId: string = '';
  newShelfName: string = '';
  newShelfUserId: string = '';
  newShelfCategoryId: string = '';

  constructor(private shelfService: ShelfService) {}

  ngOnInit() {
    this.getAllShelves();
  }

  getAllShelves() {
    this.shelfService.getAllShelves().subscribe(
      (response: any) => {
        this.shelves = response;
      },
      (error: any) => {
        console.error(error);
      }
    );    
  }

  createShelf() {
    this.shelfService.createShelf(this.newShelfName, this.newShelfUserId, this.newShelfCategoryId).subscribe(
      (response: any) => {
        console.log('Shelf created successfully!', response);
        this.getAllShelves();
        this.resetInputFields();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  updateShelf() {
    this.shelfService.updateShelf(this.newId, this.newShelfName, this.newShelfUserId, this.newShelfCategoryId).subscribe(
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
    this.shelfService.deleteShelf(this.newId).subscribe(
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
    this.shelfService.sharedAccess(this.newId, this.newShelfUserId).subscribe(
      (response: any) => {
        console.log('Shared access created successfully!', response);
        this.getAllShelves();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  private resetInputFields() {
    this.newShelfName = '';
    this.newShelfUserId = '';
    this.newShelfCategoryId = '';
  }
}
