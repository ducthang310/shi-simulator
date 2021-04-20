import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  public baseApiUrl: string | null;
  public api = {
    auth: {
      login: '/auth/login',
      verification: '/auth/verification'
    },
    account: {
      info: 'accounts/info'
    }
  };

  constructor() {
    this.baseApiUrl = environment.baseApiUrl;
  }

  getUrl(url: string, params?: any): string {
    if (params) {
      Object.keys(params).forEach((key) => {
        url = url.replace(':' + key, params[key]);
      });
    }

    return this.baseApiUrl + url;
  }
}
