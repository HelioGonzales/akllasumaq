import { Location } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})
export class DescriptionComponent {
  constructor(private location: Location) {

  }

  back() {
    this.location.back()
  }
}
