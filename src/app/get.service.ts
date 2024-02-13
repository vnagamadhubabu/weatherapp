import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetService {

  constructor(private http:HttpClient) { }

  private url = 'https://api.openweathermap.org/data/2.5/weather';
  private apiKey = 'e5e1bf9cff8cab2bc15ce41c0b63ffe7';

  private urlforDaily = 'https://pro.openweathermap.org/data/2.5/forecast/hourly?';
  getWeather(latitude:any,longitude:any):Observable<any>{
    const url = `${this.url}?lat=${latitude}&lon=${longitude}&appid=${this.apiKey}`;
    return this.http.get(url);
  }

 
}
