import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Hist } from '../models/history';

@Injectable({
  providedIn: 'root'
})
export class HistService {
  private baseUrl = 'http://localhost:3000/api';
  constructor(private http: HttpClient) {}
  // fn pour appeler tout les historiques d'une place par sans id
  public gethist(id:string):Observable<Hist>{
    return this.http.get<Hist>(`${this.baseUrl}/hist/${id}`);

  }
  // fn pour appeler l'historique d'une place par sans et un intervale de date choisie
  public gethistbydate(id:string,date:string[]):Observable<Hist>{

    return this.http.get<Hist>(`${this.baseUrl}/hist/${id}/${date}`); //manque la date dans l'api

  }
}
