import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule,FormBuilder,FormGroup,Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  formLogin:FormGroup;
  constructor(private fb:FormBuilder, private userService:UserService){
      this.formLogin = this.fb.group({
          usuario:['',Validators.required],
          contrasena:['',Validators.required]
      });
  }


  onSubmit(){
 
    if(this.formLogin.valid){
      console.log(this.formLogin.value);
      let usuario = this.formLogin.value;

      this.userService.addUsuario(usuario).subscribe(res=>{
        console.log(res);
      },(err) =>{
        console.log(err);
      });
      
    }
  }

}
