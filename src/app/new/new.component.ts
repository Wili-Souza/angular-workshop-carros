import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/shared/models/car';
import { CarroService } from '../shared/services/carro.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss'],
})
export class NewComponent implements OnInit {
  itemForm = this.fb.group({
    model: ['', Validators.required],
    brand: ['', Validators.required],
    year: ['', Validators.required],
    license: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private carroService: CarroService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if ('id' in params) {
        this.fetchCar(params.id);
      }
    });
  }

  fetchCar(carId: string) {
    this.carroService.getCarsById(carId).subscribe(
      (car) => {
        this.itemForm.patchValue(car);
      },
      (error) => console.log(error)
    );
  }

  addCar() {
    if (!this.itemForm.valid) return;
    const car = this.itemForm.value as Car;
    this.carroService.createCar(car).subscribe(
      () => {
        this.itemForm.reset();
        alert('Carro criado com sucesso!');
      },
      (error) => console.log(error)
    );
  }
}
