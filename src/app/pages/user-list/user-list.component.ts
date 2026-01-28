import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {

  usuarios:any[] = [];

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
