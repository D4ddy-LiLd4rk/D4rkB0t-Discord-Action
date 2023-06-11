import {EmbedBuilder, WebhookClient} from 'discord.js'
import {webhookId, webhookToken} from './config.json'
import {Notification} from './notification'
import {Embed} from './embed'

export async function sendNotification(
  notification: Notification
): Promise<void> {
  return Promise.resolve(_sendWebhookMessage(notification))
}

function _createEmbed(info: Embed): EmbedBuilder {
  const embed = new EmbedBuilder()
    .setTitle(info.title)
    .setDescription(info.description)
    .setURL(info.url)
    .setColor(info.color)
    .setThumbnail(info.thumbnail)
    .setAuthor({
      name: info.author.name,
      iconURL: info.author.avatar,
      url: info.author.url
    })
    .addFields({name: '\u200b', value: '\u200b'}) //.addBlankField()
    .setTimestamp()
    .setFooter({text: 'powered by D4rkB0t', iconURL: info.author.footerAvatar})

  for (const field of info.fields) {
    if (field.value) {
      embed.addFields({
        name: field.title,
        value: field.value,
        inline: field.inline
      })
    }
  }

  //console.log(embed);
  return embed
}

function _sendWebhookMessage(notification: Notification): void {
  const webhookClient = new WebhookClient({id: webhookId, token: webhookToken})

  webhookClient.send({
    content: notification.content,
    username: notification.webhookUser,
    avatarURL: notification.webhookAvatar,
    embeds: [_createEmbed(notification.embed)]
  })
}
