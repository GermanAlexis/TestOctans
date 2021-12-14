import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Role } from 'src/app/interfaces/user.interface';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss']
})
export class UserModalComponent implements OnInit {

   userForm = this.fb.group({
    id:     [null],
    name: [null, [Validators.required]],
    role:    [null, [Validators.required]],
    status: [null, [Validators.required]],
  });

  roles: Role[] = [];
  error: boolean = false;
  errorMsg: string = "";

  constructor(   public dialogRef: MatDialogRef<UserModalComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: {
      id: number,
      name: string,
      status: boolean,
      role_id: Role
    }) { }

  ngOnInit(): void {
    console.log(this.data);
    
  }

}

