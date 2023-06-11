import * as github from '@actions/github'
import * as core from '@actions/core'
import {sendNotification} from './sendNotification'

async function run(): Promise<void> {
  try {
    const chosenType: string = core.getInput('type')
    core.debug(`Type Input: ${chosenType}`) // debug is only output if you set the secret `ACTIONS_STEP_DEBUG` to true

    sendNotification({
      webhookUser: 'GitHub D4rkB0t',
      webhookAvatar:
        'https://cdn.discordapp.com/attachments/673102744181145630/1117423414056079370/skullpppurp.png',
      content: '',
      embed: {
        title: 'New Commit',
        description: 'desc', //github.context.payload.commits?.message,
        url: github.context.payload.commits?.url,
        color: '#833FBA',
        thumbnail:
          'https://cdn.discordapp.com/attachments/673102744181145630/1117424467208048690/skullpppurp2.png',
        author: {
          name: github.context.payload.sender?.login,
          avatar: github.context.payload.sender?.avatar_url,
          footerAvatar:
            'https://cdn.discordapp.com/attachments/673102744181145630/1117423188943589376/LogoPurps.png',
          url: github.context.payload.sender?.html_url
        },
        fields: []
      }
    })

    core.setOutput('chosenType', chosenType)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
