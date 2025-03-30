import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule,FormBuilder,FormGroup,Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  formLogin:FormGroup;
  constructor(private fb:FormBuilder){
      this.formLogin = this.fb.group({
          nombre:['',Validators.required],
          contrasena:['',Validators.required]
      });
  }


  onSubmit(){
 
    if(this.formLogin.valid){
      console.log(this.formLogin.value);
    }
  }

}
