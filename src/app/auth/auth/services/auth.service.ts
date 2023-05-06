import { CurrentUserInterface } from './../../../shared/types/currentUser.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterRequestInterface } from 'src/app/shared/types/registerRequest.interface';
import { Observable, map } from 'rxjs';
import { AuthResponseInterface } from 'src/app/shared/types/authResponse.interface';

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
