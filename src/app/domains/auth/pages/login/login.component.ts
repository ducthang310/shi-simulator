import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControlDirective } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { ResponseHelperService } from '../../../../shared/helpers/response-helper.service';

@Component({
  selector: 'app-auth-login',
  templateUrl: './login.component.html',
  styleUrls: []
})
export class LoginComponent implements OnInit {
  phoneNumber: string | undefined;
  code: string | undefined;
  submitted: boolean | undefined;
  submittedRequest: boolean | undefined;
  loading: boolean | undefined;
  formState = 0;

  @ViewChild('mainForm') mainForm: AbstractControlDirective | undefined;
  @ViewChild('loginForm') loginForm: AbstractControlDirective | undefined;

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService,
    private responseHelper: ResponseHelperService
  ) { }

  request(): void {
    this.submittedRequest = true;
    if (!this.mainForm || this.mainForm.invalid) {
      this.toastr.error('Please check required fields.');
      return;
    }

    this.loading = true;
    this.authService.requestACode({
      phoneNumber: this.phoneNumber,
    })
      .subscribe(res => {
        this.formState = 1;
        this.toastr.show('Check your phone to get the code');
      }, errorResponse => {
        this.responseHelper.showErrorMessages(errorResponse);
        this.loading = false;
      }, () => {
        this.loading = false;
      });

  }

  login(): void {
    this.submitted = true;
    if (!this.loginForm || this.loginForm.invalid) {
      this.toastr.error('Please check required fields.');
      return;
    }

    this.loading = true;
    this.authService.login({
      phoneNumber: this.phoneNumber,
      code: this.code
    })
      .subscribe(res => {
        this.authService.storeTokensAndPermissions(res);
        this.router.navigate(['/']);
      }, errorResponse => {
        this.responseHelper.showErrorMessages(errorResponse);
        this.loading = false;
      }, () => {
        this.loading = false;
      });

  }

  checkInputError(input: AbstractControlDirective): boolean {
    return !!(input.invalid && (input.dirty || input.touched || this.submitted));
  }

  ngOnInit(): void {
  }

}
