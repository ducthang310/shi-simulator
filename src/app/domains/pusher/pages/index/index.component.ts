import { Component, OnDestroy, OnInit } from '@angular/core';
import { PusherService } from '../../services/pusher.service';
import { AuthService } from '../../../../core/auth/auth.service';
import Pusher from 'pusher-js';
import Channel from 'pusher-js/types/src/core/channels/channel';
import { Order } from '../../../order/order.interface';
import { PusherUpdateOrderData } from '../../pusher.interface';
import { PusherUpdateOrder } from '../../constants';

interface OrderHtml extends Order {
  time: string;
}

@Component({
  selector: 'app-pusher-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit, OnDestroy {
  userId: number;
  pusher: Pusher;
  channel: Channel;
  pusherSubscriptionState: 'connecting' | 'succeeded' | 'error';
  orders: OrderHtml[] = [];

  constructor(
    private pusherService: PusherService,
    private authService: AuthService
  ) {
    this.userId = this.authService.getUserId();
  }

  subscribeChannel(): void {
    this.pusherSubscriptionState = 'connecting';
    this.channel = this.pusherService.subscribeChannel(this.userId);

    this.channel.bind('pusher:subscription_succeeded', () => {
      console.log('--success');
      this.pusherSubscriptionState = 'succeeded';
    });
    this.channel.bind('pusher:subscription_error', (e: any) => {
      console.log('err', e);
      this.pusherSubscriptionState = 'error';
    });

    this.channel.bind(PusherUpdateOrder, (data: PusherUpdateOrderData) => {
      console.log(data);
      if (data.order) {
        this.orders.push({
          ...data.order,
          time: new Date().toTimeString()
        });
      }
    });
  }

  ngOnInit(): void {
    this.subscribeChannel();
  }

  ngOnDestroy(): void {
    if (this.channel) {
      this.pusherService.unsubscribeChannel(this.userId);
    }
  }

}
