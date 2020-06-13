import { AbstractControl } from '@angular/forms';

export class CustomValidations{

    static cuilValido(dni: string)
    {
        return (control: AbstractControl) => {
            const value: string = control.value;
            console.log(dni);
            if(value.includes(dni))
            {
                return null;
            }
            else
            {
                return {noLoContiene: true};
            }
        }
    }
}