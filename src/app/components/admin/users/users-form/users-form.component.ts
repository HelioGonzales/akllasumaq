import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { User } from 'src/app/shared/models/user';
import { UsersService } from 'src/app/shared/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.css']
})
export class UsersFormComponent implements OnInit, OnDestroy {
  editMode = false
  isSubmitted = false
  form!: FormGroup
  currentUserId: string = ''
  endSubs$ = new Subject<void>()

  constructor(private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute, private usersSvc: UsersService, private router: Router) { }

  ngOnInit(): void {
    this._initForm()
    this._checkEditMode()
  }

  onSubmit() {
    this.isSubmitted = true

    if (!this.form.valid) return

    const user: User = {
      _id: this.currentUserId,
      name: this.form.controls['name'].value,
      email: this.form.controls['email'].value,
      phone: this.form.controls['phone'].value,
      isAdmin: this.form.controls['isAdmin'].value,
      street: this.form.controls['street'].value,
      apartment: this.form.controls['apartment'].value,
      zip: this.form.controls['zip'].value,
      city: this.form.controls['city'].value,
      // country: this.form.controls['country'].value,
    }

    if (this.editMode) {
      this._updateUser(user)
    } else {
      this._addUser(user)

    }
  }

  private _initForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      phone: ['', Validators.required],
      isAdmin: [false],
      street: [''],
      apartment: [''],
      zip: [''],
      city: [''],
      // country: [''],
    })
  }

  private _checkEditMode() {
    this.activatedRoute.params.subscribe((res) => {
      if (res['id']) {
        this.editMode = true
        this.currentUserId = res['id']
        this.usersSvc.getUser(res['id']).subscribe(user => {
          this.userForm['name'].setValue(user['name']);
          this.userForm['email'].setValue(user['email']);
          this.userForm['isAdmin'].setValue(user['isAdmin']);
          this.userForm['street'].setValue(user['street']);
          this.userForm['apartment'].setValue(user['apartment']);
          this.userForm['zip'].setValue(user['zip']);
          this.userForm['city'].setValue(user['city']);
          // this.userForm['country'].setValue(user['country']);
          this.userForm['password'].setValidators([]);
          this.userForm['password'].updateValueAndValidity()

        })
      } else {
        this.editMode = false
      }

    })
  }

  private _addUser(user: User) {
    this.usersSvc.createUser(user).pipe(takeUntil(this.endSubs$)).subscribe(res => {
      Swal.fire({
        title: 'Success',
        text: 'User created successfully',
        icon: 'success',
        showConfirmButton: false,
        timer: 3000,
      }).then(() => {
        this.router.navigate(['/admin/users'])
      });
    },
      error => {
        Swal.fire({
          title: 'Error',
          text: 'Failed to create user',
          icon: 'error',
          showConfirmButton: false,
          timer: 3000,
        })

        this.form.reset()
      })
  }

  private _updateUser(user: User) {
    this.usersSvc.updateUser(user).pipe(takeUntil(this.endSubs$)).subscribe(res => {
      Swal.fire({
        title: 'Success',
        text: 'User updated successfully',
        icon: 'success',
        showConfirmButton: false,
        timer: 3000,
      }).then(() => {
        this.router.navigate(['/admin/users'])
      });
    },
      error => {
        Swal.fire({
          title: 'Error',
          text: 'Failed to update user',
          icon: 'error',
          showConfirmButton: false,
          timer: 3000,
        })

        this.form.reset()
      })
  }

  get userForm() {
    return this.form.controls
  }

  ngOnDestroy(): void {
    this.endSubs$.next()
    this.endSubs$.complete()
  }
}
