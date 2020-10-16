import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { User } from 'src/app/models/user.model';
import { Userl } from 'src/app/models/userl';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent  {
  user:User;
  userl:Userl;
  isLoggedIn$: Observable<boolean>;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe( 
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private authService: AuthService) { }

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn;
    this.user = JSON.parse(localStorage.getItem('auth'));
    this.userl = JSON.parse(localStorage.getItem('auth'));
    console.table(this.user)
  }

  onLogout() {
    this.authService.logout();
  }

}
