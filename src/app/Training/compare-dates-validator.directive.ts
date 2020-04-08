//Create directive to validate start and end date. The end date must be greater or equals to start date.
//This directive get called when start date or end date are changed.
import { Directive, Input } from "@angular/core";
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';

@Directive({
    selector: '[appConfirmGreaterValidator]',
    providers:[{
        provide: NG_VALIDATORS,
        useExisting: ConfirmGreaterValidatorDirective,
        multi: true
    }]
})
export class ConfirmGreaterValidatorDirective implements Validator{
    @Input() appConfirmGreaterValidator: string;
    validate(control: AbstractControl): {[key: string]: any} | null{
        const controlToCompare = control.parent.get(this.appConfirmGreaterValidator);
        //Check start date
        if(this.appConfirmGreaterValidator == "startDate" && controlToCompare && new Date(controlToCompare.value) > new Date(control.value)){
            return {'greater' : true};
        }
        //Check end date
        if(this.appConfirmGreaterValidator == "endDate" && controlToCompare && new Date(controlToCompare.value) < new Date(control.value)){
            return {'greater' : true};
        }
        return null;
    }
}