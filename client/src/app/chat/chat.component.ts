import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Socket, io } from 'socket.io-client';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService){}
  private socket!: Socket;
  messages: any[] = [];
  newMessage!: string;
  logout_user: boolean = false;
  ngOnInit() {
    const unique_nums = Math.random() * 200000
    this.currentUser = this.authService.getCurrentUserId()
    if (!this.currentUser?.email){
      this.logout_user = true;
      this.currentUser = {email: 'shafa_user'+unique_nums.toFixed(0)}
    } else {this.logout_user = false;}
    this.socket = io('https://localhost:443', {
      transports: ['websocket'],
				withCredentials: true,
				extraHeaders: {
					'Access-Control-Allow-Origin': 'https://localhost:4200'
				}
    });

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

  redirectToHomePage() {
    if(this.logout_user === false){
    this.router.navigate(['/user-profile']);}
    else {this.router.navigate(['/login']);}
    
  }

  sendMessage(email:string, message: string) {
    this.socket.emit('message', {email: email, message: message});
  }

  currentUser: any;
}