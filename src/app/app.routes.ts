import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    {path:'login',component:LoginComponent},
    {path:'register',component:RegisterComponent},
    {path:'lista',component:UserListComponent,  canActivate: [AuthGuard]},
    {path:'**',redirectTo:''}
];
