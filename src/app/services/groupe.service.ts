import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Groupe, Permission } from '../models/groupe';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class GroupeService {
  private baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  public getgroupe(): Observable<Groupe[]> {
    return this.http.get<Groupe[]>(`${this.baseUrl}/grps/`);
  }
  public getper(): Observable<Permission> {
    return this.http.get<Permission>(`${this.baseUrl}/pers/`);
  }
  public updateGroupe(id:string,list:string[]): Observable<Groupe> {
    const body={

      permissions:list
    }
    return this.http.put<Groupe>(`${this.baseUrl}/grps/update/${id}`, body);
  }
  public deleteGroupe(nom: string,): Observable<Groupe> {

    return this.http.delete<Groupe>(`${this.baseUrl}/grps/delete/${nom}`, {});
  }
  public createGroupe(nom:string,li:string[]): Observable<Groupe> {
    const body = {
      nom:nom,
      permissions:li

    }
    return this.http.post<Groupe>(`${this.baseUrl}/grps/`, body);
  }

}
