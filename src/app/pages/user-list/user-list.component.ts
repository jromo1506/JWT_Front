import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from 'src/app/services/user.service';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule,NgxPaginationModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {

  usuarios:any[] = [];
  p: number = 1;        // <-- current page
  itemsPerPage = 5;    
  constructor(private userService:UserService){
    this.userService.getUsuarios().subscribe(res=>{
        this.usuarios = res;
      },
    error=>{
      console.log("No se encontrarton usuarios");
    })
  }


  actualizarTabla(){
    this.userService.getUsuarios().subscribe(res=>{
        this.usuarios = res;
      },
    error=>{
      console.log("No se encontrarton usuarios");
    })
  }


  eliminarUsuario(id:string){
    this.userService.deleteUsuario(id).subscribe(res=>{
      this.actualizarTabla();
    });
  }




}
