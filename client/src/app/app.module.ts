declare const toastr: Toastr;
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtHelperService } from '@auth0/angular-jwt';
import { FormsModule } from '@angular/forms';
import { MatChipsModule} from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { RegistrationComponent } from './registration/registration.component';
import { MatInputModule} from '@angular/material/input';
import { MatRippleModule} from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthComponent } from './auth/auth.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ShelfComponent } from './shelf/shelf.component';
import { StuffComponent } from './stuff/stuff.component';
import { OutfitBuilderComponent } from './outfit-builder/outfit-builder.component';
import { LabelComponent } from './label/label.component';
import { AppCategoryListComponent } from './category-list/category-list.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule} from '@angular/material/icon';
import { MatSidenavModule} from '@angular/material/sidenav';
import { MatExpansionModule} from '@angular/material/expansion';
import { MatTabsModule} from '@angular/material/tabs';
import { TokenInterceptor } from './token.interceptor';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import {MatTooltipModule} from '@angular/material/tooltip';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { UserComponent } from './user/user.component';
import { ShafaComponent } from './shafa/shafa.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { ToastrModule } from 'ngx-toastr';
import { Toastr } from './toastr.service';
import { ChatComponent } from './chat/chat.component';
import {MatMenuModule} from '@angular/material/menu';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    AuthComponent,
    UserProfileComponent,
    ShelfComponent,
    StuffComponent,
    OutfitBuilderComponent,
    LabelComponent,
    AppCategoryListComponent,
    AdminPanelComponent,
    UserComponent,
    ShafaComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatChipsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatExpansionModule,
    MatTabsModule,
    MatSelectModule,
    MatListModule,
    MatTooltipModule,
    MatSnackBarModule,
    ToastrModule.forRoot(),
    MatMenuModule
  ],
  providers: [ {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  },
  JwtHelperService],
  bootstrap: [AppComponent]
})
export class AppModule { }
