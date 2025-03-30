import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule,FormBuilder,FormGroup,Validators} from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  
  formRegister:FormGroup;
  
  constructor(private fb:FormBuilder){
    this.formRegister = this.fb.group({
      usuario:['',Validators.required],
      contrasena:['',Validators.required],
      repiteContrasena:['',Validators.required]
    });

  }


  onSubmit(){
    if(this.formRegister.valid){
      if(this.checkContrasena()){
        alert("Contrasenas coinciden");
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
}



