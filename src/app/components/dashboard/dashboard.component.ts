import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  //  user: any = {};
 showLogoutPopup = false;
user = { firstName: 'Abc',
   lastName: 'User', 
   email:'abc@yopmail.com', 
   phoneCode: '91', phone: '9890986721',
    oldPassword: '', newPassword: '', confirmPassword: '' };
    showPassword:boolean=false;
  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    // Fetch user data from AuthService
    // this.user = this.auth.getUser();
    // console.log('Logged in user:', this.user);
  }
  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  updateProfile() { 
    alert("Update user form")
  console.log('Updated user:', this.user);
   }
   logout() { 
    this.showLogoutPopup = true;
    // const confirmlogout=window.confirm("are you sure you want to logout")
    // if(confirmlogout){
    //    this.auth.logout()
    // }else{

    // }
    
  }
   confirmLogout() {
    this.showLogoutPopup = false;
    this.auth.logout(); // redirects to login
  }

  cancelLogout() {
    this.showLogoutPopup = false; // hide popup
  }
  menuOpen = false;

toggleMenu() {
  this.menuOpen = !this.menuOpen;
}

}
