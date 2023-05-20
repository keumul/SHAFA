import { Component, OnInit } from '@angular/core';
import { OutfitService } from '../services/outfit.service';
import { AuthService } from '../services/auth.service';
import { FormControl } from '@angular/forms';
import { StuffService } from '../services/stuff.service';

interface Outfit {
  id: number;
  name: string;
  stuffId?: Stuff;
  userId: User;
}

interface StuffInOutfit {
  outfitId: number;
  stuffId: number;
}

interface Stuff {
  stuffsInOutfits: StuffInOutfit[];
  id: number;
  name: string;
  user: User;
  outfits: Outfit[];
  shelf: Shelf;
  label?: Label;
  isAvailable: boolean;
}
interface Label {
  length: number;
  id: number;
  description: string;
  texture: string;
  color: string;
  size: string;
  price: number;
  brand: string;
}
interface Shelf {
  id: number
  name: string
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

interface User {
  id: number;
  userName: string;
}
@Component({
  selector: 'app-outfit-builder',
  templateUrl: './outfit-builder.component.html',
  styleUrls: ['./outfit-builder.component.css']
})
export class OutfitBuilderComponent implements OnInit {
  outfits: any[] = [];
  useroutfit: Outfit[] = [];
  stuffs!: any[];
  shelves?: any[]
  users: User[] = [];
  selectedOutfit!: Outfit;
  outfitsForm = new FormControl();
  outfitId: number = this.selectedOutfit?.id ?? '';
  outfitName: string = this.selectedOutfit?.name ?? '';
  stuffId: number = this.selectedOutfit?.stuffId?.id ?? 0;
  currentUserId!: number;
  selectedStuffIds: number[] = [];
  fullOutfit: StuffInOutfit[] = [];

  constructor(private outfitService: OutfitService,
    private authService: AuthService,
    private stuffService: StuffService) { }

  ngOnInit() {
    this.currentUserId = this.authService.getCurrentUserId()?.id;    
    this.getAllOutfits();
    this.loadStuffs();
  }
  

  isStuffBelongsToOutfit(stuffId: number, outfit: any): boolean {
    return outfit.stuffIds.includes(stuffId);
  }
  getOutfitStuff(outfit: Outfit): string[] {
    if (outfit && outfit.stuffId && outfit.stuffId.stuffsInOutfits) {
      return outfit.stuffId.stuffsInOutfits.map(stuffInOutfit => 
        this.getStuffName(stuffInOutfit.stuffId));
    }
    return [];
  }
  loadStuffs() {
    this.stuffService.getAllStuffsByUser(this.currentUserId).subscribe((
      data: any) => {
      this.stuffs = data.stuffs;
      
      this.stuffs.map((stuff) => {
        // console.log(stuff.stuffsInOutfits);
        stuff.stuffsInOutfits.map((relation: { outfitId: number; }) => {
          this.outfitService.getOutfitStuff(relation.outfitId).subscribe((relationData) => {
            this.stuffs = relationData.stuffs
            this.stuffs.map((singleStuff) => {
              // console.log(singleStuff);
            })
          })
        })

      })
    });
  }
  getAllOutfits() {
    this.outfitService.getAllOutfits(this.currentUserId).subscribe(
      (data: any ) => {
        this.outfits = data.uniqueOutfits;
        this.useroutfit = data.uniqueOutfits;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  getSelectedStuffNames(): string {
    return this.stuffs
      .filter(stuff => this.selectedStuffIds.includes(stuff.id))
      .map(stuff => stuff.name)
      .join(', ');
  }

  createOutfit() {
    if (this.selectedStuffIds.length === 0) {
      console.error('No stuff selected');
      return;
    }

    this.outfitService.createOutfit({
      name: this.outfitName, 
      userId: this.currentUserId
    }).subscribe(
      (response: { outfit: Outfit }) => {
        const createdOutfit = response.outfit;
        this.fillOutfit(createdOutfit.id, this.selectedStuffIds);
        this.ngOnInit();
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  getStuffName(stuffId: number): string {
    const stuff = this.stuffs.find(stuff => stuff.id === stuffId);
    return stuff ? stuff.name : '';
  }

  getUserName(userId: number): string {
    const user = this.users.find(user => user.id === userId);
    return user ? user.userName : '';
  }
  showOutfitStuff(outfit: Outfit) {
      this.selectedOutfit = outfit;
      this.outfitId = this.selectedOutfit?.id ?? 0;
      this.outfitService.getOutfitStuff(this.outfitId).subscribe(
        (data: { stuffs: StuffInOutfit[] }) => {
          this.stuffs = data.stuffs;
        },
        (error: any) => {
          console.error(error);
        }
      );
    }
  fillOutfit(outfitId: number, stuffIds: number[]) {
    stuffIds.map(stuffId => {
      this.outfitService.fillOutfit(stuffId, outfitId).subscribe(() => {
        this.ngOnInit()
      })
    })
  }

  deleteOutfit() {
    this.outfitService.deleteOutfit(this.outfitId).subscribe(
      (response: { message: string }) => {
        this.getAllOutfits();
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
}
