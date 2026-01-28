import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule,FormBuilder,FormGroup,Validators} from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  animations:[
      trigger('fadeIn', [
        transition(':enter', [
          style({ opacity: 0 }),
          animate('300ms ease-out', style({ opacity: 1 }))
        ])
      ])
    ]
})
export class RegisterComponent {
  
  formRegister:FormGroup;
  
  constructor(private fb:FormBuilder,private userService:UserService, private authService:AuthService){
    this.formRegister = this.fb.group({
      username:['',Validators.required],
      email:['',Validators.email],
      password:['',Validators.required],
      repeatPassword:['',Validators.required]
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
    this.authService.register(this.formRegister.value).subscribe(res=>{
      console.log(res);
    },err=>{
      console.log(err);
    }
  );
  }


  
}



