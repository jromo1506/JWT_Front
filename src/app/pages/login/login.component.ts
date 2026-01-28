import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule,FormBuilder,FormGroup,Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { Swal2Service } from 'src/app/services/swal2.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations:[
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-out', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class LoginComponent {
  formLogin:FormGroup;
  constructor(private fb:FormBuilder, private userService:UserService,private authService:AuthService, private swalAlert:Swal2Service){
      this.formLogin = this.fb.group({
          username:['',Validators.required],
          password:['',Validators.required]
      });
  }


  onSubmit(){
 
    if(this.formLogin.valid){
      console.log(this.formLogin.value);
      let usuario = this.formLogin.value;
      this.autenticarUsuario();
      
    }
  }


  autenticarUsuario(){
    this.authService.login(this.formLogin.value).subscribe(res => {
      console.log(res);
      this.authService.saveToken(res.token,res.type);
      this.swalAlert.success("Done","Login succesful");
    },(err) => {
      console.log(err);
    });
  }

}
