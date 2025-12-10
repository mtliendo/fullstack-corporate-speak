import {
  BedrockRuntimeClient,
  ConversationRole,
  ConverseCommand,
  Message,
} from '@aws-sdk/client-bedrock-runtime'

const client = new BedrockRuntimeClient({
  region: 'us-east-1',
})

export const handler = async (event: any) => {
  const { context, phrase } = JSON.parse(event.body)

  const conversation = [
    {
      role: 'user' as ConversationRole,

      content: [
        {
          text: 'How do I say this phrase in corporate speak?',
        },
      ],
    },
  ]

  const command = new ConverseCommand({
    modelId: 'amazon.nova-lite-v1:0',
    messages: conversation,
    system: [
      {
        text: "You are a helpful assistant that translates user input into corporate speak. You are given a context and a phrase, and you need to translate the phrase into corporate speak while using the context to help you understand the user's intent. You should respond in the same language as the phrase.",
      },
      {
        text: `The context is: ${context}`,
      },
      {
        text: `The phrase is: ${phrase}`,
      },
    ],
  })

  const response = await client.send(command)

  return response.output?.message?.content
}
