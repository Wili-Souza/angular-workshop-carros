import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/shared/models/car';
import { CarroService } from '../shared/services/carro.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  items: Car[] = [];

  constructor(
    private carroService: CarroService
  ) { }

  ngOnInit(): void {
    this.fetchItems();
  }

  private fetchItems() {
    this.carroService.getCars().subscribe( cars => {
      this.items = cars;
    }, error => console.log( error ));
  }

  onDelete(item: any) {
    const carName = `${item.brand} ${item.model}`;
    const confirmed = confirm(`Você deseja deletar o carro ${ carName }?`)
    if ( confirmed ) {
      this.carroService.deleteCar(item._id).subscribe( res => {
        this.fetchItems();
      }, error => alert( "Erro: " + error ));
    }
  }
}
