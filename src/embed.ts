import {HexColorString} from 'discord.js'

export interface Embed {
  title: string
  description: string
  url: string
  color: HexColorString
  thumbnail: string
  author: EmbedAuthor
  fields: EmbedField[]
  image?: string
}

interface EmbedAuthor {
  name: string
  avatar: string
  footerAvatar: string
  url: string
}

interface EmbedField {
  title: string
  value: string
  inline: boolean
}
