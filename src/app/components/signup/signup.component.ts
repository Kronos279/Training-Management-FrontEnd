import { Component, inject } from '@angular/core';
import { LoginRegisterService } from '../../login-register.service';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule,FormControl, FormsModule } from '@angular/forms';
import { AuthServiceService } from '../../auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {


  signUpForm : FormGroup;

  constructor(private loginregisterService:LoginRegisterService,private authService:AuthServiceService) {
    this.signUpForm = new FormGroup({
      email: new FormControl('', Validators.required),
      employeeId: new FormControl ('', Validators.required),
      password: new FormControl('', [Validators.required,Validators.minLength(5)]),
      role: new FormControl('')
    });
  }
  ngOnInit(){

  }

  router = inject(Router);
  credentials = { employeeId: '', password: '' };

  login(){
    console.log(this.credentials)
    this.authService.Login(this.credentials).subscribe((res)=>{console.log(res);
       const role = this.authService.getRole();
       if(role == "ROLE_ADMIN"){
        this.router.navigate(["/"])
       }else{
        this.router.navigate(["/Unauthorised"])
       }
    });
  }

  onSubmit(){
    if(this.signUpForm.invalid){
      alert("Kindly enter all the details as per format")
    }
    else{
    this.loginregisterService.registerUser(this.signUpForm.value).subscribe((res:any)=>{
      console.log(res);
      alert("You have successfully signed up");

    });
    }
  }


  addRightPanelClass(): void {
    const container = document.getElementById('container');
    if (container) {
      container.classList.add('right-panel-active');
    }
  }

  removeRightPanelClass(): void {
    const container = document.getElementById('container');
    if (container) {
      container.classList.remove('right-panel-active');
    }
  }
}
