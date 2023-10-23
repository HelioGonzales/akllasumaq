import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/user';
import { UsersService } from 'src/app/shared/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  users: User[] = []

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
        this.usersSvc.deleteUser(userId).subscribe(res => {
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
    this.usersSvc.getUsers().subscribe(res => {
      this.users = res
    })
  }
}
