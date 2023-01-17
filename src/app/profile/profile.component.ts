import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Profile } from '../profile';
import { ProfileService } from '../profile.service';


@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

    profile: Profile = {};
    profilePic?:SafeResourceUrl;

    constructor(private profileService: ProfileService,private domSanitizer:DomSanitizer) { }

    ngOnInit(): void {
        this.getProfile();
        this.getProfilePic();
    }

    getProfile(): void {
        this.profileService.getProfile()
            .subscribe(profile => this.profile = profile);
    }
    getProfilePic(): void {
        this.profileService.getProfilePic()
            .subscribe(response=> {
                var urlCreator =window.URL|| window.webkitURL
                this.profilePic =this.domSanitizer.bypassSecurityTrustResourceUrl
                (urlCreator.createObjectURL(response));
        });
    }
}