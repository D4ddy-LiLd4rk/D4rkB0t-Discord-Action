import { HexColorString } from "discord.js"

export interface IEmbed {
    title: string,
    description: string,
    url: string,
    color: HexColorString,
    thumbnail: string,
    author: IAuthor,
    fields?: IField[],
    image?: string
}

interface IAuthor {
    name: string,
    avatar: string,
    footerAvatar: string,
    url: string
}

interface IField {
    title: string,
    value: string,
    inline: boolean
}