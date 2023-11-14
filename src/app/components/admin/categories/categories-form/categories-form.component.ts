import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Category } from 'src/app/shared/models/category';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.css']
})
export class CategoriesFormComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  isSubmitted = false
  editMode = false
  currentCategoryId: string = ''
  imageDisplay!: string | ArrayBuffer
  endSubs$ = new Subject<void>()

  constructor(private formBuilder: FormBuilder, private categoriesSvc: CategoriesService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      icon: ['', Validators.required],
      image: ['', Validators.required],
    })

    this._checkEditMode()
  }

  onSubmit() {
    this.isSubmitted = true

    if (!this.form.valid) return

    const categoryFormData = new FormData()

    Object.keys(this.categoryForm).map(key => {
      categoryFormData.append(key, this.categoryForm[key].value)
    })

    if (this.editMode) {
      this._updateCategory(categoryFormData)
    } else {
      this._addCategory(categoryFormData)

    }
  }

  onImageUpload(event: any) {
    const file = event.target?.files[0]

    if (file) {
      this.form.patchValue({ image: file })
      this.form.get('image')?.updateValueAndValidity()
      const fileReader = new FileReader()
      fileReader.onload = () => {
        this.imageDisplay = fileReader.result!
      }
      fileReader.readAsDataURL(file)
    }

  }

  private _checkEditMode() {
    this.activatedRoute.params.subscribe((res) => {
      if (res['id']) {
        this.editMode = true
        this.currentCategoryId = res['id']
        this.categoriesSvc.getCategory(res['id']).pipe(takeUntil(this.endSubs$)).subscribe(category => {
          this.categoryForm['name'].setValue(category['name']);
          this.categoryForm['icon'].setValue(category['icon']);
          this.imageDisplay = category.image!;
          this.categoryForm['image'].setValidators([])
          this.categoryForm['image'].updateValueAndValidity()
        })
      } else {
        this.editMode = false
      }

    })
  }

  private _addCategory(categoryFormData: FormData) {
    this.categoriesSvc.createCategory(categoryFormData).pipe(takeUntil(this.endSubs$)).subscribe(res => {
      Swal.fire({
        title: 'Success',
        text: 'Category created successfully',
        icon: 'success',
        showConfirmButton: false,
        timer: 3000,
      }).then(() => {
        this.router.navigate(['/admin/categories'])
      });
    },
      error => {
        Swal.fire({
          title: 'Error',
          text: 'Failed to create category',
          icon: 'error',
          showConfirmButton: false,
          timer: 3000,
        })

        this.form.reset()
      })
  }

  private _updateCategory(categoryFormData: FormData) {
    this.categoriesSvc.updateCategory(categoryFormData, this.currentCategoryId).pipe(takeUntil(this.endSubs$)).subscribe(res => {
      Swal.fire({
        title: 'Success',
        text: 'Category updated successfully',
        icon: 'success',
        showConfirmButton: false,
        timer: 3000,
      }).then(() => {
        this.router.navigate(['/admin/categories'])
      });
    },
      error => {
        Swal.fire({
          title: 'Error',
          text: 'Failed to update category',
          icon: 'error',
          showConfirmButton: false,
          timer: 3000,
        })

        this.form.reset()
      })
  }


  get categoryForm() {
    return this.form.controls
  }

  ngOnDestroy(): void {
    this.endSubs$.next()
    this.endSubs$.complete()
  }
}
