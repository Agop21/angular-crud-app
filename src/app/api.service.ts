import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { employeeModel } from './component/employeemodel';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  //post method
  addcontact(data: employeeModel) {
    return this.http.post<employeeModel>('http://localhost:3000/posts', data);
  }

  //get method
  getcontact() {
    return this.http.get<employeeModel[]>('http://localhost:3000/posts');
  }

  //delete method
  deletecontact(id: number) {
    return this.http.delete<employeeModel>(`http://localhost:3000/posts/${id}`);
  }

  //fetching data on edit
  fetchdata(id: number) {
    return this.http.get<employeeModel>(`http://localhost:3000/posts/${id}`);
  }

  //update method
  updatecontact(id: number, data: employeeModel) {
    return this.http.put<employeeModel>(
      `http://localhost:3000/posts/${id}`,
      data
    );
  }
}