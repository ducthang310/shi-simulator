import { Order } from '../order/order.interface';

export interface PusherAuthentication {
  socketId: string;
  channel: string;
}

export interface PusherUpdateOrderData {
  order: Order;
}

export interface ResponsePusherAuth {
  data: {
    auth: string;
  };
}
