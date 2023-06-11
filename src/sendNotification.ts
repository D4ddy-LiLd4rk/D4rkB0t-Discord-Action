import { EmbedBuilder, WebhookClient } from "discord.js";
const { webhookId, webhookToken } = require('./config.json');
import { INotification } from "./INotification"
import { IEmbed } from "./IEmbed";


export async function sendNotification(notification: INotification): Promise<void> {
  return Promise.resolve(_sendWebhookMessage(notification));
}

function _createEmbed(info: IEmbed): EmbedBuilder {
  const embed = new EmbedBuilder()
    .setTitle(info.title)
    .setDescription(info.description)
    .setURL(info.url)
    .setColor(info.color)
    .setThumbnail(info.thumbnail)
    .setAuthor({ name: info.author.name, iconURL: info.author.avatar, url: info.author.url })
    .addFields({ name: '\u200b', value: '\u200b' })//.addBlankField()
    .setTimestamp()
    .setFooter({ text: 'powered by D4rkB0t', iconURL: info.author.footerAvatar });

  info.fields?.forEach(field => {
    if (field.value) {
      embed.addFields({ name: field.title, value: field.value, inline: field.inline });
    }
  })
  //console.log(embed);
  return embed;
}

function _sendWebhookMessage(notification: INotification) {
  const webhookClient = new WebhookClient({ id: webhookId, token: webhookToken });

  webhookClient.send({
    content: notification.content,
    username: notification.webhookUser,
    avatarURL: notification.webhookAvatar,
    embeds: [_createEmbed(notification.embed)],
  });
}