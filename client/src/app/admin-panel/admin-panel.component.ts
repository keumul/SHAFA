import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Socket, io } from 'socket.io-client';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { ShafaService } from '../services/shafa.service';
import { ToastrService } from 'ngx-toastr';
import { Chart, LogarithmicScale, registerables } from 'chart.js';
import { catchError, forkJoin, tap, throwError } from 'rxjs';


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

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent {
  private socket!: Socket;
  messages: any[] = [];
  newMessage!: string;
  logout_user: boolean = false;
  stuffs: Stuff[] = [];
  users?: User[] = [];
  constructor( 
    private router: Router, 
    private shafaService: ShafaService,
    private authService: AuthService, 
    private userService: UserService,
    private toastr: ToastrService) {}
  logout(){
    this.authService.logout();
    this.router.navigate(['login'])
  }
  ngOnInit(){
    this.getUsers();
    this.getAllStuffs();
    const unique_nums = Math.random() * 200000
    this.currentUser = this.authService.getCurrentUserId()
    if (!this.currentUser?.email){
      this.logout_user = true;      
      this.currentUser = {email: 'shafa_user_'+unique_nums.toFixed(0)}
    } else {this.logout_user = false;}
    this.socket = io('http://localhost:443', {
      transports: ['websocket'],
				withCredentials: true, 
				extraHeaders: {
					'Access-Control-Allow-Origin': 'https://localhost:4200'
				}
      }
    );
    this.socket.on('connect', () => {
      console.log('Connected to the server');
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from the server');
    });

    this.socket.on('message', (message: any) => {
      console.log(message);
      
      this.messages.push(message) 
    });
  }

  getAllStuffs(): void {
    this.shafaService.getAllStuffs()
      .subscribe(
        (response) => {
          this.stuffs = response.stuffs;
        },
        (error) => {
          console.error(error);
          // Handle error
        }
      );
  }
  
  getUsers(): void {
    this.userService.getAllUsers()
      .subscribe(
        response => {
          this.users = response.user;
        },
        error => {
          console.error(error);
          // Handle error
        }
      );
  }

  sendMessage(email:string, message: string) {
    this.socket.emit('message', {email: email, message: message});
  }

  // showGraph(){
  //   this.generateUserStatsChart()
  // }

  // generateUserStatsChart(): void {
  //   let userData: any;
  //   this.stuffs.reduce((userData: any, stuff: Stuff) => {
  //     const userId = stuff.user.id;
  //     userData[userId] = userData[userId] ? userData[userId] + 1 : 1;
  //   }, {});
  //   console.log(userData);
    
  //   const userNames = this.users!.map((user) => user.userName);
  //   const userStats = this.users!.map((user) => userData[user.id] || 0);

  //   const canvas = document.getElementById('userStatsChart') as HTMLCanvasElement;
  //   const ctx = canvas.getContext('2d');
  //   if (!ctx) return;

  //   new Chart(ctx, {
  //     type: 'bar',
  //     data: {
  //       labels: userNames,
  //       datasets: [
  //         {
  //           label: 'Number of Clothes',
  //           data: userStats,
  //           backgroundColor: 'rgb(255, 255, 255)',
  //           borderWidth: 1
  //         }
  //       ]
  //     },
  //     options: {
  //       responsive: true,
  //       scales: {
  //         y: {
  //           beginAtZero: true,
  //           ticks: {
  //             stepSize: 1,
  //           }}
  //       }
  //     }
  //   });
  // }
  currentUser: any;
}