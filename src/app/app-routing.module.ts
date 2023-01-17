import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MsalRedirectComponent } from '@azure/msal-angular';
import { MsalGuard } from '@azure/msal-angular';

import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { User1Component } from './user1/user1.component';
import { User2Component } from './user2/user2.component';
import { User3Component } from './user3/user3.component';

const routes: Routes = [
    {
        path: 'profile',
        component: ProfileComponent,
        canActivate:[MsalGuard]
    },
    {
        path: 'auth',
        component: MsalRedirectComponent,
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'user1',
        component: User1Component
        // canActivate:[MsalGuard],
        // redirectTo: ''

    },
    {
        path: 'user2',
        component: User2Component,
        canActivate:[MsalGuard]
    },
    {
        path: 'user3',
        component: User3Component,
        canActivate:[MsalGuard]
    },
    // { 
    //     path: '**', 
    //     component: PageNotFoundComponent 
    // }

        // otherwise redirect to home
        // { 
        //     path: '', 
        //     pathMatch:'full',
        //     redirectTo: '/user1'
        //     //canActivate:[MsalGuard]
        // },
        { 
            path: '**', 
            redirectTo: '/home',
            //canActivate:[MsalGuard]
        }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
