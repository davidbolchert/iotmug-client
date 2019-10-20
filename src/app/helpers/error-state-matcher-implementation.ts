import { ErrorStateMatcher } from '@angular/material';
import { FormGroupDirective, FormControl, NgForm } from '@angular/forms';

export class ErrorStateMatcherImplementation implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
}
