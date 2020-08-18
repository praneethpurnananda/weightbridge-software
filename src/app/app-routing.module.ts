import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NotloadedGenerateBillComponent } from './notloaded-generate-bill/notloaded-generate-bill.component';
import { LoadedGenerateBillComponent } from './loaded-generate-bill/loaded-generate-bill.component';

const routes: Routes = [
  {path: '' , component: LoginComponent},
  {path: 'emptyvehicle' , component: NotloadedGenerateBillComponent},
  {path: 'loadedvehicle' , component: LoadedGenerateBillComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
