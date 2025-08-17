import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Iuser } from '../models/iuser';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { 

  }

  getUser(): Observable<Iuser[]> {
    return this.http.get<Iuser[]>(`${environment.apiUrl}/users`);
  }

}
