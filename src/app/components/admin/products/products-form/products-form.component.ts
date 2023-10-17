import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/shared/models/category';
import { CategoriesService } from 'src/app/shared/services/categories.service';

@Component({
  selector: 'app-products-form',
  templateUrl: './products-form.component.html',
  styleUrls: ['./products-form.component.css']
})
export class ProductsFormComponent implements OnInit {
  editMode = false
  form!: FormGroup
  isSubmitted!: boolean
  categories: Category[] = []

  constructor(private formBuilder: FormBuilder, private categoriesSvc: CategoriesService) { }

  ngOnInit(): void {
    this._initForm()
    this._getCategories()
  }

  onSubmit() { }

  private _initForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      brand: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
      countInStock: ['', Validators.required],
      description: ['', Validators.required],
      richDescription: [''],
      image: [''],
      isFeatured: [''],
    })
  }

  private _getCategories() {
    this.categoriesSvc.getCategories().subscribe(res => {
      this.categories = res
    })
  }

  get productForm() {
    return this.form.controls
  }
}
