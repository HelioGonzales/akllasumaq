import { Component } from '@angular/core';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {
  categories: any[] = [
    {
      id: '1',
      name: 'Soaps'
    },
    {
      id: '2',
      name: 'Perfumes'
    },
    {
      id: '3',
      name: 'Creams'
    }
  ]

}
