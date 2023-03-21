import { Validators, FormBuilder } from '@angular/forms';
import { Car } from './../shared/models/car';
import { CarService } from './../shared/services/car.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  modalActive = false;
  carForm = this.fb.group({
    model: ['', Validators.required],
    year: ['', Validators.required],
    license: ['', Validators.required],
    brand: ['', Validators.required],
  })
  carros: Car[] = [];

  constructor(
    private carService: CarService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.fetchAllCars();
  }

  fetchAllCars(): void {
    this.carService.getCars()
      .subscribe(carros => {
        this.carros = carros;
      });
  }

  deleteCar(carro: Car): void {
    if (!carro._id) return;
    const confirmed = confirm("Você deseja deletar esse item permanentemente");
    if (confirmed) {
      this.carService.deleteCar(carro._id)
        .subscribe(
          () => {
            this.fetchAllCars();
          },
          error => console.log(error)
        )
    }
  }

  addCar(): void {
    const newCar = this.carForm.value;
    this.carService.createCar(newCar)
      .subscribe(
        res => {
          this.fetchAllCars();
          this.carForm.reset();
        },
        error => console.log(error)
      )
  }
}
