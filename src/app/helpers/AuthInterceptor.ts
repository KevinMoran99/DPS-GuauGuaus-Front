import {
  Injectable
} from "@angular/core";
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor
}
from "@angular/common/http";
import {
  HttpRequest
} from "@angular/common/http";
import {
  Observable
} from 'rxjs';
import {
  AuthService
} from '../services/auth.service';
import {
  User
} from '../models/user.model';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  user: User;

  constructor() {

  }
  intercept(req: HttpRequest < any > , next: HttpHandler): Observable < HttpEvent < any >> {
      var clonedRequest;
    if (this.user != undefined && this.user.token != null) {
        clonedRequest = req.clone({
            headers: req.headers.set(
              'Authorization', 'bearer ' + this.user.token)
        });
    } else {
      this.user = JSON.parse(localStorage.getItem('auth'));
      clonedRequest = req.clone();
    }
    
    return next.handle(clonedRequest);
  }
}
