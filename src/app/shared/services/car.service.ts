import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Car } from '../models/car';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private baseUrl = environment.carsApiBaseUrl;

  constructor(
    private http: HttpClient
  ) { }

  getCars(): Observable<Car[]> {
    const url = this.baseUrl + "carro";
    return this.http.get<Car[]>(url);
  }

  deleteCar(id: string): Observable<Object> {
    const url = this.baseUrl + id;
    return this.http.delete<Object>(url);
  }

  createCar(car: Car): Observable<Object> {
    const url = this.baseUrl + "carro";
    return this.http.post<Object>(url, car);
  }

  getCar(id: string): Observable<Car> {
    const url = this.baseUrl + id;
    return this.http.get<Car>(url);
  }

  updateCar(car: Car, id: string): Observable<Object> {
    const url = this.baseUrl + id;
    return this.http.put<Object>(url, car);
  }
}
