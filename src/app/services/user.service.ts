import { Injectable } from '@angular/core';
import { GlobalApiService } from './global-api.service';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
  
})
export class UserService {

  constructor(private api:GlobalApiService,private http:HttpClient ) { }

  // Add usuario
  addUsuario(user:any):Observable<any>{
    return this.http.post(this.api.getURL() + "/users",user);
  }

  // Get Usuario
  getUsuario(id:string):Observable<any>{
    return this.http.get(this.api.getURL() + "/users/" + id);
  }

  // Get Usuarios
  getUsuarios():Observable<any>{
    return this.http.get(this.api.getURL()+ "/users");
  }

  // Put Usuario
  modificarUsuario(id:string,user:any){
    return this.http.put(this.api.getURL() + "/usuario/" +id,user);
  }

  // Delte Usuario

  deleteUsuario(id:string){
    return this.http.delete(this.api.getURL() + "/users/"+ id);
  }




  //Autenticar Usuario
  authUsuario(user:any){
    return this.http.post(this.api.getURL() + "/login",user);
  }
}
