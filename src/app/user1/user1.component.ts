import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ProfileService } from '../profile.service';
import { Profile } from '../profile';

@Component({
  selector: 'app-user1',
  templateUrl: './user1.component.html',
  styleUrls: ['./user1.component.css']
})
export class User1Component implements OnInit {
  users={};
  profile: Profile = {};
  
//Adding constructor profile Service
  constructor(private profileService: ProfileService,private domSanitizer:DomSanitizer) { }

  ngOnInit(): void {
    this.getProfile();
    this.getuser1();
  }

  getProfile(): void {
    this.profileService.getProfile()
        .subscribe(profile => this.profile = profile);
  }


  // getuser1(): void {
  //   this.profileService.getuser1()
  //       .subscribe(users => this.users = users);
  //get User1
  getuser1():void {
      this.profileService.getuser1().subscribe((data)=>{
        this.users=data;
        //this.users = resp['users'];
        console.warn("data",data);
  })
}

// getuser1(){
//   this.profileService.getuser1().subscribe(resp => {
//     // this.catDta = resp['categories'];
//     // const products: any = [];
//     const jsonobject = resp;
//     this.users = resp['users'];
//     this.newestItems= resp['cat_products'];
//     console.log('newwest items2', jsonobject['cat_products']);

//   });
// }

}