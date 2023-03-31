import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/shared/services/account/account.service';
import { ROLE } from 'src/app/shared/contants/role.constant';
import { LocalizedString } from '@angular/compiler';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  public loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private router: Router
  ) { };

  ngOnInit(): void {
    this.initLoginForm();
  }

  initLoginForm(): void {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]]
    }
    )
  };

  onAuth(): void {
    this.accountService.login(this.loginForm.value).subscribe(data => {
      if (data && data.length > 0) {
        const user = data[0];
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.accountService.isUserLogin$.next(true);
        // this.accountService.isUserLogin$.next(true);
        if (user && user.role === ROLE.USER) {
          this.router.navigate(['/cabinet']);
        } else if (user && user.role === ROLE.ADMIN) {
          this.router.navigate(['/admin/discount']);
        }
        this.loginForm.reset();
      }
    }, (e) => {
      console.log(e);
    })
  };


}
