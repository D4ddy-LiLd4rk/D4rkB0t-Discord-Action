import { IEmbed } from "./IEmbed"

export interface INotification {
    webhookUser: string,
    webhookAvatar: string,
    content: string,
    embed: IEmbed
}