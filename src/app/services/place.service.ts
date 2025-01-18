import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Etage, Place, Places } from '../models/etage';

@Injectable({
  providedIn: 'root',
})
export class PlaceService {
  private baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  public getDonnees(): Observable<Etage[]> {
    return this.http.get<Etage[]>(`${this.baseUrl}/etages/`);
  }

  public getEtagebyName(nom: string): Observable<Etage> {
    return this.http.get<Etage>(`${this.baseUrl}/etages/${nom}`);
  }

  public updateEtage(id: string, np: number): Observable<Etage> {
    const body = { id: id, np: np };
    return this.http.put<Etage>(`${this.baseUrl}/etages/update/`, body);
  }
  public deleteEtage(nom: string,): Observable<Etage> {

    return this.http.delete<Etage>(`${this.baseUrl}/etages/delete/${nom}`, {});
  }
  public createEtage(nom:string,np:number): Observable<Etage> {
    const body = { nom: nom, np: np };
    return this.http.post<Etage>(`${this.baseUrl}/etages/`, body);
  }

  public getPlaces(): Observable<Places> {
    return this.http.get<Places>(`${this.baseUrl}/places/`);
  }
  public getOnePlace(id : any): Observable<Places> {
    console.log(id);
    
    return this.http.get<Places>(`${this.baseUrl}/places/state/${id}`);
  }
}
