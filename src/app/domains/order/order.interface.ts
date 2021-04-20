import { OrderStatusEnum, PaymentStatusEnum } from './constants';

export interface OrderPaymentData {
  stripeChargeId?: string;
  stripeChargePaymentMethod?: string;
}

export interface ProductPrices {
  subtotal: number;
  taxAmount: number;
  discountAmount: number;
  grandTotal: number;
}

export interface Order {
  id?: number;
  revelUuid?: string;
  code?: string;
  franchiseId?: number;
  accountId?: number;
  status: OrderStatusEnum;
  paymentStatus: PaymentStatusEnum;
  subtotal?: number;
  taxAmount?: number;
  discountAmount?: number;
  grandTotal?: number;
  paymentMethodId?: number;
  paymentData?: OrderPaymentData;
  notes?: string;
  takeAway?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
