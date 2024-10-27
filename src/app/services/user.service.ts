import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, UserClass } from '../models/user';
import { UntypedFormGroup } from '@angular/forms';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  public getuser(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/users/`);
  }
  public createUser(data: any): Observable<User> {
    console.log('Données envoyées à createUser:', data); // Log des données reçues
    const body = {
      mot_pass: data.password,
      nom: data.name,
      prenom: data.lastname,
      email: data.email,
      groupe: data.groupe,
    };

    return this.http.post<User>(`${this.baseUrl}/users/`, body);
  }
  public deleteUser(id: string): Observable<User> {
    return this.http.delete<User>(`${this.baseUrl}/users/delete/${id}`, {});
  }
  public updateUser(id: string, groupe: string): Observable<User> {
    const body = {
      groupe: groupe,
    };
    return this.http.put<User>(`${this.baseUrl}/users/update/${id}`, body);
  }
  public login(email: string, mot_pass: string): Observable<UserClass> {
    const body = {
      email: email,
      mot_pass: mot_pass,
    };
    return this.http.post<UserClass>(`${this.baseUrl}/users/login/`, body);
  }
  // partie gestion de profile

  public getprofil(token: any): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/users/profil/${token}`);
  }

  public forgetpass(email: string): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/users/rasetpass/${email}`, {});
  }

  public updateprofil(token: any,user:User,pass:string): Observable<User> {
    const body = {
      user:user,
      pass :pass
    }
    return this.http.put<User>(`${this.baseUrl}/users/updateprofil/${token}`,body);
  }

  public deleteprofil (token : any,pass:string): Observable<User> {
    return this.http.delete<User>(`${this.baseUrl}/users/deleteprofil/${token}/${pass}`, {});
  }
}
