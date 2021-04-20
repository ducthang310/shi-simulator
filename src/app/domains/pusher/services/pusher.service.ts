import { Injectable } from '@angular/core';
import Pusher from 'pusher-js';
import Channel from 'pusher-js/types/src/core/channels/channel';
import { HttpClient } from '@angular/common/http';
import { PusherAuthentication, ResponsePusherAuth } from '../pusher.interface';
import { ChannelNamePrefix } from '../constants';
import { environment } from '../../../../environments/environment';

export interface ObjectChannels {
  [channelName: string]: Channel;
}

@Injectable({
  providedIn: 'root'
})
export class PusherService {
  pusher: Pusher;
  channels: ObjectChannels = {};
  channelPrefix = ChannelNamePrefix;

  constructor(
    private http: HttpClient
  ) {
    this.init();
  }

  private authorizer(channel: Channel): any {
    const authUrl = environment.baseApiUrl + '/pusher/auth';
    return {
      authorize: (socketId: string, callback: any) => {
        const data: PusherAuthentication = {
          socketId,
          channel: channel.name
        };
        this.http.post(authUrl, data).subscribe((res) => {
          console.log(res);
          callback(null, (res as any).data);
        }, error => {
          console.log(error);
          callback(new Error(`Error calling auth endpoint: ${error}`), {
            auth: ''
          });
        });
      }
    };
  }

  init(): void {
    this.pusher = new Pusher(environment.pusher.key, {
      cluster: environment.pusher.cluster,
      authorizer: this.authorizer.bind(this),
    });
  }

  subscribeChannel(name: string | number): Channel {
    name = this.channelPrefix + name;
    if (!this.channels.hasOwnProperty(name) || !this.channels[name]) {
      this.channels[name] = this.pusher.subscribe(name);
    }

    return this.channels[name];
  }

  unsubscribeChannel(name: string | number): void {
    name = this.channelPrefix + name;
    if (this.channels.hasOwnProperty(name) && this.channels[name]) {
      this.pusher.unsubscribe(name);
      this.channels[name] = null;
    }
  }

  getChannelByName(name: string): Channel {
    name = this.channelPrefix + name;
    if (this.channels.hasOwnProperty(name) && this.channels[name]) {
      return this.channels[name];
    }
    return null;
  }
}
