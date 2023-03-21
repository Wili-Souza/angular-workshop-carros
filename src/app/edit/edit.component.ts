import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/shared/models/car';
import { CarroService } from '../shared/services/carro.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  carId!: string;

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
    this.getCar();
  }

  getCar() {
    this.activatedRoute.params.subscribe((params) => {
      if ('id' in params) {
        this.carId = params.id;
        this.fetchCar();
      }
    });
  }

  fetchCar() {
    this.carroService.getCarsById(this.carId).subscribe(
      (car) => {
        this.itemForm.patchValue(car);
      },
      (error) => console.log(error)
    );
  }

  saveCar() {
    if (this.itemForm.invalid) return;
    const car = this.itemForm.value as Car;
    this.carroService.updateCar(this.carId, car).subscribe(
      () => {
        alert('Carro atualizado com sucesso!');
      },
      (error) => console.log(error)
    );
  }
}
