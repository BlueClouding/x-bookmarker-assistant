import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: Request) {
  const { tweetUrl } = await request.json()

  // In a real app, you would fetch the tweet content from the Twitter API
  const tweetContent = "This is a sample tweet content. In a real app, this would be fetched from the Twitter API."

  try {
    const analysis = await analyzeTweet(tweetContent)

    // In a real app, you would save this to a database
    const bookmark = {
      id: Date.now().toString(),
      tweetUrl,
      content: tweetContent,
      author: 'Sample Author',
      date: new Date().toISOString(),
      analysis,
    }

    return NextResponse.json(bookmark, { status: 201 })
  } catch (error) {
    console.error('Error analyzing tweet:', error)
    return NextResponse.json({ error: 'Failed to analyze tweet' }, { status: 500 })
  }
}

async function analyzeTweet(content: string): Promise<string> {
  const prompt = `Analyze the following tweet and provide a brief summary highlighting the main points and any important information:

Tweet: "${content}"

Analysis:`

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
    max_tokens: 150,
  })

  return response.choices[0].message.content || 'Unable to generate analysis.'
}