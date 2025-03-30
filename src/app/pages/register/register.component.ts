import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule,FormBuilder,FormGroup,Validators} from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  
  formRegister:FormGroup;
  
  constructor(private fb:FormBuilder,private userService:UserService){
    this.formRegister = this.fb.group({
      usuario:['',Validators.required],
      contrasena:['',Validators.required],
      repiteContrasena:['',Validators.required]
    });

  }


  onSubmit(){
    if(this.formRegister.valid){
      if(this.checkContrasena()){
        this.registrarUsuario();
      }
      else{
        alert("Contrasenas no coinciden");
      }
    }
  }


  checkContrasena(){
    if(this.formRegister.get('contrasena')?.value === this.formRegister.get('repiteContrasena')?.value){
      return true;
    }
    return false;
  }

  registrarUsuario(){
    this.userService.addUsuario(this.formRegister.value).subscribe(res =>{
      console.log(res);
    },(err)=>{
      console.log(err);
    });
  }


  
}



