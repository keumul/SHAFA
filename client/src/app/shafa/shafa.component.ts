import { Component } from '@angular/core';
import { ShafaService } from '../services/shafa.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../services/user.service';
import { ShelfService } from '../services/shelf.service';

interface Stuff {
  id: number;
  name: string;
  labelId: number;
  user: User;
  shelf: Shelf;
  label?: Label;
  userId: User;
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

interface CategoryStats {
  category: Category;
  outfitCount: number;
  stuffCount: number;
  shelfCount: number;
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
  categoryStats: CategoryStats[] = [];
  categories: Category[] = [];
  
  constructor(
    private shafaService: ShafaService,
    private toastr: ToastrService,
    private userService: UserService,
    private shelfService: ShelfService
  ) {}

  ngOnInit(): void {
    this.getUsers();
    this.loadCategories();
    this.getAllShelves();
    //this.getAllStuffs();
  }

  getOutfits(): void {
    
  }

  getAllShelves() {
    this.shafaService.getAllShelves().subscribe(
      (data: Shelf[]) => {
        this.shelves = data.map((shelf: Shelf) => ({
          ...shelf,
        }));
        console.log(this.shelves);
        this.calculateCategoryStats();
      },
      (error: any) => {
        console.error(error);
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

  loadCategories(): void {
    this.shelfService.getAllCategories().subscribe(
      (data: Category[]) => {
        this.categories = data;
      },
      (error) => {
        console.error(error);
        // Обработка ошибки
      }
    );
  }

  // getAllStuffs(): void {
  //   this.whatisopen = 'stuffs';
  //   this.shafaService.getAllStuffs()
  //     .subscribe(
  //       (response) => {
  //         this.stuffs = response.stuffs;
  //       },
  //       (error) => {
  //         this.toastr.error('An error occurred while retrieving stuffs.', 'Error');
  //       }
  //     );
  // }
  calculateCategoryStats(): void {
    console.log('IM HERE 1!!!!!!!!!!')
    const categoryStatsMap = this.shelves.reduce((map, shelf) => {
      console.log('IM HERE 2!!!!!!!!!!')
      if (shelf.category && shelf.category.id) {
        const categoryId = shelf.category.id;
        console.log('IM HERE 3!!!!!!!!!!')
        if (map.has(categoryId)) {
          const categoryStats = map.get(categoryId)!;
          categoryStats.shelfCount++;
        } else {
          console.log('IM HERE 4!!!!!!!!!!')
          const categoryStats: CategoryStats = {
            category: shelf.category,
            outfitCount: 0,
            stuffCount: 0,
            shelfCount: 1,
          };
          map.set(categoryId, categoryStats);
        }
      }         console.log('IM HERE 5!!!!!!!!!!')
      return map;
    }, new Map<number, CategoryStats>());
    this.categoryStats = Array.from(categoryStatsMap.values());
  }
  
}
