import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ProfileService } from '../profile.service';
import { Profile } from '../profile';

@Component({
  selector: 'app-user2',
  templateUrl: './user2.component.html',
  styleUrls: ['./user2.component.css']
})
export class User2Component implements OnInit {
  users={};
  profile: Profile = {};

  constructor(private profileService: ProfileService,private domSanitizer:DomSanitizer) { }

  ngOnInit(): void {
    this.getProfile();
    this.getuser1();
  }
  getProfile(): void {
    this.profileService.getProfile()
        .subscribe(profile => this.profile = profile);
  }
  getuser1():void {
    this.profileService.getuser1().subscribe((data)=>{
      this.users=data;
      //this.users = resp['users'];
      console.warn("data",data);
})
  }

}
