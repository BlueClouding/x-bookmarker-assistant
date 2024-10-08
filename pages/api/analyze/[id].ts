import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { TwitterApi } from 'twitter-api-v2'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const session = await getSession({ req })

  if (!session || !session.accessToken) {
    return res.status(401).json({ error: 'Not authenticated' })
  }

  const { id } = req.query

  const client = new TwitterApi(session.accessToken as string)

  try {
    const tweet = await client.v2.singleTweet(id as string, {
      expansions: ['author_id', 'referenced_tweets.id', 'in_reply_to_user_id'],
      'tweet.fields': ['created_at', 'conversation_id', 'public_metrics'],
    })

    const analysis = await analyzeTweet(tweet.data.text)

    res.status(200).json({ analysis })
  } catch (error) {
    console.error('Error analyzing tweet:', error)
    res.status(500).json({ error: 'Failed to analyze tweet' })
  }
}

async function analyzeTweet(content: string): Promise<string> {
  const prompt = `Analyze the following tweet and provide a brief summary highlighting the main points, sentiment, and any important information:

Tweet: "${content}"

Analysis:`

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
    max_tokens: 150,
  })

  return response.choices[0].message.content || 'Unable to generate analysis.'
}