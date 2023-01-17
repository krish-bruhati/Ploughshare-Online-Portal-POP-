import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';

import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import {BrowserCacheLocation, InteractionType, IPublicClientApplication, LogLevel, PublicClientApplication} from '@azure/msal-browser';
import { MSAL_INTERCEPTOR_CONFIG, MSAL_GUARD_CONFIG, MsalInterceptor, MsalBroadcastService,MsalGuardConfiguration,MsalGuard, MSAL_INSTANCE, MsalService ,MsalRedirectComponent,} from '@azure/msal-angular';

import { MsalInterceptorConfiguration, ProtectedResourceScopes } from '@azure/msal-angular/msal.interceptor.config';
import { User1Component } from './user1/user1.component';
import { User2Component } from './user2/user2.component';
import { User3Component } from './user3/user3.component';

const isIE = window.navigator.userAgent.indexOf("MSIE ") > -1 || window.navigator.userAgent.indexOf("Trident/") > -1;

//Azure Msal Function creating
function MsalInstanceFactory():IPublicClientApplication {
    return new PublicClientApplication({
        auth:{
            clientId: 'b38591e7-7709-45b0-8a7c-35898c6b3fc9',
            authority:'https://login.microsoftonline.com/515e76ba-387b-414d-8b07-0b8a70ff2b96',
            redirectUri:'/auth',
            postLogoutRedirectUri: 'http://localhost:4200/home'
        },
        cache:{
            //cacheLocation:'sessionstorage',
            cacheLocation: BrowserCacheLocation.LocalStorage,
            storeAuthStateInCookie: isIE, // set to true for IE 11
            //storeAuthStateInCookie: true,
            //cacheLocation: 'memoryStorage'
        },
        system:{
            loggerOptions:{
                loggerCallback:(Level,message,containsPii)=>{
                    console.log(message);
                },
                logLevel:LogLevel.Verbose
            }
        }
    });
}

function MsalGuardConfigFactory():MsalGuardConfiguration{
    return {
        interactionType:InteractionType.Redirect,
        authRequest:{
            scopes:['user.read'],
        }
    }
}

function MsalInterceptorConfigFactory(): MsalInterceptorConfiguration{
    const myProtectedResourcesMap = new Map<string,Array<string | ProtectedResourceScopes>|null>();
    myProtectedResourcesMap.set('https://graph.microsoft.com/v1.0/me',[{
        httpMethod:'GET',
        scopes:['user.read']
    }]);
    return {
        interactionType:InteractionType.Popup,
        protectedResourceMap: myProtectedResourcesMap
    }
}



@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        ProfileComponent,
        User1Component,
        User2Component,
        User3Component
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MatButtonModule,
        MatToolbarModule,
        MatListModule,
        MatMenuModule,
        MatCardModule
    ],
    providers: [
        {
            provide:MSAL_INSTANCE,
            useFactory:MsalInstanceFactory
        },
        {
            provide: MSAL_GUARD_CONFIG,
            useFactory:MsalGuardConfigFactory
        },
        {
            provide:HTTP_INTERCEPTORS,
            useClass:MsalInterceptor,
            multi:true
        },
        {
            provide:MSAL_INTERCEPTOR_CONFIG,
            useFactory: MsalInterceptorConfigFactory
        },
        MsalService,
        MsalBroadcastService,
        MsalGuard
    ],
    bootstrap: [AppComponent, MsalRedirectComponent]
})
export class AppModule { }
