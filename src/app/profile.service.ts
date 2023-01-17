import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Profile } from './profile';

//const Goldvision_API = 'https://jsonplaceholder.typicode.com/users';
const Goldvision_API = 'https://dummyjson.com/users/2';

@Injectable({
    providedIn: 'root'
})
export class ProfileService {

    constructor(private httpClient: HttpClient) { }

    getProfile(): Observable<Profile> {
        return this.httpClient.get<Profile>('https://graph.microsoft.com/v1.0/me');
        
        // return new Observable<Profile>(observer => {
        //     observer.next({
        //         displayName: "John Doe",
        //         givenName: "John",
        //         id: "1",
        //         jobTitle: "Software Engineer",
        //         mail: "jdoe@azure.net",
        //         surname: "Doe",
        //         userPrincipalName: "jdoe@azure.net"
        //     });
        // })
        }
    getProfilePic() {
        return this.httpClient.get('https://graph.microsoft.com/v1.0/me/photo/$value', {responseType:'blob'});
    }

    getuser1(){
        return this.httpClient.get(Goldvision_API);
    }
        
}

