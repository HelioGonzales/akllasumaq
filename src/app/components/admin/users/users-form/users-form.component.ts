import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.css']
})
export class UsersFormComponent implements OnInit {
  editMode = false
  isSubmitted = false
  form!: FormGroup

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this._initForm()
  }

  onSubmit() { }

  private _initForm() {
    this.form = this.formBuilder.group({
      name: [''],
      email: [''],
      password: [''],
      phone: [''],
      isAdmin: [true],
      street: [''],
      apartment: [''],
      zip: [''],
      city: [''],
      country: [''],
    })
  }

  get userForm() {
    return this.form.controls
  }
}
