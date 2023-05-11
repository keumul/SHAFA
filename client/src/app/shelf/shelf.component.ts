import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Shelf {
  id: number;
  name: string;
  userId: number;
  categoryId: number;
}

@Component({
  selector: 'app-shelf',
  templateUrl: './shelf.component.html',
  styleUrls: ['./shelf.component.css']
})

export class ShelfComponent implements OnInit {
  shelves: Shelf[] = [];
  newShelfName: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getAllShelves();
  }

  getAllShelves() {
    this.http.get<Shelf[]>('http://localhost:3000/api/shelf/').subscribe(
      (shelves) => {
        this.shelves = shelves;
      },
      (error) => {
        console.error(error);
        // Handle error
      }
    );
  }

  addShelf() {
    const newShelf: Shelf = {
      id: 0,
      name: this.newShelfName,
      userId: 0, 
      categoryId: 0,
    };

    this.http.post<Shelf>('/api/shelves', newShelf).subscribe(
      (shelf) => {
        this.shelves.push(shelf);
        this.newShelfName = '';
      },
      (error) => {
        console.error(error);
        // Handle error
      }
    );
  }
}
