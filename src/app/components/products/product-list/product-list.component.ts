import { Location } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  constructor(private location: Location) { }

  back() {
    this.location.back()
  }

}
