import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Role } from 'src/app/interfaces/user.interface';
import { UserService } from 'src/app/services/user.service';

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
    }, private roleService: UserService ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){

    console.log(this.data);
    
     if(this.data !== null){
      this.userForm.get(['id'])?.setValue(this.data.id);
      this.userForm.get(['name'])?.setValue(this.data.name);
      this.userForm.get(['role'])?.setValue(this.data.role_id);
      this.userForm.get(['status'])?.setValue(this.data.status);
    }
    this.roleService.getRoles().subscribe( (response: any) => {this.roles = response})
  }


}

