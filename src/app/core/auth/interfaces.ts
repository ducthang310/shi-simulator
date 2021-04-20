import { AccountInterface } from '../../domains/account/interfaces/account.interface';

export interface LoginData {
  phoneNumber: string | undefined;
  code: string | undefined;
}
export interface RequestVerification {
  phoneNumber: string | undefined;
}
export interface ResponseAuth {
  data: {
    account: AccountInterface;
    token: string;
    expires_in: number
  };
}

export interface AppJwtToken {
  iat: number;
  exp: number;
  id: number;
  email: string;
  phoneNumber: string;
}
