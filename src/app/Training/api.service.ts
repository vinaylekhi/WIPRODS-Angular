import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Training } from '../models/training.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiURL: string = 'http://localhost:56349/api/Trainings/';

  constructor(private httpClient: HttpClient) {}
  public createTraining(training: Training){
    return this.httpClient.post<Training>(`${this.apiURL}`,training);
  }
}