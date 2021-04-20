import { AccountInterface } from './account.interface';
import { APIResponse } from '../../../shared/interfaces/response.interface';

export interface ResponseAccount extends APIResponse {
  data: AccountInterface;
}
