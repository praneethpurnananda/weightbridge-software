import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NotloadedGenerateBillComponent } from './notloaded-generate-bill/notloaded-generate-bill.component';
import { LoadedGenerateBillComponent } from './loaded-generate-bill/loaded-generate-bill.component';
import { AddUserComponent } from './admin/add-user/add-user.component';
import { ItemsComponent } from './admin/items/items.component';

const routes: Routes = [
  {path: '' , component: LoginComponent},
  {path: 'emptyvehicle' , component: NotloadedGenerateBillComponent},
  {path: 'loadedvehicle' , component: LoadedGenerateBillComponent},
  {path: 'addUser' , component: AddUserComponent},
  {path: 'item' , component: ItemsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
