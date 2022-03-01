import Pusher from 'pusher';
import { pusherConfig } from ':config';

const pusher = new Pusher(pusherConfig);

export function userPusherChannel(authId: string): string {
  return `private--core@${authId.replace('|', '')}`;
}

export default pusher;
