import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  apiUrl: string = "http://localhost:4000/api/data";
  constructor(private httpClient: HttpClient) { }

  get(options?: any ) {
    return this.httpClient.get(`${this.apiUrl}?limit=${options.limit}&skip=${options.skip}`, options);
  }

  post(request: any) {
    return this.httpClient.post(this.apiUrl, request);
  }
}
