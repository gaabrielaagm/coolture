import { Component } from '@angular/core';
import { UserService } from './services/user.service';
import { GLOBAL } from './services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})
export class AppComponent {
  public title : String;
  public identity;
  public url;

  constructor(
    private _userService : UserService,
    private _route: ActivatedRoute,
    private _router: Router
  ){
    this.title = 'COOL-TURE';
    this.identity = _userService.getIdentity();
    this.url = GLOBAL.url;
  }

  ngOnInit() {
    this.identity = this._userService.getIdentity()
  }

  ngDoCheck() {
    this.identity = this._userService.getIdentity();
    //console.log(this.identity);
    if(this.identity != null){
      if(this.identity.name.indexOf(' ') != -1){
        this.identity.name = this.identity.name.substr(0, this.identity.name.indexOf(' '));
      }
    }
  }

  logout(){
    localStorage.clear();
    this.identity = null;
    this._router.navigate(['/home']);
  }
}
