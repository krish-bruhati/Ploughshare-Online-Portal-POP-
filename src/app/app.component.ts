import { Component, OnInit,OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { MsalBroadcastService } from '@azure/msal-angular';
import { EventMessage, InteractionStatus,AuthenticationResult,EventType } from '@azure/msal-browser';
import { Subject } from 'rxjs';
import {filter,takeUntil} from 'rxjs/operators';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
    title = 'Ploughshare Online Portal';
    activeUser: string | undefined = "unknown user";
    activeUserId: string | undefined = "unknown user";
    isAuthenticated = false;

    private unsubscribe = new Subject<void>();

    constructor(private msalService:MsalService, private msalBroadcastService: MsalBroadcastService, private router:Router){}
    
    login(): void{
        this.msalService.instance.loginRedirect({
            scopes:["User.Read"]
            //if (!Request.IsAuthenticated)
        });
        //let activeAccount = this.msalService.instance.getActiveAccount();
        //this.router.navigate(['/user1']);
    }

    // login(): void{
    //     this.msalService.instance.loginRedirect().then(()=>{
    //         this.router.navigate(['/user1']);
    //     });
    // }
    // loginUser(): void{
    //     this.isAuthenticated.login().
    // }
    logout():void{
        this.msalService.instance.logoutRedirect();
        //this.router.navigate(['/home']);
    }
    ngOnInit(): void{
        this.msalBroadcastService.inProgress$
        .pipe(
            filter((status: InteractionStatus) => status== InteractionStatus.None),
            takeUntil(this.unsubscribe)
            )
        .subscribe(()=> {
            this.setAuthenticationStatus();
        });

        this.msalBroadcastService.msalSubject$
        .pipe(
            filter((message:EventMessage) => message.eventType === EventType.LOGIN_SUCCESS),
            takeUntil(this.unsubscribe)
            )
        .subscribe((message: EventMessage)=>{
            const authResult = message.payload as AuthenticationResult;
            this.msalService.instance.setActiveAccount(authResult.account);
        });
    }

    ngOnDestroy():void{
        this.unsubscribe.next(undefined);
        this.unsubscribe.complete();
    }


    setAuthenticationStatus():void{
        let activeAccount = this.msalService.instance.getActiveAccount();

        if(!activeAccount && this.msalService.instance.getAllAccounts().length>0){
            activeAccount = this.msalService.instance.getAllAccounts()[0];
            this.msalService.instance.setActiveAccount(activeAccount);

        }
        this.isAuthenticated = !!activeAccount;
        this.activeUserId = activeAccount?.username;
        this.activeUser = activeAccount?.name;

        //If you want to add more page please add user roles here
        if (this.activeUserId?.includes("krishan.patel@ploughshare.co.uk")) {
        this.router.navigate(['/user1']);
        }
        else if (this.activeUserId?.includes("liam.vermeulen@ploughshare.co.uk")) {
            this.router.navigate(['/user2']);
            }
        else if (this.activeUserId?.includes("harrison.hibbert@ploughshare.co.uk")) {
            this.router.navigate(['/user3']);
            }
        else{
            this.router.navigate(['/home']);
        }
    }
}
