import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {ConfigService} from '../../../core/config.service';
import { ResponseAccount } from '../interfaces/response.interface';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(
    private http: HttpClient,
    private cfs: ConfigService,
  ) {
  }

  getLoggedUserInformation(): Observable<ResponseAccount> {
    return this.http.get<ResponseAccount>(this.cfs.getUrl(this.cfs.api.account.info));
  }
}
