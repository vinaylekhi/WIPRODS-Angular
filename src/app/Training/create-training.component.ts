import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker'
import { Training } from '../models/training.model';
import { ApiService } from './api.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-training',
  templateUrl: './create-training.component.html',
  styleUrls: ['./create-training.component.css']
})
export class CreateTrainingComponent implements OnInit {
  datePickerConfig: Partial<BsDatepickerConfig>;
  public training: Training;
  constructor(private apiService: ApiService, private datePipe: DatePipe) { 
    this.datePickerConfig = Object.assign({},
      {
        containerClass: 'theme-dark-blue',
        showWeekNumbers: false,
        minDate: new Date(),
        dateInputFormat: 'DD/MM/YYYY'
      });
  }

  ngOnInit(): void {
    this.training = new Training();
  }
  
  btnSaveTraining(form: NgForm){    
    this.apiService.createTraining(this.training).subscribe((res)=>{
      console.log(res.trainingDays);
      this.training = new Training();
      form.resetForm();
       this.training.message = `Training is successfully saved {id: ${res.id}, name: ${res.name}, 
                   startDate: ${this.datePipe.transform(res.startDate,'dd/MM/yyyy') }, endDate: ${this.datePipe.transform(res.endDate,'dd/MM/yyyy')}}. Total training days are ${res.trainingDays}`;
      
    });   
  }  
}
