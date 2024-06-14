import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { employeeModel } from './component/employeemodel';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  // http://localhost:3000/posts

  //post method
  addcontact(data: employeeModel) {
    return this.http.post<employeeModel>(
      'https://userdata-jqpv.onrender.com/posts',
      data
    );
  }

  //get method
  getcontact() {
    return this.http.get<employeeModel[]>(
      'https://userdata-jqpv.onrender.com/posts'
    );
  }

  //delete method
  deletecontact(id: number) {
    return this.http.delete<employeeModel>(
      `https://userdata-jqpv.onrender.com/posts/${id}`
    );
  }

  //fetching data on edit
  fetchdata(id: number) {
    return this.http.get<employeeModel>(
      `https://userdata-jqpv.onrender.com/posts/${id}`
    );
  }

  //update method
  updatecontact(id: number, data: employeeModel) {
    return this.http.put<employeeModel>(
      `https://userdata-jqpv.onrender.com/posts/${id}`,
      data
    );
  }
}
