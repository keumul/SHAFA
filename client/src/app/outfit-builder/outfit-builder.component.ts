import { Component, OnInit } from '@angular/core';
import { OutfitService } from '../services/outfit.service';
import { StuffService } from '../services/stuff.service';
import { AuthService } from '../services/auth.service';
import { FormControl } from '@angular/forms';
import { Observable, forkJoin } from 'rxjs';

interface Outfit {
  id: number;
  name: string;
  stuffId?: Stuff;
  userId: User;
  stuffs?: Stuff[];
}

interface OutfitStuffs {
  outfitId: number;
  stuffId: number;
}

interface Stuff {
  id: number;
  name: string;
  user: User;
  shelf: Shelf;
  label?: Label;
  img: string;
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


@Component({
  selector: 'app-outfit-builder',
  templateUrl: './outfit-builder.component.html',
  styleUrls: ['./outfit-builder.component.css']
})
export class OutfitBuilderComponent implements OnInit {
  outfits: Outfit[] = [];
  useroutfit: Outfit[] = [];
  stuffs: Stuff[] = [];
  users: User[] = [];
  selectedOutfit: Outfit | undefined;
  outfitsForm = new FormControl();
  outfitId: number = 0;
  outfitName: string = '';
  stuffId_: number = 0;
  currentUserId!: number;
  selectedStuffIds: number[] = [];
  fullOutfit: OutfitStuffs[] = [];

  constructor(
    private outfitService: OutfitService,
    private authService: AuthService,
    private stuffService: StuffService
  ) {}

  ngOnInit() {
    this.currentUserId = this.authService.getCurrentUserId()?.id;
    // this.getAllOutfits();
    this.loadOutfits();
    this.loadStuffs();
  }

  // isStuffBelongsToOutfit(stuffId: number, outfit: Outfit): boolean {
  //   return outfit.stuffs?.some(stuff => stuff.stuffId.id === stuffId) ?? false;
  // }

  // loadOutfitStuffs(outfitId: number): Observable<any> {
  //   return this.outfitService.getOutfitStuff(outfitId);
  // }
  // getOutfitStuff(outfit: Outfit): string[] {
  //   if (outfit && outfit.stuffs) {
  //     return outfit.stuffs.map(outfitStuffs =>
  //       this.getStuffName(outfitStuffs.stuffId.id)
  //     );
  //   }
  //   return [];
  // }
  getOutfitStuff(outfit: Outfit): Stuff[] {
    if (outfit && outfit.stuffs) {
      return outfit.stuffs.map(outfitStuffs => outfitStuffs);
    }
    return [];
  }
  loadStuffs() {
    this.stuffService. getAllStuffsByUser(this.currentUserId).subscribe(
      (data: { stuffs: Stuff[] }) => {
        this.stuffs = data.stuffs.filter(stuff => stuff.user.id === this.currentUserId);
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
  loadOutfits() {
    this.outfitService.getAllOutfits(this.outfitId).subscribe(
      (data: { uniqueOutfits: Outfit[] }) => {
        this.outfits = data.uniqueOutfits;

      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  // getAllOutfits() {
  //   this.outfitService.getAllOutfits(this.currentUserId).subscribe(
  //     (data: any) => {
  //       this.outfits = data.uniqueOutfits;
  
  //       this.useroutfit.forEach(outfit => {
  //         this.loadOutfitStuffs(outfit.id).subscribe(
  //           (stuffsData: { stuffs: OutfitStuffs[] }) => {
  //             outfit.stuffs = stuffsData.stuffs;
  //             this.loadStuffs(outfit.id);
  //           },
  //           (error: any) => {
  //             console.error(error);
  //           }
  //         );
  //       });
  //     },
  //     (error: any) => {
  //       console.error(error);
  //     }
  //   );
  // }
  
  

  getStuffName(stuffId: number): string {
    const stuff = this.stuffs.find(stuff => stuff.id === stuffId);
    return stuff ? stuff.name : '';
  }

  getSelectedStuffNames(): string {
    return this.stuffs
      .filter(stuff => this.selectedStuffIds.includes(stuff.id))
      .map(stuff => stuff.name)
      .join(', ');
  }

  // createOutfit() {
  //   if (this.selectedStuffIds.length === 0) {
  //     console.error('No stuff selected');
  //     return;
  //   }

  //   this.outfitService.createOutfit({
  //     name: this.outfitName,
  //     userId: this.currentUserId
  //   }).subscribe(
  //     (response: { outfit: Outfit }) => {
  //       const createdOutfit = response.outfit;
  //       this.fillOutfit(createdOutfit.id, this.selectedStuffIds);
  //       this.ngOnInit();
  //     },
  //     (error: any) => {
  //       console.error(error);
  //     }
  //   );
  // }

  getUserName(userId: number): string {
    const user = this.users.find(user => user.id === userId);
    return user ? user.userName : '';
  }

  // showOutfitStuff(outfit: Outfit) {
  //   this.selectedOutfit = outfit;
  //   this.outfitId = this.selectedOutfit?.id ?? 0;
  //   if (this.outfitId !== 0) {
  //     this.loadOutfitStuffs(this.outfitId).subscribe(
  //       (data: any) => {
  //         this.stuffs = data.stuffs.map((outfitStuffs: OutfitStuffs) => ({
  //           id: outfitStuffs.stuffId.id,
  //           name: this.getStuffName(outfitStuffs.stuffId.id),
  //           img: outfitStuffs.stuffId.img,
  //         }));          
  //         console.log(this.stuffs);
  //       },
  //       (error: any) => {
  //         console.error(error);
  //       }
  //     );
  //   }
  // }

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
  
  fillOutfit(outfitId: number, stuffIds: number[]) {

    const requests = stuffIds.map(stuffId => {
      return this.outfitService.fillOutfit(stuffId, outfitId);
    });
  
    forkJoin(requests).subscribe(() => {
      this.ngOnInit();
    });
  }
  

  // deleteOutfit() {
  //   this.outfitService.deleteOutfit(this.outfitId).subscribe(
  //     (response: { message: string }) => {
  //       this.getAllOutfits();
  //     },
  //     (error: any) => {
  //       console.error(error);
  //     }
  //   );
  // }
}
