import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import{ HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private url = 'http://localhost:3000'

  constructor(private http: HttpClient) { }

  login(data): Observable<any>{
    const params = new HttpParams()
      .set('email', data.email)
      .set('password', data.password);
    return this.http.post(`${this.url}/api/v1/users/login`, params);
  }

  signUp(data): Observable<any> {
    const params =new HttpParams()
      .set('firstName', data.firstName)
      .set('lastName', data.lastName)
      .set('mobile', data.mobile)
      .set('password', data.password)
      .set('email', data.email);
    return this.http.post(`${this.url}/api/v1/users/signup`, params);
    
  }

}
