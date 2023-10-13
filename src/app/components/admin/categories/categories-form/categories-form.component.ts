import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
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
      Swal.fire({
        title: 'Success',
        text: 'Category created successfully',
        icon: 'success',
        showConfirmButton: false, // Remove the confirm button
        timer: 3000, // Automatically close after 3 seconds (adjust the timer as needed)
      }).then(() => {
        this.router.navigate(['/admin/categories'])
      });
    },
      error => {
        Swal.fire({
          title: 'Error',
          text: 'Failed to create category',
          icon: 'error',
          showConfirmButton: false, // Remove the confirm button
          timer: 3000, // Automatically close after 3 seconds (adjust the timer as needed)
        })

        this.form.reset()
      })

  }


  get categoryForm() {
    return this.form.controls
  }
}
