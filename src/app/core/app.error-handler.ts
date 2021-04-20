import { ErrorHandler, Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class AppErrorHandler implements ErrorHandler {

  constructor() {
  }

  handleError(error: Error | HttpErrorResponse): void {
    throw error;
  }
}
