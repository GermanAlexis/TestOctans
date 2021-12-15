import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { IUser, Role } from 'src/app/interfaces/user.interface';
import { UserService } from 'src/app/services/user.service';
import { UserModalComponent } from '../user-modal/user-modal.component';
import { map, startWith, switchMap } from 'rxjs/operators';
import { Form, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  loadingUsers = false
  users: IUser[] = []
  filteredUsers: IUser[] = []
  dataSource = new  MatTableDataSource<IUser>(this.users);
  displayedColumns: string[] = ['id', 'nombre', 'activo', 'rol_id']; 

  paginator_length = 0;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];

  usersNames: any;
  roles: Role[] = []
  filteredOptions!: Observable<string[]>;
  searchedUser = this.fb.group({
    nameUser: ['', [Validators.minLength(3)]]
  })
  constructor(public dialog: MatDialog, private userService: UserService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getUser();
  }


   getUser(){
    this.loadingUsers = true
    this.userService.getRoles().pipe(
      switchMap( roles => this.userService.getUsers().pipe( 
        map(users => ({ roles, users }))
      ) )

    ).subscribe((response: any) => {
       !response?.roles ? this.roles = [] : this.roles = response?.roles
       !response?.users ? this.users = [] : this.users = response?.users

      this.dataSource = new  MatTableDataSource<IUser>(this.users)
      this.usersNames = this.users.map(user => user.name?.toLowerCase())
      this.filteredUsers = this.users
      this.filteredOptions = this.searchedUser.controls['nameUser'].valueChanges.pipe(
      startWith(''),
      map(value =>  this._filter(value)),
    );
      this.paginator_length = response.length
      this.loadingUsers = false
    })
  }
  getRole(id: number): string {
    let role = this.roles.find( rol => rol.id == id)
    return role != undefined ? role.value : 'No exits'
  }

  pages(event: PageEvent){
    this.paginator_length = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
  }

 _filter(value: string): string[] {
    let filterValue = value.toLowerCase() ? value: '';
     return this.usersNames.filter((username: string, index: number) => index <= 4 && username.includes(filterValue)  );
  }

   cleanSearchBar(): void{
    this.searchedUser.reset();
    this.getUser()
  }

  searchUser(option: any):void {
    let searchTerm = option !== null && option !== undefined ? option.value : this.searchedUser.controls['nameUser'].value
    if(!searchTerm){
      this.filteredUsers = this.users;
    }else{
       this.filteredUsers = this.users.filter(user => user.name?.toLowerCase().includes(searchTerm.toLowerCase()))
    }

    this.dataSource = new  MatTableDataSource<IUser>(this.filteredUsers)
  }


  openModalUser(open: any) {
    let dialogRef = this.dialog.open(UserModalComponent, {
      data: open,
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
       this.getUser()
      }
    });
  }

}
