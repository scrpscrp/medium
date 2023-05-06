import { AuthService } from './../../../auth/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { registerAction } from 'src/app/auth/store/actions/register.action';
import { isSubmittingSelector } from 'src/app/auth/store/selectors';
import { AppStateInterface } from 'src/app/shared/types/appState.interface';
import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface';

@Component({
  selector: 'mc-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
form: FormGroup;
isSubmitting$: Observable<boolean>;
constructor(private fb:FormBuilder, private store: Store<AppStateInterface>, private authService: AuthService) {}

ngOnInit(): void {
  this.initializeForm();
  this.initializeValues();
}

initializeForm(): void {
  console.log('initializeForm')
  this.form = this.fb.group({
    username: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required]
  })
}
initializeValues(): void {
  this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
  console.log(this.isSubmitting$);
}
onSubmit(): void {
  this.store.dispatch(registerAction(this.form.value))
  this.authService.register(this.form.value).subscribe((currentUser: CurrentUserInterface) => {
    console.log(currentUser)
  })
}

}
