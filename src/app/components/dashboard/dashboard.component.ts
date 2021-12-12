import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { IUser } from 'src/app/interfaces/user.interface';
import { UserService } from 'src/app/services/user.service';
import { UserModalComponent } from '../user-modal/user-modal.component';
import { map } from 'rxjs/operators';
import { Form, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  loadingUsers = false
  users!: IUser
  filteredUsers!: IUser
  dataSource!: MatTableDataSource<IUser>;
  displayedColumns: string[] = ['id', 'nombre', 'activo', 'rol_id'];

  paginator: any;
  usersNames: any;
  filteredOptions: any;
  searchedUser = this.fb.group({
    nameUser: [null, [Validators.minLength(3)]]
  })
  constructor(public dialog: MatDialog, private userService: UserService, private fb: FormBuilder) { }


  ngOnInit(): void {
  }

   getUser(){
    this.loadingUsers = true
    this.userService.getUsers().subscribe((resquest: IUser) => {
      this.users = resquest
      this.loadingUsers = false
    })
    // this.users = (await this.appService.findAll().toPromise()).body
    // this.filteredUsers = this.users
    // this.filteredUsers.sort((a,b) => a.id - b.id)
    // this.usersNames = this.users.map(user => user.nombre.toLowerCase())
    // this.filteredOptions = this.userSearch.valueChanges.pipe(
    //   startWith(''),
    //   map(value => this._filter(value)),
    // );

  }

 _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.usersNames.filter((username: string) => username.toLowerCase().includes(filterValue));
  }

   cleanSearchBar(): void{
    this.searchedUser.reset()
  }

  searchUser(option: any):void {
    let searchTerm = option !== null && option !== undefined ? option.value : this.searchedUser.value
    if(searchTerm === "" || searchTerm === null){
      // this.filteredUsers = this.users;
    }else{
      // this.filteredUsers = this.users.filter(user => user.nombre.toLowerCase().includes(searchTerm.toLowerCase()))
    }
  } 


  openModalUser(open: any) {
    let dialogRef = this.dialog.open(UserModalComponent, {
      data: open,
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
       // this.obtenerUsuarios()
      }
    });
  }

}
