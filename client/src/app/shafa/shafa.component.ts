import { Component } from '@angular/core';
import { ShafaService } from '../services/shafa.service';
import { ToastrService } from 'ngx-toastr';

interface Stuff {
  id: number;
  name: string;
  labelId: number;
  user: User;
  shelf: Shelf;
  label?: Label;
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

interface Shelf {
  id: number;
  name: string;
  user: User;
  category: Category;
}

interface User {
  id: number;
  userName: string;
  email: string;
}

interface Category {
  id: number;
  name: string;
}

interface Outfit {
  id: number;
  name: string;
  stuffId: Stuff;
  userId: User;
}

@Component({
  selector: 'app-shafa',
  templateUrl: './shafa.component.html',
  styleUrls: ['./shafa.component.css']
})
export class ShafaComponent {
  outfits: Outfit[] = [];
  shelves: Shelf[] = [];
  stuffs: Stuff[] = [];
  users?: User[] = [];
  whatisopen: string = '';

  constructor(
    private shafaService: ShafaService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllShelves();
    this.getAllStuffs();
  }

  getOutfits(): void {
    
  }

  getAllShelves(): void {
    this.whatisopen = 'shelves';
    this.shafaService.getAllShelves()
      .subscribe(
        (response) => {
          this.shelves = response;
          
        },
        (error) => {
          this.toastr.error('An error occurred while retrieving shelves.', 'Error');
        }
      );
  }

  getAllStuffs(): void {
    this.whatisopen = 'stuffs';
    this.shafaService.getAllStuffs()
      .subscribe(
        (response) => {
          this.stuffs = response.stuffs;
          console.log(this.whatisopen, this.stuffs);
        },
        (error) => {
          this.toastr.error('An error occurred while retrieving stuffs.', 'Error');
        }
      );
  }
}
