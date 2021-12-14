import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { IUser } from 'src/app/interfaces/user.interface';
import { UserService } from 'src/app/services/user.service';
import { UserModalComponent } from '../user-modal/user-modal.component';
import { map, startWith } from 'rxjs/operators';
import { Form, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

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
  filteredOptions: any;
  searchedUser = this.fb.group({
    nameUser: [null, [Validators.minLength(3)]]
  })
  constructor(public dialog: MatDialog, private userService: UserService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getUser();
  }


   getUser(){
    this.loadingUsers = true
    this.userService.getUsers().subscribe((response: any) => {
      console.log(this.dataSource);
      this.users = response
      this.dataSource = response
      this.usersNames = this.users.map(user => user.name?.toLowerCase())
      this.filteredUsers = this.users
      this.filteredOptions = this.searchedUser.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );
      this.paginator_length = response.length
      this.loadingUsers = false
    })
  }

  pages(event: PageEvent){
    this.paginator_length = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
  }

 _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.usersNames.filter((username: string) => username.toLowerCase().includes(filterValue));
  }

   cleanSearchBar(): void{
    this.searchedUser.reset();
    this.getUser()
  }

  searchUser(option: any):void {
    let searchTerm = option !== null && option !== undefined ? option.value : this.searchedUser.value
    if(searchTerm === "" || searchTerm === null){
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
      console.log(open);

    dialogRef.afterClosed().subscribe(result => {
      if(result){
       this.getUser()
      }
    });
  }

}
