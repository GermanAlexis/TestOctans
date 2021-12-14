import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IUser } from '../interfaces/user.interface';

const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers(){
    return this.http.get(`${base_url}/user`);
  }

  createUser(user: IUser){
    return this.http.post<IUser>(`${base_url}/user`, user);
  }

  updateUser(user: IUser){
    return this.http.put<IUser>(`${base_url}/user/${user.id}`, user);
  }
  deleteUser(user: IUser){
    return this.http.delete<IUser>(`${base_url}/user/${user.id}`);
  }

  getRoles(){
    return this.http.get(`${base_url}/roles`);
  }
}
