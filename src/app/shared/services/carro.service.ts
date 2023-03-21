import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { Car } from 'src/app/shared/models/car';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CarroService {
  private BASE_URL = environment.carsApiBaseUrl;

  constructor( private http: HttpClient ) { }

  getCars(): Observable<Car[]> {
    const url = this.BASE_URL + "carro";

    return this.http.get<Car[]>(url)
      .pipe(
        map( (car: Object[]) => car as Car[] )
      );
  }

  createCar(car: Car): Observable<Object>{
    const url = this.BASE_URL + "carro";
    return this.http.post<Object>(url, car);
  }

  getCarsById(id: string): Observable<Car> {
    const url = this.BASE_URL + id;
    return this.http.get<Car>(url);
  }

  updateCar(id: string, car: Car): Observable<Car> {
    const url = this.BASE_URL + id;
    return this.http.put<Car>(url, car);
  }

  deleteCar(id: string): Observable<Object> {
    const url = this.BASE_URL + id;
    return this.http.delete<Object>(url);
  }
}
