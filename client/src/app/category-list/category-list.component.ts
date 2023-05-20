import { Component } from '@angular/core';

@Component({
    selector: 'app-category-list',
    templateUrl: './category-list.component.html',
    styleUrls: ['./category-list.component.css']
})

export class AppCategoryListComponent {
  selectedComponent: string;
   errorMessage: string = '';
  successMessage: string = '';


  constructor() {
    this.selectedComponent = 'shelf'; 
    this.selectedComponent = 'outfit';
    this.selectedComponent = 'stuff';
  }
  showShelf() {
    this.selectedComponent = 'shelf';
  }

  showOutfit() {
    this.selectedComponent = 'outfit';
  }

  showStuff() {
    this.selectedComponent = 'stuff';
  }
}

