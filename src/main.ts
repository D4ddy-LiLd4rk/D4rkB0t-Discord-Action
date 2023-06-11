import * as github from '@actions/github'
import * as core from '@actions/core'
import {Notification} from './notification'
import {sendNotification} from './sendNotification'
import {Embed} from './embed'

async function _getNotification(): Promise<Notification> {
  const context = github.context
  const payload = context.payload

  const _embed: Embed = {
    title: `${payload.repository?.full_name} - ${context.eventName}`,
    description: '',
    url: '',
    color: '#833FBA',
    thumbnail:
      'https://cdn.discordapp.com/attachments/673102744181145630/1117424467208048690/skullpppurp2.png',
    author: {
      name: '',
      avatar: '',
      footerAvatar:
        'https://cdn.discordapp.com/attachments/673102744181145630/1117423188943589376/LogoPurps.png',
      url: ''
    },
    fields: []
  }

  switch (context.eventName) {
    case 'push':
      _embed.description = payload.head_commit.message
      _embed.url = payload.head_commit.url
      _embed.author.name = github.context.payload.sender?.login
      _embed.author.avatar = github.context.payload.sender?.avatar_url
      _embed.author.url = github.context.payload.sender?.html_url
      break
    case 'release':
      _embed.description = `Release: ${payload.release.name}\nTag: ${payload.release.tag_name}`
      _embed.url = payload.release.url
      _embed.author.name = github.context.payload.sender?.login
      _embed.author.avatar = github.context.payload.sender?.avatar_url
      _embed.author.url = github.context.payload.sender?.html_url
      break
    default:
      _embed.description = 'Neither Push nor Release'
  }

  return {
    webhookUser: 'GitHub D4rkB0t',
    webhookAvatar:
      'https://cdn.discordapp.com/attachments/673102744181145630/1117423414056079370/skullpppurp.png',
    content: '',
    embed: _embed
  }
}

async function run(): Promise<void> {
  try {
    const chosenType: string = core.getInput('type')
    core.debug(`Type Input: ${chosenType}`) // debug is only output if you set the secret `ACTIONS_STEP_DEBUG` to true

    sendNotification(await _getNotification())

    core.setOutput('chosenType', chosenType)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
