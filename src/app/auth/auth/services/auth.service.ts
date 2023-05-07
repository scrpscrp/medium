import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, map } from 'rxjs';
import { AuthResponseInterface } from 'src/app/shared/types/authResponse.interface';
import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface';
import { RegisterRequestInterface } from 'src/app/shared/types/registerRequest.interface';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
constructor(private http: HttpClient) {}
  register(data: RegisterRequestInterface):Observable<CurrentUserInterface> {
    const url = 'https://conduit.productionready.io/api/users';
    return this.http.post<AuthResponseInterface>(url, data).pipe(map((response: AuthResponseInterface) => response.user));
  }
}
