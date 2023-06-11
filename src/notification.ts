import {Embed} from './embed'

export interface Notification {
  webhookUser: string
  webhookAvatar: string
  content: string
  embed: Embed
}
