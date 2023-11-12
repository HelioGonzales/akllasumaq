import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Category } from 'src/app/shared/models/category';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { ProductsService } from 'src/app/shared/services/products.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-products-form',
  templateUrl: './products-form.component.html',
  styleUrls: ['./products-form.component.css']
})
export class ProductsFormComponent implements OnInit, OnDestroy {
  editMode = false
  form!: FormGroup
  isSubmitted = false
  categories: Category[] = []
  imageDisplay!: string | ArrayBuffer
  currentProductId: string = ''
  endSubs$ = new Subject<void>()

  constructor(private formBuilder: FormBuilder, private categoriesSvc: CategoriesService, private router: Router, private productsSvc: ProductsService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this._initForm()
    this._getCategories()
    this._checkEditMode()
  }

  onSubmit() {
    this.isSubmitted = true
    if (this.form.invalid) {
      return
    }

    const productFormData = new FormData()

    Object.keys(this.productForm).map(key => {
      productFormData.append(key, this.productForm[key].value)
    })


    if (this.editMode) {
      this._updatedProduct(productFormData)
    } else {
      this._addProduct(productFormData)
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

  private _initForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      brand: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
      countInStock: ['', Validators.required],
      description: ['', Validators.required],
      richDescription: [''],
      image: ['', Validators.required],
      isFeatured: [false],
    })
  }

  private _getCategories() {
    this.categoriesSvc.getCategories().pipe(takeUntil(this.endSubs$)).subscribe(res => {
      this.categories = res
    })
  }

  private _addProduct(productFormData: FormData) {
    this.productsSvc.createProduct(productFormData).pipe(takeUntil(this.endSubs$)).subscribe(res => {
      Swal.fire({
        title: 'Success',
        text: 'Product created successfully',
        icon: 'success',
        showConfirmButton: false,
        timer: 3000,
      }).then(() => {
        this.router.navigate(['/admin/products'])
      });
    },
      error => {
        Swal.fire({
          title: 'Error',
          text: 'Failed to create product',
          icon: 'error',
          showConfirmButton: false,
          timer: 3000,
        })

        this.form.reset()
      })
  }

  private _updatedProduct(productFormData: FormData) {
    this.productsSvc.updateProduct(productFormData, this.currentProductId).pipe(takeUntil(this.endSubs$)).subscribe(product => {

      Swal.fire({
        title: 'Success',
        text: 'Product updated successfully',
        icon: 'success',
        showConfirmButton: false,
        timer: 3000,
      }).then(() => {
        this.router.navigate(['/admin/products'])
      });
    },
      error => {
        Swal.fire({
          title: 'Error',
          text: 'Failed to update product',
          icon: 'error',
          showConfirmButton: false,
          timer: 3000,
        })

        this.form.reset()
      })
  }


  private _checkEditMode() {
    this.activatedRoute.params.subscribe((res) => {
      if (res['id']) {
        this.editMode = true
        this.currentProductId = res['id']
        this.productsSvc.getProduct(res['id']).pipe(takeUntil(this.endSubs$)).subscribe(product => {
          this.productForm['name'].setValue(product['name']);
          this.productForm['brand'].setValue(product['brand']);
          this.productForm['price'].setValue(product['price']);
          this.productForm['category'].setValue(product['category']?._id);
          this.productForm['countInStock'].setValue(product['countInStock']);
          this.productForm['description'].setValue(product['description']);
          this.productForm['richDescription'].setValue(product['richDescription']);
          this.productForm['isFeatured'].setValue(product['isFeatured']);
          this.imageDisplay = product.image!;
          this.productForm['image'].setValidators([])
          this.productForm['image'].updateValueAndValidity()
        })
      } else {
        this.editMode = false
      }

    })
  }

  get productForm() {
    return this.form.controls
  }

  ngOnDestroy(): void {
    this.endSubs$.next()
    this.endSubs$.complete()
  }
}
