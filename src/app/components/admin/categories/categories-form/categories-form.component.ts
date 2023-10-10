import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tap, timer } from 'rxjs';
import { Category } from 'src/app/shared/models/category';
import { CategoriesService } from 'src/app/shared/services/categories.service';

@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.css']
})
export class CategoriesFormComponent implements OnInit {

  form!: FormGroup;
  isSubmitted: boolean = false

  constructor(private formBuilder: FormBuilder, private categoriesSvc: CategoriesService, private router: Router) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      icon: ['', Validators.required]
    })
  }

  onSubmit() {

    this.isSubmitted = true

    if (!this.form.valid) return

    const category: Category = {
      name: this.form.controls['name'].value,
      icon: this.form.controls['icon'].value,
    }

    this.categoriesSvc.createCategory(category).subscribe(res => {
      // timer(3000).subscribe(res => {
      //   this.router.navigate(['/admin/categories'])
      // })
    })

  }

  get categoryForm() {
    return this.form.controls
  }
}
