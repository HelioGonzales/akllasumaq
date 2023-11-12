import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { User } from 'src/app/shared/models/user';
import { UsersService } from 'src/app/shared/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit, OnDestroy {
  users: User[] = []
  endSubs$ = new Subject<void>()

  constructor(private usersSvc: UsersService, private router: Router) { }

  ngOnInit(): void {
    this._getUsers()
  }

  updateUser(userId: string) {
    this.router.navigateByUrl(`admin/users/form/${userId}`)
  }
  deleteUser(userId: string) {
    Swal.fire({
      title: 'Delete User',
      text: `Are you sure you want to delete the user"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete',
      cancelButtonText: 'No, cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        this.usersSvc.deleteUser(userId).pipe(takeUntil(this.endSubs$)).subscribe(res => {
          this._getUsers()
        },
          error => {
            Swal.fire({
              title: 'Error',
              text: 'Failed to delete user',
              icon: 'error',
              showConfirmButton: false, // Remove the confirm button
              timer: 3000, // Automatically close after 3 seconds (adjust the timer as needed)
            })
          })
      } else if (result.isDismissed) {
        return this._getUsers()
      }
    });
  }

  private _getUsers() {
    this.usersSvc.getUsers().pipe(takeUntil(this.endSubs$)).subscribe(res => {
      this.users = res
    })
  }

  ngOnDestroy(): void {
    this.endSubs$.next()
    this.endSubs$.complete()
  }
}
