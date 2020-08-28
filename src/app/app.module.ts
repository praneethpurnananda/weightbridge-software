import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { DatePipe } from "@angular/common";
import {NgxPrintModule} from 'ngx-print';
import {WebcamModule} from 'ngx-webcam';
//material design
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatListModule} from '@angular/material/list';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatSnackBarModule} from '@angular/material/snack-bar';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NotloadedGenerateBillComponent , PrintEmptyBill } from './notloaded-generate-bill/notloaded-generate-bill.component';
import { LoadedGenerateBillComponent } from './loaded-generate-bill/loaded-generate-bill.component';
import { HeadingsComponent } from './headings/headings.component';
import { AdminComponent } from './admin/admin.component';
import { AddUserComponent } from './admin/add-user/add-user.component';
import { ShowUsersComponent } from './admin/show-users/show-users.component';
import { ItemsComponent , EditItems } from './admin/items/items.component';
import { CustomertypeComponent , DeletedDiscount } from './admin/customertype/customertype.component';
import { AddcustomertypeComponent , EditCustomer } from './admin/addcustomertype/addcustomertype.component';
import { ViewBillsComponent } from './view-bills/view-bills.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    NotloadedGenerateBillComponent,
    LoadedGenerateBillComponent,
    HeadingsComponent,
    AdminComponent,
    AddUserComponent,
    ShowUsersComponent,
    ItemsComponent,
    EditItems,
    CustomertypeComponent,
    DeletedDiscount,
    AddcustomertypeComponent,
    EditCustomer,
    ViewBillsComponent,
    PrintEmptyBill
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatListModule,
    MatTableModule,
    MatDialogModule,
    NgxPrintModule,
    MatBottomSheetModule,
    WebcamModule,
    MatSnackBarModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
